const express = require('express');
const path = require('path');
const cors = require('cors');
const productsRoute = require('./routes/products');
const checkoutRoute = require('./routes/checkout');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoute);
app.use('/api/checkout', checkoutRoute);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../react-frontend/build')));

// Catch-all handler to serve index.html for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../react-frontend/build', 'index.html'));
});

module.exports = app;
