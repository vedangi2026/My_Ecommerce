import React, { useState, useEffect } from 'react';
import './ProductPage.css';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

const ProductPage = ({ products }) => {
  const { addToCart } = useCart();
  const [error, setError] = useState(null);

  return (
    <div className="product-page">
      <h2>Products</h2>
      {error && <div className="error">{error}</div>}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>
              {product.title.length > 20
                ? product.title.substring(0, 20) + '...'
                : product.title.padEnd(20, ' ')}
            </h3>
            <p>${product.price}</p>
            <div className="product-card-actions">
              <button onClick={() => addToCart(product)}>Add to cart</button>
              <Link to={`/products/${product.id}`}>View Product</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;