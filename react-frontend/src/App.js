import React, { useState, useEffect } from "react";
import ProductCatalog from "./components/ProductCatalog";
import Cart from "./components/Cart";
import Cookies from 'js-cookie';
import "./App.css";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState()
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = Cookies.get('cart');
    return savedCart ? JSON.parse(savedCart) : {};
  });

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/products`)
    .then(res => {
      return res.json()
    })
    .then(products => {
      setProducts(products)
      setIsLoaded(true)
    })
  },[])

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
      setCart({})
      Cookies.remove('cart')
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  function addItemToCart(product) {
    setCart(prevCart => {
      const isProductInCart = product.id in prevCart;

      const newCart = {
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

      Cookies.set('cart', JSON.stringify(newCart), { expires: 7 });

      return newCart;
    });
  }

  return (
    <>
      <h1>Cozy Threads</h1>
      {!isLoaded && <div id="initialLoader" className='loader'></div>}
      {isLoaded &&
      <>
        {message && <p id="transactionResult">{message}</p>}
        <div id="container">
          <ProductCatalog products={products} addItemToCart={addItemToCart}/>
          <Cart cart={cart} setCart={setCart}/>
        </div>
      </>
      }
    </>
  )
}
