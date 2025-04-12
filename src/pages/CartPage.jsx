import React, { useState, useEffect } from 'react';
import './CartPage.css';
import { useCart } from '../CartContext';

const CartPage = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  useEffect(() => {
    // Calculate total price whenever cart changes
    const newTotalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalPrice(newTotalPrice);
  }, [cart]);


  const removeItem = (productId) => {
    removeFromCart(productId);
  };

  const checkout = () => {
    // Clear the cart
    clearCart();
    // Show order confirmation message
    setOrderConfirmation('Order placed successfully!');
    // Hide the order confirmation message after 4 seconds
    setTimeout(() => {
      setOrderConfirmation(null);
    }, 4000);
  };

  return (
    <div className="cart-page">
      <h2>Cart</h2>
      {orderConfirmation && (
        <div className="order-confirmation">
          {orderConfirmation}
        </div>
      )}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-info">
                  <img src={item.image} alt={item.title} />
                  <h3>{item.title}</h3>
                </div>
                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <input
                    type="number"
                    value={item.quantity || 0}
                    min="1"
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value ? parseInt(e.target.value) : 0))}
                  />
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            Total: ${totalPrice.toFixed(2)}
          </div>
          <button className="checkout-button" onClick={checkout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;