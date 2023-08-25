import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductsList from '../components/ProductsList';
import './Home.css';
import ItemData from '../items.json';

function Home() {
  const updatedProducts = ItemData.map(product => ({
    ...product,
    image: process.env.PUBLIC_URL + '/images/' + product.image
  }));

  const [products, setProducts] = useState(updatedProducts); 
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

  const categorizedProducts = {
    sticker: products.filter((product) => product.category === 'Sticker'),
    keychain: products.filter((product) => product.category === 'Keychain'),
    prints: products.filter((product) => product.category === 'Prints'),
    others: products.filter((product) => product.category === 'Other')
  };

  return (
    <div className="app">
      <Link to="/transactions">
        <button className="view-transactions-button">View Transactions</button>
      </Link>
      <header>
        <h1>Online Store</h1>
      </header>
      {/* Sticker Products */}
      <div className="category-section">
        <h2>Stickers</h2>
        <ProductsList
          products={categorizedProducts.sticker}
          onAdd={handleAddToCart}
          onSubtract={handleSubtractFromCart}
        />
      </div>

      {/* Keychain Products */}
      <div className="category-section">
        <h2>Keychains</h2>
        <ProductsList
          products={categorizedProducts.keychain}
          onAdd={handleAddToCart}
          onSubtract={handleSubtractFromCart}
        />
      </div>

      {/* Poster Products */}
      <div className="category-section">
        <h2>Prints</h2>
        <ProductsList
          products={categorizedProducts.prints}
          onAdd={handleAddToCart}
          onSubtract={handleSubtractFromCart}
        />
      </div>
      <div className="category-section">
        <h2>Other</h2>
        <ProductsList
          products={categorizedProducts.others}
          onAdd={handleAddToCart}
          onSubtract={handleSubtractFromCart}
        />
      </div>
      <Link to="/cart"
        state={{
          item: cartItems
        }
        }>
        <button className="add-to-cart-button floating-button">
          Add to Cart
        </button>
      </Link>

    </div>


  );
};

export default Home;
