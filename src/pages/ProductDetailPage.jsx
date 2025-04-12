import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetailPage.css';
import { useCart } from '../CartContext';

const ProductDetailPage = () => {
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-wrapper">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info">
          <h2>{product.title}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
