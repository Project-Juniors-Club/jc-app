const stripe = require('stripe')(
  'sk_test_51MOi34Aiw9D5AdICvAl91T0YQoKBO54aGrnrS0dPR6yj5of3omTlu51OSlYRXWieBE9ZII38oPyKVUkzuouaxmKG00ISHRk5Cp',
);

export default async function handler(req, res) {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    payment_method_types: ['paynow'],
    payment_method_data: { type: 'paynow' },
    amount: 200,
    currency: 'sgd',
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
