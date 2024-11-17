import React, { useState, useEffect } from 'react';
import './MyOrders.css';

const MyOrders = () => {
  // Hardcoded orders (with photos and buyer email)
  const [orders] = useState([
    {
      id: 1,
      itemName: 'Wireless Headphones',
      purchaseDate: new Date().toString(),
      status: 'Delivered',
      photo: 'https://via.placeholder.com/150',
      buyerEmail: 'emma@nitc.ac.in', // Approved buyer email
    },
    {
      id: 2,
      itemName: 'Graphic Tablet',
      purchaseDate: new Date().toString(),
      status: 'In Transit',
      photo: 'https://via.placeholder.com/150',
      buyerEmail: null, // Not yet approved
    },
    {
      id: 3,
      itemName: 'Laptop Stand',
      purchaseDate: new Date().toString(),
      status: 'Cancelled',
      photo: 'https://via.placeholder.com/150',
      buyerEmail: null, // Not yet approved
    },
    {
      id: 4,
      itemName: 'Beta',
      purchaseDate: new Date().toString(),
      status: 'Cancelled',
      photo: 'https://via.placeholder.com/150',
      buyerEmail: 'john.doe@nitc.ac.in', // Approved buyer email
    },
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading from an API
    setLoading(true);
    const fetchOrders = async () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="my-orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p className="no-orders">You have no orders yet.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <div className="order-photo">
                <img src={order.photo} alt={order.itemName} />
              </div>
              <div className="order-details">
                <p className="item-name">{order.itemName}</p>
                <small className="purchase-date">
                  Purchased on: {new Date(order.purchaseDate).toLocaleDateString()}
                </small>
                <span className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
                {order.buyerEmail && (
                  <p className="buyer-email">
                    <strong>Buyer Email:</strong> {order.buyerEmail}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
