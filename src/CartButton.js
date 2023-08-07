import React from 'react';

const CartButton = ({ itemQuantities }) => {
  const totalQuantity = Object.values(itemQuantities).reduce((total, qty) => total + qty, 0);

  return (
    <div className="cart-button">
      <button className="add-to-cart-button">
        Add to Cart ({totalQuantity} items)
      </button>
    </div>
  );
};

export default CartButton;
