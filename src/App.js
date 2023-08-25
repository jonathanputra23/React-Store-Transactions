import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import React from 'react';
import TransactionList from './Pages/TransactionList';

function App() {
  return (
    <Router basename="/React-Store-Transactions">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/transactions" element={<TransactionList />}/>
      </Routes>
    </Router>
  );
}

export default App;
