import React from 'react';

const ProductItem = ({ product, onAdd, onSubtract }) => {
  return (
    <div className="product-item">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <div>
        <button onClick={() => onSubtract(product)}>-</button>
        <span>{product.qty}</span>
        <button onClick={() => onAdd(product)}>+</button>
      </div>
    </div>
  );
};

export default ProductItem;