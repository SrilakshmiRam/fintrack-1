import { useContext, useState } from 'react';
import Context from '../../context/context'; // Import the context
import './index.css';

const EditPage = () => {
  const { transactions, editTransaction } = useContext(Context);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [formData, setFormData] = useState({ userName: '', income: 0, expenses: [] });

  // Handle transaction selection
  const handleTransactionSelect = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    setSelectedTransactionId(id);
    setFormData({
      userName: transaction.userName,
      income: transaction.income,
      expenses: [...transaction.expenses],
    });
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'income' ? parseFloat(value) : value,
    }));
  };

  const handleExpenseChange = (index, field, value) => {
    const updatedExpenses = [...formData.expenses];
    updatedExpenses[index][field] = field === 'amount' ? parseFloat(value) : value;
    setFormData((prev) => ({ ...prev, expenses: updatedExpenses }));
  };

  // Save edited transaction
  const handleSave = () => {
    editTransaction(selectedTransactionId, formData);
    setSelectedTransactionId(null);
    setFormData({ userName: '', income: 0, expenses: [] });
  };

  return (
    <div className="edit-page">
      <h1>Edit Transaction</h1>

      <div className="transaction-list">
        <h3>Select a Transaction</h3>
        {transactions.map((transaction) => (
          <button
            key={transaction.id}
            onClick={() => handleTransactionSelect(transaction.id)}
            className={
              transaction.id === selectedTransactionId ? 'selected' : ''
            }
          >
            {transaction.userName}
          </button>
        ))}
      </div>

      {selectedTransactionId && (
        <div className="edit-form">
          <h3>Edit Details</h3>
          <label>
            User Name:
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Income:
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleInputChange}
            />
          </label>

          <h4>Expenses:</h4>
          {formData.expenses.map((expense, index) => (
            <div key={index} className="expense-item">
              <label>
                Category:
                <input
                  type="text"
                  value={expense.category}
                  onChange={(e) =>
                    handleExpenseChange(index, 'category', e.target.value)
                  }
                />
              </label>
              <label>
                Amount:
                <input
                  type="number"
                  value={expense.amount}
                  onChange={(e) =>
                    handleExpenseChange(index, 'amount', e.target.value)
                  }
                />
              </label>
            </div>
          ))}

          <button onClick={handleSave} className="save-button">
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default EditPage;

