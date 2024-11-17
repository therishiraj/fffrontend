import React, { useState } from 'react';
import './Notifications.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Notifications = () => {
  // Hardcoded notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Your item has been sold!', date: new Date().toString(), read: false },
    { id: 2, message: 'You have a new message from John.', date: new Date().toString(), read: false },
    { id: 3, message: 'Your post received a new "I’m Interested" click!', date: new Date().toString(), read: true },
  ]);

  // Mark a notification as read
  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="notifications-page">
      <h1>Notifications</h1>

      <button
        className="clear-notifications-btn"
        onClick={clearNotifications}
        disabled={notifications.length === 0}
      >
        Clear All Notifications
      </button>

      {notifications.length === 0 ? (
        <p className="no-notifications">No notifications available.</p>
      ) : (
        <ul className="notifications-list">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`notification-item ${notification.read ? 'read' : ''}`}
            >
              <div className="notification-content">
                {/* Notification Icon */}
                <div className="notification-icon">
                  <FontAwesomeIcon icon={faBell} size="lg" />
                </div>
                {/* Notification Details */}
                <div className="notification-details">
                  <p>{notification.message}</p>
                  <small>{new Date(notification.date).toLocaleString()}</small>
                </div>
                {/* Mark as Read Button */}
                {!notification.read && (
                  <button
                    className="mark-as-read-btn"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
