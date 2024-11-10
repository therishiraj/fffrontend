// ReviewUsers.js
import React, { useState } from 'react';
import './ReviewUsers.css';

const ReviewUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@nitc.ac.in' },
    { id: 2, name: 'Jane Smith', email: 'jane@nitc.ac.in' },
    // Sample user data; in a real app, fetch this data from a server
  ]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleRemoveUser = (userId) => {
    // Logic to remove user, e.g., API call
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    setSelectedUser(null);
    alert('User account removed successfully');
  };

  return (
    <div className="review-users-container">
      <h2>Review Users</h2>
      <div className="user-list">
        <h3>User List</h3>
        <ul>
          {users.map(user => (
            <li key={user.id} onClick={() => handleSelectUser(user)}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      </div>

      {selectedUser && (
        <div className="user-details">
          <h3>User Profile Details</h3>
          <p><strong>Name:</strong> {selectedUser.name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <button
            onClick={() => handleRemoveUser(selectedUser.id)}
            className="remove-user-button"
          >
            Remove Account
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewUsers;
