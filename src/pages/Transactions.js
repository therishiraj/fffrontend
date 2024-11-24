import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Transactions.css';

const Transactions = () => {
  const [requests, setRequests] = useState([]); // Store requests data
  const [error, setError] = useState(''); // Error handling
  const [buyerInfo, setBuyerInfo] = useState(null); // Store buyer info for the popup
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility

  // Fetch seller requests
  const fetchRequests = async () => {
    const userId = localStorage.getItem('user_id'); // Seller ID from localStorage
    const accessToken = localStorage.getItem('accessToken'); // Access token

    try {
      const response = await axios.get(
        'http://13.54.149.207:3001/api/v0/protected/get-products-requests',
        {
          params: { _id: userId, role: 'seller' }, // Fetch requests for the seller
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      if (response.status === 200 && response.data.cart_requests) {
        console.log("Get product response:",response)
        setRequests(response.data.cart_requests); // Store requests
      } else {
        setRequests([]);
        setError('No requests found.');
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      setRequests([]);
      setError('An error occurred while fetching requests.');
    }
  };

  // Update request status dynamically
  const updateRequestStatus = async (cartId, status) => {
    const accessToken = localStorage.getItem('accessToken');
  
    try {
      const response = await axios.patch(
        `http://13.54.149.207:3001/api/v0/protected/change_request_status`,
        { status },
        {
          params: { cart_id: cartId }, // Send cart ID in query params
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
  
      // Log the response to debug
      console.log('Response from server:', response);
  
      // Check for success in the response data
      if (response.data && response.data.success) {
        alert(`Request ${status} successfully!`);
        
        // Dynamically update the status in the requests state
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === cartId ? { ...request, approved: status === 'approved' } : request
          )
        );
      } else {
        // If no success indicator in response
        alert(response.data.message || 'Failed to update request status.');
      }
    } catch (error) {
      console.error('Error updating request status:', error);
      alert(error.response?.data?.message || 'An error occurred while updating the request status.');
    }
  };

  // Fetch buyer info
  const fetchBuyerInfo = async (buyerId) => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await axios.post(
        'http://13.54.149.207:3001/api/v0/protected/get-user-complete',
        {
          user_id: buyerId,
          role: 'buyer',
        },
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("This is user details",response)
        setBuyerInfo(response.data.details); // Store buyer info
        setShowPopup(true); // Show the popup
      } else {
        alert('Failed to fetch buyer information.');
      }
    } catch (error) {
      console.error('Error fetching buyer info:', error);
      alert(error.response?.data?.message || 'An error occurred while fetching buyer information.');
    }
  };
  
   // Close the popup
   const closePopup = () => {
    setShowPopup(false);
    setBuyerInfo(null);
  };

  // Fetch requests on component mount
  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="transactions-page">
      <h2>Requests for Your Products</h2>
      {requests.length > 0 ? (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>Comment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request._id}>
                <td>{index + 1}</td>
                <td>{request.item_name}</td>
                <td>{request.comment}</td>
                <td>{request.approved ? 'Approved' : 'Pending'}</td>
                <td className="action-buttons">
                  {request.approved ? (
                    <button
                      className="info-button"
                      onClick={() => fetchBuyerInfo(request.buyer_id)}
                    >
                      Get Info
                    </button>
                  ) : (
                    <>
                      <button
                        className="approve-button"
                        onClick={() => updateRequestStatus(request._id, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="decline-button"
                        onClick={() => updateRequestStatus(request._id, 'declined')}
                      >
                        Decline
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-requests">{error || 'No requests available.'}</p>
      )}

      {/* Popup for Buyer Info */}
      {showPopup && buyerInfo && (
        <div className="popup">
          <div className="popup-content">
            <h3>Buyer Information</h3>
            <p><strong>Name:</strong> {buyerInfo.name}</p>
            <p><strong>Email:</strong> {buyerInfo.email}</p>
            <p><strong>Phone:</strong> {buyerInfo.phone}</p>
            <p><strong>Address:</strong> {buyerInfo.buyer_info.buyer_address || 'N/A'}</p>
            <button onClick={closePopup} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
