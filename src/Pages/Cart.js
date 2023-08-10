import React from 'react';
import CartItem from '../components/CartItem';
import { useLocation } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const location = useLocation();
  console.log(location);
  const cartItems = location.state.item;
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div>
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
        <p>Total: ${calculateTotal(cartItems)}</p>
        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  );
};


export default Cart;

// Helper function to calculate the total price of items in the cart
const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
};
