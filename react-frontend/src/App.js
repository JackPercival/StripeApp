import React, { useState, useEffect } from "react";
import ProductCatalog from "./components/ProductCatalog";
import Cart from "./components/Cart";
import "./App.css";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const ProductDisplay = () => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>Stubborn Attachments</h3>
      <h5>$20.00</h5>
      </div>
    </div>
    <form action={`${apiBaseUrl}/api/checkout/create-checkout-session`} method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({})

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/products`)
    .then(res => {
      return res.json()
    })
    .then(products => {
      setProducts(products)
    })
  },[])

  // useEffect(() => {
  //   // Check to see if this is a redirect back from Checkout
  //   const query = new URLSearchParams(window.location.search);

  //   if (query.get("success")) {
  //     setMessage("Order placed! You will receive an email confirmation.");
  //   }

  //   if (query.get("canceled")) {
  //     setMessage(
  //       "Order canceled -- continue to shop around and checkout when you're ready."
  //     );
  //   }
  // }, []);

  function addItemToCart(product) {
    setCart(prevCart => {
      const isProductInCart = product.id in prevCart;

      return {
        ...prevCart,
        [product.id]: {
          ...prevCart[product.id],
          qty: isProductInCart ? prevCart[product.id].qty + 1 : 1,
          priceId: product.default_price,
          price: product.priceData.unit_amount,
          image: product.images[0],
          name: product.name,
        }
      };
    });
  }

  return (
    <div id="container">
      <ProductCatalog products={products} addItemToCart={addItemToCart}/>
      <Cart cart={cart} setCart={setCart}/>
    </div>
  )

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}
