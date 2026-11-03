import { products } from '../../data/products';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const SITE_URL = 'https://www.talirecorderlessons.com';
const MAX_QUANTITY = 50;

// Only ever redirect back to an origin we control. The Origin header is
// client-supplied, so using it directly for return_url / image URLs would let
// a crafted request send customers to an arbitrary site after paying.
function getSafeOrigin(req) {
  const allowed = new Set([
    SITE_URL,
    'https://talirecorderlessons.com',
    process.env.URL,
    process.env.DEPLOY_PRIME_URL,
    process.env.NODE_ENV !== 'production' ? 'http://localhost:3005' : null,
  ].filter(Boolean));
  const origin = req.headers.origin;
  return origin && allowed.has(origin) ? origin : SITE_URL;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if Stripe key is configured
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not configured');
    return res.status(500).json({ error: 'Payment system not configured' });
  }

  try {
    // Validate request body
    if (!Array.isArray(req.body) || req.body.length === 0 || req.body.length > 20) {
      return res.status(400).json({ error: 'Invalid cart data' });
    }

    // The client only tells us WHICH products and HOW MANY. Name, price,
    // image and the PDF to deliver all come from the server-side catalog;
    // trusting client-sent prices would let anyone buy anything for 1 cent.
    const cartItems = [];
    for (const raw of req.body) {
      const product = raw && typeof raw.id === 'string' && Object.prototype.hasOwnProperty.call(products, raw.id)
        ? products[raw.id]
        : null;
      const quantity = Number(raw && raw.quantity);
      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
        return res.status(400).json({ error: 'Invalid cart data' });
      }
      cartItems.push({ product, quantity });
    }

    const origin = getSafeOrigin(req);

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      mode: 'payment',
      billing_address_collection: 'auto',
      line_items: cartItems.map(({ product, quantity }) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: product.image ? [`${origin}${product.image}`] : [],
            metadata: {
              product_id: product.id,
              pdf_file: product.pdfFile || '',
            },
          },
          unit_amount: product.price,
        },
        quantity,
      })),
      metadata: {
        product_ids: cartItems.map(({ product }) => product.id).join(','),
        pdf_files: cartItems.map(({ product }) => product.pdfFile || '').filter(Boolean).join(','),
      },
      return_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.status(200).json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error('Checkout error:', err);
    // Don't leak Stripe/internal error details to the client.
    res.status(500).json({ error: 'Unable to start checkout. Please try again.' });
  }
}
