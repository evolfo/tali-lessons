const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      mode: 'payment',
      customer_email: req.body.email || undefined, // Optional: can pass email from frontend
      billing_address_collection: 'auto',
      line_items: req.body.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.image ? [`${req.headers.origin}${item.image}`] : [],
            metadata: {
              product_id: item.id || '',
              pdf_file: item.pdfFile || '',
            },
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      metadata: {
        // Store all product IDs and PDF files for easy access in webhook
        product_ids: req.body.map(item => item.id).join(','),
        pdf_files: req.body.map(item => item.pdfFile || '').filter(Boolean).join(','),
      },
      return_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.status(200).json({ clientSecret: session.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
