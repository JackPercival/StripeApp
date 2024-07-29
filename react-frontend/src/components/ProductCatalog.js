export default function ProductCatalog({products, addItemToCart}) {

    return (
        <div>
            {products.map(product => (
                <div key={product.id} className="productCard">
                    <img className="productImage" src={product.images[0]} alt={product.name}/>
                    <p className="productName">{product.name}</p>
                    <p>{product.description}</p>
                    <p className="productPrice">${(product.priceData.unit_amount / 100).toFixed(2)}</p>
                    <button className="addToCart" onClick={() => addItemToCart(product)}>Add to Cart</button>
                </div>
            ))}
        </div>
    )
}
