import React, { useState } from 'react';
import CartItem from '../components/CartItem';
import { useLocation } from 'react-router-dom';
import './Cart.css';
import Axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutModal from '../components/CheckoutModal';
import { Link } from 'react-router-dom';
const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);



  const handleCheckout = async () => {
    try {
      await Axios.post('http://localhost:5000/api/checkout', { items: cartItems });
      console.log('Transaction logged successfully');
      // Clear the cart or perform other necessary actions after successful checkout
      setCheckoutSuccess(true); // Set checkout success state
      setIsModalOpen(true);
      // navigate('/');
    } catch (error) {
      console.error('Error logging transaction:', error);
    }
  };
  const location = useLocation();
  console.log(location);
  const cartItems = location.state.item;
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <Link to="/" className="back-button">Back</Link>
      <div className="cart-items">
        <div className="cart-item">
          <div className="cart-item-info">
            <h3 className="cart-item-name">Item</h3>
            <p className="cart-item-price">Price (Rupiah)</p>
            <p className="cart-item-qty">Qty</p>
            <p className="cart-item-subtotal">Subtotal</p>
          </div>
        </div>
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <p className="cart-total">Total: Rp. {calculateTotal(cartItems)}</p>
      <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
      <CheckoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} checkoutSuccess ={checkoutSuccess} />
    </div>
  );
};


export default Cart;

// Helper function to calculate the total price of items in the cart
const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
};

