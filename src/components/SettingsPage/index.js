import { useContext } from "react";
import Context from '../../context/context';

const SettingsPage = () => {
  const { transactions } = useContext(Context);

  const initialBudgetLimits = {
    Food: 500,        // Budget limit for Food
    Transport: 200,   // Budget limit for Transport
    Entertainment: 300,  // Budget limit for Entertainment
    Bills: 250        // Budget limit for Bills
  };

  // Function to check if any expense exceeds budget limit
  const checkBudgetLimits = () => {
    transactions.forEach(transaction => {
      transaction.expenses.forEach(expense => {
        if (expense.category === 'Food' && expense.amount > initialBudgetLimits.Food) {
          alert('Budget limit exceeded for Food');
        }
        if (expense.category === 'Transport' && expense.amount > initialBudgetLimits.Transport) {
          alert('Budget limit exceeded for Transport');
        }
        if (expense.category === 'Entertainment' && expense.amount > initialBudgetLimits.Entertainment) {
          alert('Budget limit exceeded for Entertainment');
        }
        if (expense.category === 'Bills' && expense.amount > initialBudgetLimits.Bills) {
          alert('Budget limit exceeded for Bills');
        }
      });
    });
  };

  // Trigger the check for budget limits
  checkBudgetLimits();

  return (
    <div>
      <p>Settings Page</p>
    </div>
  );
};

export default SettingsPage;