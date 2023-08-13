import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions from the API when the component mounts
    const fetchTransactions = async () => {
      try {
        const response = await Axios.get('http://localhost:5000/api/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="transaction-list">
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            Name: {transaction.name}, Price: ${transaction.price}, Qty: {transaction.qty}, DateTime: {transaction.datetime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
