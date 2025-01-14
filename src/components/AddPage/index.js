import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


import './index.css';

const expenses = [
  { category: "Food", amount: 0 },
  { category: "Transport", amount: 0 },
  { category: "Entertainment", amount: 0 },
  { category: "Bills", amount: 0 },
];

const AddPage = () => {
  const [expenseData, setExpenseData] = useState(expenses);
  const [userName, setUsername] = useState('');
  const [income, setIncome] = useState('');

  const navigate=useNavigate()


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  };

  const handleAmountChange = (index, newAmount) => {
    const updatedExpenses = expenseData.map((expense, i) =>
      i === index ? { ...expense, amount: newAmount } : expense
    );
    setExpenseData(updatedExpenses);
  };

  const handleAddTransaction =async (e) => {
    e.preventDefault();
    const transactionDetails={
      id:uuidv4(),
      userName,
      income,
      expenses:expenseData
    }

    const url='http://localhost:3001/transactions'
    const options={
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(transactionDetails)
    }

    const response=await fetch(url,options)
    const data=await response.json()
    console.log(response)
    if(response.ok){
      console.log(data)
      navigate('/')
    }
  };

  return (
    <div className='add-transaction-container'>
      <h1>Add Transaction</h1>
      <form onSubmit={handleAddTransaction}>
        <div className='input-container'>
          <label htmlFor='username'>User Name:</label>
          <input id='username' type='text' required 
          onChange={handleUsernameChange}
          value={userName} 
          className='input-text' />
        </div>
        <div className='input-container'>
          <label htmlFor='income'>Income:</label>
          <input id='income' type='text' required 
          onChange={handleIncomeChange}
          value={income}
          className='input-text' />
        </div>
        <div>
          {expenseData.map((expense, index) => (
            <div key={index} className='category-amount'>
              <label className='category'>{expense.category}:</label>
              <input
                type="number"
                value={isNaN(expense.amount)?'': expense.amount}
                onChange={(e) => handleAmountChange(index, parseFloat(e.target.value))}
                className='input-amount'
                required
              />
            </div>
          ))}
        </div>
        <button type='submit' className='add-transaction-button'>Add Transaction</button>
      </form>
    </div>
  );
};

export default AddPage;