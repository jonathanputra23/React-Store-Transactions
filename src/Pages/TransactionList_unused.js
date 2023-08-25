import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './TransactionList.css'; // Import your CSS file

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  // Calculate total price, total quantity, and item quantities
  const total = transactions.reduce((acc, transaction) => acc + transaction.price * transaction.qty, 0);
  const totalQuantity = transactions.reduce((acc, transaction) => acc + transaction.qty, 0);
  const itemQuantities = transactions.reduce((acc, transaction) => {
    if (!acc[transaction.name]) {
      acc[transaction.name] = 0;
    }
    acc[transaction.name] += transaction.qty;
    return acc;
  }, {});

  useEffect(() => {
    // Fetch transactions from the API when the selectedDate changes
    const fetchTransactions = async () => {
      try {
        const response = await Axios.get('http://localhost:5000/api/transactions', {
          params: { date: selectedDate } // Send selectedDate as a query parameter
        });
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [selectedDate]); // This effect will re-run whenever selectedDate changes

  return (
    <div className="transaction-list">
      <Link to="/" className="back-button">Back</Link>
      <h2>Transactions</h2>

      {/* Summary Group */}
      <div className="summary-group">
        <div className="date-picker">
          <label>Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <p className="summary">Total: ${total}</p>
        <p className="summary">Total Quantity: {totalQuantity}</p>
        <p className="summary">Item Quantities:</p>
        <ul>
          {Object.entries(itemQuantities).map(([itemName, quantity]) => (
            <li key={itemName}>{itemName}: {quantity}</li>
          ))}
        </ul>
      </div>

      {/* Details Group */}
      <div className="details-group">
        <h3>Transaction Details:</h3>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id} className="transaction-details">
              <p>Name: {transaction.name}</p>
              <p>Price: ${transaction.price}</p>
              <p>Qty: {transaction.qty}</p>
              <p>DateTime: {transaction.datetime}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;
