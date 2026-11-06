/**
 * Exercises the real Stripe webhook handler (pages/api/webhooks/stripe.js)
 * against fake Stripe + Resend. Run with: npm run test:webhook
 *
 * The fake Resend behaves like the real one where it matters: send() RETURNS
 * { data, error } (it does not throw), and a repeated Idempotency-Key returns
 * the original send instead of emailing again.
 */
const assert = require('assert');
const Module = require('module');
const path = require('path');

process.env.STRIPE_SECRET_KEY = 'sk_test_fake';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_fake';
process.env.RESEND_API_KEY = 're_fake';
process.env.ADMIN_EMAIL = 'admin@example.test';

// ---- fakes -----------------------------------------------------------------
const state = { sessions: {}, delivered: [], seenKeys: new Map(), resendError: null };

const fakeStripe = () => ({
  webhooks: { constructEvent: (buf) => JSON.parse(buf.toString()) },
  checkout: { sessions: { retrieve: async (id) => state.sessions[id] } },
});

class FakeResend {
  constructor() {
    this.emails = {
      send: async (payload, options = {}) => {
        if (state.resendError) return { data: null, error: state.resendError };
        const key = options.idempotencyKey;
        if (key && state.seenKeys.has(key)) {
          const prev = state.seenKeys.get(key);
          if (JSON.stringify(prev.payload) !== JSON.stringify(payload)) {
            return { data: null, error: { name: 'invalid_idempotent_request', message: 'different payload' } };
          }
          return { data: { id: prev.id }, error: null }; // original response, no new email
        }
        const id = `email_${state.delivered.length + 1}`;
        state.delivered.push({ id, key, payload });
        if (key) state.seenKeys.set(key, { id, payload });
        return { data: { id }, error: null };
      },
    };
  }
}

const realLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === 'stripe') return fakeStripe;
  if (request === 'resend') return { Resend: FakeResend };
  if (request === 'micro') return { buffer: async (req) => Buffer.from(req.rawBody) };
  return realLoad.apply(this, arguments);
};

require('@babel/register')({ cwd: path.join(__dirname, '..'), only: [/pages[\\/]api/, /data[\\/]/, /lib[\\/]emails/], cache: false });
const handler = require('../pages/api/webhooks/stripe.js').default;

// ---- helpers ---------------------------------------------------------------
function session(id, overrides = {}) {
  return {
    id,
    payment_status: 'paid',
    customer_details: { email: 'buyer@example.test', name: 'Buyer' },
    amount_total: 1000,
    metadata: { pdf_files: 'hot-cross-buns.pdf' },
    line_items: { data: [{ description: '"Hot Cross Buns & Variations" by Tali Rubinstein', quantity: 1, amount_total: 1000 }] },
    ...overrides,
  };
}
async function deliver(type, sess) {
  state.sessions[sess.id] = sess;
  const req = { method: 'POST', headers: { 'stripe-signature': 'x' }, rawBody: JSON.stringify({ id: 'evt_' + Math.random(), type, data: { object: { id: sess.id } } }) };
  const res = { statusCode: null, body: null, status(c) { this.statusCode = c; return this; }, json(b) { this.body = b; return this; } };
  await handler(req, res);
  return res;
}
const reset = () => { state.delivered.length = 0; state.seenKeys.clear(); state.resendError = null; };
const to = (addr) => state.delivered.filter((d) => d.payload.to === addr);

const tests = [];
const test = (name, fn) => tests.push([name, fn]);

// ---- tests -----------------------------------------------------------------
test('paid order: customer gets ONE email with the PDF attached, admin gets one', async () => {
  const res = await deliver('checkout.session.completed', session('cs_1'));
  assert.strictEqual(res.statusCode, 200);
  const customer = to('buyer@example.test');
  assert.strictEqual(customer.length, 1);
  assert.strictEqual(customer[0].payload.attachments.length, 1);
  assert.strictEqual(customer[0].payload.attachments[0].filename, 'hot-cross-buns.pdf');
  assert.ok(customer[0].payload.attachments[0].content.length > 1000, 'attachment has real bytes');
  assert.strictEqual(to('admin@example.test').length, 1);
});

test('Stripe retrying the same event does not send a second email', async () => {
  await deliver('checkout.session.completed', session('cs_2'));
  await deliver('checkout.session.completed', session('cs_2')); // retry
  await deliver('checkout.session.completed', session('cs_2')); // retry again
  assert.strictEqual(to('buyer@example.test').length, 1);
  assert.strictEqual(to('admin@example.test').length, 1);
});

test('unpaid (delayed payment) order: no customer email, admin is told once', async () => {
  const res = await deliver('checkout.session.completed', session('cs_3', { payment_status: 'unpaid' }));
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(to('buyer@example.test').length, 0);
  assert.strictEqual(to('admin@example.test').length, 1);
  assert.ok(/awaiting payment/i.test(to('admin@example.test')[0].payload.subject));
  await deliver('checkout.session.completed', session('cs_3', { payment_status: 'unpaid' })); // retry
  assert.strictEqual(to('admin@example.test').length, 1);
});

test('delayed payment later succeeds: files are sent exactly once', async () => {
  await deliver('checkout.session.completed', session('cs_4', { payment_status: 'unpaid' }));
  await deliver('checkout.session.async_payment_succeeded', session('cs_4', { payment_status: 'paid' }));
  await deliver('checkout.session.async_payment_succeeded', session('cs_4', { payment_status: 'paid' })); // retry
  assert.strictEqual(to('buyer@example.test').length, 1);
  assert.strictEqual(to('buyer@example.test')[0].payload.attachments.length, 1);
});

test('delayed payment fails: nothing is sent to the customer', async () => {
  await deliver('checkout.session.completed', session('cs_5', { payment_status: 'unpaid' }));
  await deliver('checkout.session.async_payment_failed', session('cs_5', { payment_status: 'unpaid' }));
  assert.strictEqual(to('buyer@example.test').length, 0);
});

test('Resend failure returns 500 so Stripe retries, then succeeds without duplicates', async () => {
  state.resendError = { name: 'rate_limit_exceeded', message: 'slow down' };
  const failed = await deliver('checkout.session.completed', session('cs_6'));
  assert.strictEqual(failed.statusCode, 500);
  assert.strictEqual(state.delivered.length, 0);
  state.resendError = null;
  const retried = await deliver('checkout.session.completed', session('cs_6'));
  assert.strictEqual(retried.statusCode, 200);
  assert.strictEqual(to('buyer@example.test').length, 1);
});

test('a file the customer cannot be sent is never emailed, even if metadata is tampered', async () => {
  await deliver('checkout.session.completed', session('cs_7', { metadata: { pdf_files: '../../.env,hot-cross-buns.pdf' } }));
  const att = to('buyer@example.test')[0].payload.attachments.map((a) => a.filename);
  assert.deepStrictEqual(att, ['hot-cross-buns.pdf']);
});

(async () => {
  let failed = 0;
  for (const [name, fn] of tests) {
    reset();
    try { await fn(); console.log('PASS', name); }
    catch (e) { failed++; console.log('FAIL', name, '\n    ', e.message); }
  }
  console.log(failed ? `\n${failed} FAILED` : `\nAll ${tests.length} passed`);
  process.exit(failed ? 1 : 0);
})();
