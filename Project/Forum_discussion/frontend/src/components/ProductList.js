import React from 'react';

function ProductList({ produits }) {
    return (
        <div className="product-list">
            {produits.map((product) => (
                <div key={product.id} className="product-item">
                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                    <div className="product-details">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="product-price">${product.price}</p>
                        <p className="product-rating">⭐ {product.rating} / 5</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
