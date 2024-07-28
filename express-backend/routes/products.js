const SECRET_KEY = process.env.SECRET_KEY
const stripe = require('stripe')(SECRET_KEY);

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await stripe.products.list();

  const productsWithPrice = await Promise.all(
    products.data.map(async (product) => {
      const priceData = await stripe.prices.retrieve(product.default_price);
      return {...product, priceData}
    })
  )

  res.json(productsWithPrice)
});

module.exports = router;
