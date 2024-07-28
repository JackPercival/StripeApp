const SECRET_KEY = process.env.SECRET_KEY
const stripe = require('stripe')(SECRET_KEY);
const URL = process.env.URL

const express = require('express');
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const line_items = req.body;

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${URL}?success=true`,
    cancel_url: `${URL}?canceled=true`,
  });

  res.json(session);
});

module.exports = router;
