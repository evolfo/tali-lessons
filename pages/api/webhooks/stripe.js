import { Resend } from 'resend';
import { buffer } from 'micro';
import fs from 'fs';
import path from 'path';
import { products } from '../../../data/products';
import { generateSheetMusicPurchaseEmail } from '../../../lib/emails/templates/sheetMusicPurchase';
import { generateLessonPurchaseEmail } from '../../../lib/emails/templates/lessonPurchase';
import { generateMixedPurchaseEmail } from '../../../lib/emails/templates/mixedPurchase';
import { generateAdminNotificationEmail } from '../../../lib/emails/templates/adminNotification';
import { detectPurchaseType, getEmailSubject, getAdminEmailSubject } from '../../../lib/emails/utils/purchaseTypeDetector';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

// Disable Next.js body parsing for webhooks
export const config = {
  api: {
    bodyParser: false,
  },
};

// Events that mean "an order is ready to fulfil". `completed` fires when the
// customer finishes checkout (already paid for cards/wallets); delayed methods
// such as bank debits fire `async_payment_succeeded` days later instead.
const FULFILL_EVENTS = new Set([
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
]);

const ADMIN_TO = () => process.env.ADMIN_EMAIL || 'info@talirecorder.com';
const FROM = 'Tali Recorder Lessons <hello@talirecorder.com>';

// Resend's send() RETURNS { data, error } rather than throwing, so every call
// must check `error`. The idempotency key makes Stripe's webhook retries safe:
// a retry of the same order returns the original send instead of emailing the
// customer a second time (Resend remembers keys for 24 hours).
async function sendEmail(payload, idempotencyKey) {
  const { data, error } = await resend.emails.send(payload, { idempotencyKey });
  if (error) {
    // Same key, different payload: this email was already sent for this order.
    if (error.name === 'invalid_idempotent_request') {
      console.warn(`[fulfillment] Email already sent (idempotency key ${idempotencyKey})`);
      return data;
    }
    throw new Error(`Resend error (${error.name}): ${error.message}`);
  }
  return data;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  if (event.type === 'checkout.session.async_payment_failed') {
    console.error(`[fulfillment] Delayed payment failed for session ${event.data.object.id}; nothing was sent.`);
  }

  if (FULFILL_EVENTS.has(event.type)) {
    const session = event.data.object;

    try {
      // Retrieve full session details with line items
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items'],
      });

      // Only hand over the goods once the money has actually arrived. A
      // completed checkout can still be unpaid (delayed bank debits), and a
      // failed payment would otherwise leave the customer with free music.
      if (fullSession.payment_status !== 'paid') {
        console.warn(`[fulfillment] Session ${session.id} is ${fullSession.payment_status}, not paid; holding fulfilment.`);
        await sendEmail(
          {
            from: FROM,
            to: ADMIN_TO(),
            subject: 'Order awaiting payment (nothing sent yet)',
            html: `<p>Checkout session <strong>${session.id}</strong> (${fullSession.customer_details?.email || 'unknown email'}) completed but is <strong>${fullSession.payment_status}</strong>, so no files or confirmation were sent.</p><p>If the payment clears, Stripe sends an "async payment succeeded" event and the order is fulfilled automatically (the webhook endpoint must be subscribed to <code>checkout.session.async_payment_succeeded</code>). Otherwise no action is needed.</p>`,
          },
          `order-${session.id}-awaiting-payment`
        );
        return res.status(200).json({ received: true, fulfilled: false });
      }

      const customerEmail = fullSession.customer_details?.email;
      const customerName = fullSession.customer_details?.name || 'Valued Customer';
      const lineItems = fullSession.line_items?.data || [];

      // Format the purchased items
      const purchasedItems = lineItems.map(item => ({
        name: item.description,
        quantity: item.quantity,
        price: (item.amount_total / 100).toFixed(2),
      }));

      const totalAmount = (fullSession.amount_total / 100).toFixed(2);

      // Detect purchase type (lessons, sheet music, or mixed)
      const purchaseType = detectPurchaseType(purchasedItems);

      // Get PDF files from session metadata
      // Only deliver files that exist in the catalog (defense in depth: a
      // metadata value like "../../.env" must never reach the filesystem).
      const deliverable = new Set(Object.values(products).map((p) => p.pdfFile).filter(Boolean));
      const pdfFiles = (fullSession.metadata?.pdf_files
        ? fullSession.metadata.pdf_files.split(',').filter(Boolean)
        : []
      ).filter((f) => deliverable.has(f));

      // Prepare attachments for sheet music purchases
      const attachments = [];
      if (pdfFiles.length > 0) {
        for (const pdfFile of pdfFiles) {
          try {
            const filePath = path.join(process.cwd(), 'private', 'sheet-music', pdfFile);
            if (fs.existsSync(filePath)) {
              const fileContent = fs.readFileSync(filePath);
              attachments.push({
                filename: pdfFile,
                content: fileContent,
              });
            } else {
              console.warn(`PDF file not found: ${pdfFile}`);
            }
          } catch (error) {
            console.error(`Error reading PDF file ${pdfFile}:`, error);
          }
        }
      }

      // If a purchased file could not be attached, the customer email would say
      // "attached" with nothing attached. Make that loud: log it and alert the admin
      // so the file can be sent manually.
      const attachedNames = new Set(attachments.map((a) => a.filename));
      const missingFiles = pdfFiles.filter((f) => !attachedNames.has(f));
      if (missingFiles.length > 0) {
        console.error(`[fulfillment] Missing sheet music attachment(s) for session ${session.id}: ${missingFiles.join(', ')}`);
        try {
          await sendEmail(
            {
              from: FROM,
              to: ADMIN_TO(),
              subject: 'ACTION NEEDED: sheet music was not attached to an order email',
              html: `<p>A customer (${customerEmail || 'unknown email'}) bought sheet music but these files could not be attached automatically: <strong>${missingFiles.join(', ')}</strong>.</p><p>Stripe session: ${session.id}. Please send the files to the customer manually.</p>`,
            },
            `order-${session.id}-missing-attachment`
          );
        } catch (alertErr) {
          console.error('[fulfillment] Failed to send missing-attachment alert:', alertErr);
        }
      }

      // Send confirmation email to customer
      if (customerEmail) {
        // Choose the appropriate email template based on purchase type
        let customerEmailHTML;
        switch (purchaseType.type) {
          case 'lessons':
            customerEmailHTML = generateLessonPurchaseEmail(customerName, purchasedItems, totalAmount);
            break;
          case 'sheetMusic':
            customerEmailHTML = generateSheetMusicPurchaseEmail(customerName, purchasedItems, totalAmount);
            break;
          case 'mixed':
            customerEmailHTML = generateMixedPurchaseEmail(customerName, purchasedItems, totalAmount);
            break;
          default:
            customerEmailHTML = generateMixedPurchaseEmail(customerName, purchasedItems, totalAmount);
        }

        const emailData = {
          from: 'Tali Recorder Lessons <hello@talirecorder.com>',
          replyTo: 'info@talirecorder.com', // Customer replies go to your Google Workspace inbox
          to: customerEmail,
          subject: getEmailSubject(purchaseType.type),
          html: customerEmailHTML,
        };

        // Add attachments if there are sheet music PDFs
        if (attachments.length > 0) {
          emailData.attachments = attachments;
        }

        await sendEmail(emailData, `order-${session.id}-customer`);

        // Send notification email to admin (you)
        await sendEmail(
          {
            from: FROM,
            to: ADMIN_TO(),
            subject: getAdminEmailSubject(purchaseType.type),
            html: generateAdminNotificationEmail(
              customerName,
              customerEmail,
              purchasedItems,
              totalAmount,
              purchaseType.type
            ),
          },
          `order-${session.id}-admin`
        );
      } else {
        console.error(`[fulfillment] Session ${session.id} has no customer email; nothing was sent.`);
      }

      console.log(`Emails sent successfully for session: ${session.id}`);
    } catch (error) {
      console.error('Error fulfilling order:', error);
      // Tell Stripe to retry. Safe now: the idempotency keys above mean a retry
      // can't send the customer a second copy of an email that already went out.
      return res.status(500).json({ error: 'Fulfilment failed; will be retried' });
    }
  }

  res.status(200).json({ received: true });
}
