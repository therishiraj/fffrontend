import React from 'react';
import './Transactions.css';

const Transactions = () => {
  return (
    <div className="transactions-page">
      <h2>Transaction History</h2>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-11-08</td>
            <td>#12345</td>
            <td>$150.00</td>
            <td>Completed</td>
          </tr>
          {/* More rows */}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;