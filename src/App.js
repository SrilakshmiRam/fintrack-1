// App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Context from './context/context';
import Home from './components/Home';
import EditPage from './components/EditPage';
import AddPage from './components/AddPage';
import DeletePage from './components/DeletePage';

import './index.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions from the API
  useEffect(() => {
    const getDetails = async () => {
      try {
        const url = 'http://localhost:3001/transactions';
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }

        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error(err);
      }
    };

    getDetails();
  }, []);

  // Edit transaction handler
  const editTransaction = async (id, formData) => {
    try {
      const url = `http://localhost:3001/transactions/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update transaction');
      }

      const updatedTransaction = await response.json();

      // Update the transactions state
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === id ? updatedTransaction : transaction
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Context.Provider value={{ transactions, editTransaction }}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/add/" element={<AddPage />} />
          <Route exact path="/edit/:id" element={<EditPage />} />
          <Route exact path="/delete/:id" element={<DeletePage />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;


