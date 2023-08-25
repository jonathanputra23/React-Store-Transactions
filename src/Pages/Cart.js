import React, { useState } from 'react';
import CartItem from '../components/CartItem';
import { useLocation } from 'react-router-dom';
import './Cart.css';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutModal from '../components/CheckoutModal';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'; // Import Supabase client
const { DateTime } = require('luxon'); 

const dateTimeWIB = DateTime.now().setZone('Asia/Jakarta');
const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const supabaseUrl = 'https://krbcatjdkhtyffdtrbew.supabase.co'; // Replace with your Supabase URL
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyYmNhdGpka2h0eWZmZHRyYmV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5ODI4ODcsImV4cCI6MjAwODU1ODg4N30.bYuxnZ33qN7ynutXAA8CloL5VdFPy89E5LlwpLjqJlg'; // Replace with your Supabase API key
  const supabase = createClient(supabaseUrl, supabaseKey);


  const handleCheckout = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .upsert(cartItems.map(item => ({
          name: item.name,
          price: item.price,
          qty: item.qty,
          datetime: dateTimeWIB.toISO()
        })));

      if (error) {
        console.error('Error logging transaction:', error.message);
        // Handle error scenario
        return;
      }

      console.log('Transaction logged successfully');
      // Clear the cart or perform other necessary actions after successful checkout
      setCheckoutSuccess(true); // Set checkout success state
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error logging transaction:', error);
      // Handle error scenario
    }
  };

  const location = useLocation();
  const cartItems = location.state.item;

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <Link to="/" className="back-button">Back</Link>
      <div className="cart-items">
        <div className="cart-item">
          <div className="cart-item-info">
            <h3 className="cart-item-name">Item</h3>
            <p className="cart-item-price">Price</p>
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
      <CheckoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} checkoutSuccess={checkoutSuccess} />
    </div>
  );
};

// Helper function to calculate the total price of items in the cart
const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
};

export default Cart;
