import React from "react";

function Cart({ location }) {
  const { state } = location;
  const selectedItems = state ? state.items : [];

  const totalQuantity = selectedItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = selectedItems.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {selectedItems.map((item, index) => (
        <div key={index}>
          <p>{item.itemName}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.price}</p>
          <hr />
        </div>
      ))}
      <p>Total Quantity: {totalQuantity}</p>
      <p>Total Price: ${totalPrice}</p>
    </div>
  );
}

export default Cart;
