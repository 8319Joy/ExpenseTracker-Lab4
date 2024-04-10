import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ExpenseTracker from './ExpenseTracker';
import AddExpenseForm from './AddExpenseForm';



import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/expenses');
      setExpenses(response.data);
      calculateTotalExpense(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateTotalExpense = (data) => {
    const total = data.reduce((acc, expense) => acc + parseFloat(expense.price), 0);
    setTotalExpense(total.toFixed(2));
  };

  return (
    <>
    <div className="container">
      <h1>Expense Tracker</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Product Purchased</th>
            <th>Price</th>
            <th>Payee</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.date}</td>
              <td>{expense.product}</td>
              <td>{expense.price}</td>
              <td>{expense.payee}</td>
            </tr>

            
          ))}
        </tbody>
      </table>
      <div className="total-expense">Total Expense: ${totalExpense}</div>
      <button className="btn btn-primary">Add Expense</button>
    </div>

    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/expenses">Expenses</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/expenses" component={ExpenseTracker} />
          <Route path="/add-expense" component={AddExpenseForm} />
        </Switch>
      </div>
    </Router>

   


    </>
  );
};

function Home() {
  return (
    <div>
      <h2>Home Page</h2>
      {/* Add any content for your home page */}
    </div>
  );
}

export default App;
