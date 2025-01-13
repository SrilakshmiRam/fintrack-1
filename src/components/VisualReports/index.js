import React, { useContext } from 'react';
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend as BarLegend } from 'recharts';
import Context from '../../context/context'; 

import './index.css';

const VisualReports = () => {
  const { transactions } = useContext(Context);

  // Ensure transactions is an array
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  // Aggregate expenses by category for PieChart
  const expenseData = safeTransactions.reduce((acc, transaction) => {
    if (transaction.expenses && Array.isArray(transaction.expenses)) {
      transaction.expenses.forEach((expense) => {
        const existingCategory = acc.find(item => item.category === expense.category);
        if (existingCategory) {
          existingCategory.amount += expense.amount;
        } else {
          acc.push({ category: expense.category, amount: expense.amount });
        }
      });
    }
    return acc;
  }, []);

  // Chart colors for PieChart
  const COLORS = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#ffb3e6', '#c2c2f0'];

  // Aggregate data for BarChart based on specific categories (Food, Transport, Bills, Entertainment)
  const barChartData = safeTransactions.map(transaction => {
    const categoryData = {
      userName: transaction.userName,
      food: 0,
      transport: 0,
      bills: 0,
      entertainment: 0,
    };

    if (transaction.expenses && Array.isArray(transaction.expenses)) {
      transaction.expenses.forEach(expense => {
        if (expense.category === 'Food') {
          categoryData.food += expense.amount;
        } else if (expense.category === 'Transport') {
          categoryData.transport += expense.amount;
        } else if (expense.category === 'Bills') {
          categoryData.bills += expense.amount;
        } else if (expense.category === 'Entertainment') {
          categoryData.entertainment += expense.amount;
        }
      });
    }

    return categoryData;
  });

  return (
    <div className="visual-reports-container">
      <h2>Visual Reports - Expense Breakdown</h2>

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={300} className="responsive-container-pie">
        <PieChart>
          <Pie
            data={expenseData}
            dataKey="amount"
            nameKey="category"
            cx="50%" // Center X
            cy="50%" // Center Y
            outerRadius={80} // Size of the pie chart
            label
          >
            {expenseData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Bar Chart */}
      <div className="chart-title">Spending by Category per User</div>
      <ResponsiveContainer width="60%" height={500} className="responsive-container-bar">
        <BarChart data={barChartData} margin={{ top: 5 }} className='bar-chart'>
          <XAxis dataKey="userName" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="food" name="Food" fill="#8884d8" barSize={30}  />
          <Bar dataKey="transport" name="Transport" fill="#82ca9d" barSize={30}  />
          <Bar dataKey="bills" name="Bills" fill="#ff7f0e" barSize={30}  />
          <Bar dataKey="entertainment" name="Entertainment" fill="#ffbf00" barSize={30} />
          <BarLegend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisualReports;