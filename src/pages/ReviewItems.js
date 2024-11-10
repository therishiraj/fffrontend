// ReviewItems.js
import React, { useState } from 'react';
import './ReviewItems.css';

const ReviewItems = () => {
  const [reportedItems, setReportedItems] = useState([
    { id: 1, name: 'Prohibited Book', reason: 'Banned content' },
    { id: 2, name: 'Illicit Software', reason: 'Unauthorized software' },
    // Sample item data; in a real app, fetch this data from a server
  ]);

  const handleRemoveItem = (itemId) => {
    // Logic to remove item, e.g., API call
    const updatedItems = reportedItems.filter(item => item.id !== itemId);
    setReportedItems(updatedItems);
    alert('Item removed successfully');
  };

  return (
    <div className="review-items-container">
      <h2>Review Items</h2>
      <div className="item-list">
        <h3>Reported Items</h3>
        <ul>
          {reportedItems.map(item => (
            <li key={item.id}>
              <p><strong>{item.name}</strong> - {item.reason}</p>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="remove-item-button"
              >
                Remove Item
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewItems;
