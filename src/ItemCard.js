import React, { useState } from 'react';
import './ItemCard.css'; // Import the CSS file

const ItemCard = ({ imageUrl, itemName, price }) => {
    const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="item-card">
      <img src={imageUrl} alt={itemName} />
      <h2 className="item-name">{itemName}</h2>
      <p className="item-price">Price: ${price}</p>
      <div className="quantity-controls">
        <button className="remove-button" onClick={handleRemove}>-</button>
        <span className="quantity">{quantity}</span>
        <button className="add-button" onClick={handleAdd}>+</button>
      </div>
    </div>

    
  );
};

export default ItemCard;
