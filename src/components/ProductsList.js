import React from 'react';
import ProductItem from './ProductItem';

const ProductsList = ({ products, onAdd, onSubtract }) => {
  return (
    <div className="products-list">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAdd={onAdd}
          onSubtract={onSubtract}
        />
      ))}
    </div>
  );
};

export default ProductsList;
