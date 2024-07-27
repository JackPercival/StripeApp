const SECRET_KEY = process.env.SECRET_KEY
const stripe = require('stripe')(SECRET_KEY);
const URL = process.env.URL

const express = require('express');
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1PgyqPRsYhiCBNPNDDry563V',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${URL}?success=true`,
    cancel_url: `${URL}?canceled=true`,
  });

  res.redirect(303, session.url);
});

module.exports = router;
