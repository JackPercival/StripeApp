const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export default function Cart({cart}) {

    function calculateTotal() {
        let total = 0;

        for (let key in cart) {
            total += cart[key].price * cart[key].qty
        }
        
        return (total / 100).toFixed(2)
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

        if (!items.length) {
            return
        }

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
        <div>
            <div id="cartContainer">
                <h3>Shopping Cart</h3>
                {Object.keys(cart).map(productId => {
                    return (
                        <div className="shoppingCartRow" key={`cart_row_${productId}`}>
                            <div className="shoppingCartImageContainer">
                                <img src={cart[productId].image} />
                                <div>
                                    <div className="shoppingCartRowName">{cart[productId].name}</div>
                                    <div className="qty">Qty {cart[productId].qty}</div>
                                </div>
                            </div>
                            <div>${(cart[productId].price /100).toFixed(2)}</div>
                        </div>
                    )
                })}
                <p id="cartTotal">Total: ${calculateTotal()}</p>
                <button id="checkOutButton" onClick={handleCheckout}>Checkout</button>
            </div>

        </div>
    )
}
