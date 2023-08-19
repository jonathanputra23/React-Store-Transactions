import React from 'react';

const CartItem = ({ cartItem }) => {
  return (
    <div className="cart-item">
      <img src={cartItem.image} alt={cartItem.name} />
      <div className="cart-item-info">
        <h3 className="cart-item-name">{cartItem.name}</h3>
        <p className="cart-item-price">Rp. {cartItem.price}</p>
        <p className="cart-item-qty">{cartItem.qty}</p>
        <p className="cart-item-subtotal">{cartItem.price * cartItem.qty}</p>
      </div>
    </div>

  );
};

export default CartItem;
