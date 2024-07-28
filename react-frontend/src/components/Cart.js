const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export default function Cart({cart}) {

    function getPriceWithDecimal(price) {
        return (price / 100).toFixed(2)
    }

    function calculateTotal() {
        let total = 0;

        for (let key in cart) {
            total += cart[key].price * cart[key].qty
        }
        return getPriceWithDecimal(total)
    }

    function buildCheckoutItems() {
        let items = []

        for (let key in cart) {
            items.push({
                price: cart[key].priceId,
                quantity: cart[key].qty
            })
        }
        return items
    }

    async function handleCheckout() {
        let items = buildCheckoutItems()

        const response = await fetch(`${apiBaseUrl}/api/checkout/create-checkout-session`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(items)
        });

        const session = await response.json();
        window.location.href = session.url;
    }

    return (
        <div id="cartContainer">
            <h3>Shopping Cart</h3>
            {Object.keys(cart).map(productId => {
                return (
                    <div className="shoppingCartRow" key={`cart_row_${productId}`}>
                        <img src={cart[productId].image} />
                        <div className="shoppingCartRowName">{cart[productId].name}</div>
                        <div>${getPriceWithDecimal(cart[productId].price)} x {cart[productId].qty}</div>
                    </div>
                )
            })}
            <p id="cartTotal">Total: ${calculateTotal()}</p>
            <button onClick={handleCheckout}>Checkout</button>
            <form action={`${apiBaseUrl}/api/checkout/create-checkout-session`} method="POST">
      <button type="submit">
        Checkout 2
      </button>
    </form>
        </div>
    )
}
