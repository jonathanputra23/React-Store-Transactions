import React from 'react';

const CartItem = ({ cartItem }) => {
  return (
    <div className="cart-item">
      <h3>{cartItem.name}</h3>
      <p>Price: ${cartItem.price}</p>
      <p>Qty: {cartItem.qty}</p>
    </div>
  );
};

export default CartItem;
