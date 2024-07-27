const stripe = require('stripe')('sk_test_51Pgx1GRsYhiCBNPNE4I1gmBezaXKNduWA6jZFBixDKqa9934fR9IsgfaOcM1JWjdS1yqwJDV4Ie0PvFqDlL03Sbg00R6O3EhmP');
const express = require('express');
const router = express.Router();
const URL = process.env.URL

router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'prod_QY50bOgDirRsP6',
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
