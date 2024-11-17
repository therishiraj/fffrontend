import React from 'react';
import './Transactions.css';

const Transactions = () => {
  const transactions = [
    {
      index: 1,
      itemDetails: 'Introduction to Algorithms - Book',
      soldBy: 'seller1@nitc.ac.in',
      soldTo: 'buyer1@nitc.ac.in',
      status: 'Sold',
    },
    {
      index: 2,
      itemDetails: 'Mechanical Keyboard',
      soldBy: 'seller2@nitc.ac.in',
      soldTo: 'N/A', // For unsold items
      status: 'Unsold',
    },
    // Add more transactions here
  ];

  // Suggestion for verifying the status:
  // - "Sold" if a "Sold To" field has valid data (not "N/A").
  // - "Unsold" if the "Sold To" field is empty or "N/A".
  const verifyStatus = (soldTo) => (soldTo === 'N/A' ? 'Unsold' : 'Sold');

  return (
    <div className="transactions-page">
      <h2>Transaction History</h2>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Item Details</th>
            <th>Sold By</th>
            <th>Sold To</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.index}>
              <td>{transaction.index}</td>
              <td>{transaction.itemDetails}</td>
              <td>{transaction.soldBy}</td>
              <td>{transaction.soldTo}</td>
              <td>{verifyStatus(transaction.soldTo)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
