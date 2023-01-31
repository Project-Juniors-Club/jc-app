/* eslint-disable import/no-anonymous-default-export */
import { Checkout } from 'checkout-sdk-node';
import { NextApiRequest, NextApiResponse } from 'next';
const CheckoutPageAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.query.token;
  // check the keys in the .env file
  const secretKey = process.env.CHECKOUT_SECRET_KEY || '';
  const publicKey = process.env.CHECKOUT_PUBLIC_KEY || '';

  const cko = new Checkout(secretKey, { pk: publicKey });

  try {
    const payment = await cko.payments.request({
      source: {
        // inferred type: "token"
        token: token, // Generated by Checkout.Frames
        billing_address: {
          address_line1: 'Wall Street',
          address_line2: 'Dollar Avenue',
          city: 'London',
          state: 'London',
          zip: 'W1W W1W',
          country: 'GB',
        },
        phone: {
          country_code: '44',
          number: '7123456789',
        },
      },
      currency: 'USD',
      amount: 1000,
      payment_type: 'Regular',
      reference: 'ORDER 1234',
      description: 'Mint Tea',
      customer: {
        email: 'new_user@email.com',
        name: 'John Smith',
      },
      metadata: {
        value: 'My value',
      },
    });
    res.json({ success: payment });
  } catch (err) {
    res.json({ failure: err });
  }
};

export default CheckoutPageAPI;
