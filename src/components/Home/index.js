import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../context/context'; // Import the context
import VisualReports from '../VisualReports';
import SettingsPage from '../SettingsPage';

import { RxHamburgerMenu } from "react-icons/rx";

import './index.css';

const Home = () => {
  const { transactions = [] } = useContext(Context); // Default to empty array
  const [showSettings, setShowSettings] = useState(false);
  const [isClickedBar, setIsClicked] = useState(false);
  const firstTransaction = Array.isArray(transactions) && transactions.length > 0 ? transactions[0] : null;
  const id = firstTransaction?.id;

  const handleBar = () => {
    setIsClicked((prevState) => !prevState);
  };

  return (
    <div className="home-page">
      <nav className="header-container">
        <h1 className="header-title">FinTrack</h1>
        <div className="buttons-container">
          <Link to="/add/">
            <button className="button">Add</button>
          </Link>
          {id && (
            <>
              <Link to={`/edit/${id}`}>
                <button className="button">Edit</button>
              </Link>
              <Link to={`/delete/${id}`}>
                <button className="button">Delete</button>
              </Link>
            </>
          )}
        </div>
        <div className="mobile-devices">
          <RxHamburgerMenu className="bar" onClick={handleBar} />
        </div>
      </nav>
      {isClickedBar && (
        <div className="buttons-container-mobile">
          <Link to="/add/">
            <button className="button1">Add</button>
          </Link>
          {id && (
            <>
              <Link to={`/edit/${id}`}>
                <button className="button1">Edit</button>
              </Link>
              <Link to={`/delete/${id}`}>
                <button className="button">Delete</button>
              </Link>
            </>
          )}
        </div>
      )}
      <h1>Transaction Details</h1>

      <div className="settings">
        <button className="settings-button" onClick={() => setShowSettings(!showSettings)}>
          {showSettings ? 'Close Settings' : 'Open Settings'}
        </button>
        {showSettings && <SettingsPage />}
      </div>

      <div>
        {transactions.length === 0 ? (
          <p className="no-transactions">No transactions found.</p>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-card">
              <h3>{transaction.userName}</h3>
              <p>Income: ${transaction.income}</p>
              <div>
                <h4>Expenses</h4>
                <ul>
                  {transaction.expenses?.map((expense, index) => (
                    <li key={index}>
                      {expense.category}: ${expense.amount}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}

        {transactions.length > 0 && <VisualReports />}
      </div>
    </div>
  );
};



export default Home
