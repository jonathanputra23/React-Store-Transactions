import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ProductsList from '../components/ProductsList';
import './Home.css';

function Home(){
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Item 1',
      price: 10,
      qty: 0,
      image: 'path/to/item1.jpg',
    },
    {
      id: 2,
      name: 'Item 2',
      price: 15,
      qty: 0,
      image: 'path/to/item1.jpg',
    },
    {
      id: 3,
      name: 'Item 3',
      price: 20,
      qty: 0,
      image: 'path/to/item1.jpg',
    },
    {
      id: 4,
      name: 'Item 3',
      price: 20,
      qty: 0,
      image: 'path/to/item1.jpg',
    },
    {
      id: 5,
      name: 'Item 3',
      price: 20,
      qty: 0,
      image: 'path/to/item1.jpg',
    },
    {
      id: 6,
      name: 'Item 3',
      price: 20,
      qty: 0,
      image: 'path/to/item1.jpg',
    },
    // Add more products here...
  ]);

  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === existingItem.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...product, qty: 1 }]);
    }

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...p, qty: p.qty + 1 } : p
      )
    );
  };

  const handleSubtractFromCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem && existingItem.qty > 0) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === existingItem.id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
      );

      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty - 1 } : p
        )
      );
    }
  };

  return (
      <div className="app">
        <header>
          <h1>Online Store</h1>

        </header>
        <ProductsList
              products={products}
              onAdd={handleAddToCart}
              onSubtract={handleSubtractFromCart}
            />
      <Link to= "/cart"
    state={{
      item:  cartItems }
    }>
            <button className="add-to-cart-button">
                Add to Cart
            </button>
            </Link>
      </div>
      
  );
};

export default Home;
