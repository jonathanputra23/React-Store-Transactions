import { useState } from "react";
import React from "react";
import ItemCard from "../ItemCard";
import { Link } from "react-router-dom";

function Home(){
    const [selectedItems, setSelectedItems] = useState([]);
    const addToCart = (itemName, price, quantity) => {
        const newItem = {
          itemName,
          price,
          quantity,
        };
    
        setSelectedItems(prevSelectedItems => [...prevSelectedItems, newItem]);
      };
    
    
    
    return (
    <><div className="App"><h1>Your Price Calculator App</h1></div>
          <ItemCard
            imageUrl="path/to/image.jpg"
            itemName="Product A"
            price={10}
            addToCart={addToCart}

          />

          <ItemCard
            imageUrl="path/to/another-image.jpg"
            itemName="Product B"
            price={15}
            addToCart={addToCart}

          />
            <Link to={{ pathname: "/cart", state: { items: selectedItems } }}>
            <button className="add-to-cart-button">
                Add to Cart
            </button>
            </Link>
        </>
    );
    
}

export default Home;