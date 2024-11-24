import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Requests.css';

const Requests = () => {
  const [cartRequests, setCartRequests] = useState([]); // To store cart requests from API
  const [itemDetails, setItemDetails] = useState(null); // Fetched item details
  const [error, setError] = useState(''); // Error message
  const [itemApproved,setItemApproved] = useState()
  const [sellerInfo, setSellerInfo] = useState(null); // Seller info for the popup
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility
  
  // Fetch cart requests from the server
  const fetchCartRequests = async () => {
    const userId = localStorage.getItem('user_id'); // User ID from localStorage
    const role = localStorage.getItem('role'); // User role from localStorage
    const accessToken = localStorage.getItem('accessToken'); // Access token for authorization

    if (!userId || !role || !accessToken) {
      setError('User is not authenticated. Please log in.');
      return;
    }

    try {
      const response = await axios.get(
        'http://13.54.149.207:3001/api/v0/protected/get-products-requests',
        {
          params: { _id: userId, role: role }, // Send _id and role as query parameters
          headers: {
            Authorization: `${accessToken}`, // Add authorization header
          },
        }
      );

      if (response.status === 200 && response.data.cart_requests) {
        
        setCartRequests(response.data.cart_requests); // Update state with cart requests
        console.log(cartRequests)
      } else {
        setCartRequests([]); // No cart requests found
        setError('No cart requests found.');
      }
    } catch (error) {
      console.error('Error fetching cart requests:', error);
      setCartRequests([]); // Reset cart requests on error
      setError('An error occurred while fetching cart requests. Please try again.');
    }
  };

  // Fetch item details when a cart request is clicked
  const fetchItemDetails = async (itemId) => {
    const accessToken = localStorage.getItem('accessToken'); // Access token for authorization

    try {
      const response = await axios.get(
        'http://13.54.149.207:3001/api/v0/protected/get-item',
        {
          params: { _id: itemId }, // Send item_id as query parameter
          headers: {
            Authorization: `${accessToken}`, // Add authorization header
          },
        }
      );

      if (response.status === 200 && response.data.item) {
        console.log("Get item response",response)
        setItemDetails(response.data.item); // Update item details state  
      } else {
        setItemDetails(null); // Reset item details if no data is found
        setError('No item details found.');
      }
    } catch (error) {
      console.error('Error fetching item details:', error);
      setItemDetails(null); // Reset item details on error
      setError('An error occurred while fetching item details. Please try again.');
    }
  };

  // Fetch seller info
  const fetchSellerInfo = async (sellerId) => {
    const accessToken = localStorage.getItem('accessToken'); // Access token for authorization

    try {
      const response = await axios.post(
        'http://13.54.149.207:3001/api/v0/protected/get-user-complete',
        {
          user_id: sellerId,
          role: 'seller',
        },
        {
          headers: {
            Authorization: `${accessToken}`, // Add authorization header
          },
        }
      );

      if (response.status === 200 && response.data.details) {
        setSellerInfo(response.data.details); // Store seller info
        setShowPopup(true); // Show the popup
      } else {
        alert('Failed to fetch seller information.');
      }
    } catch (error) {
      console.error('Error fetching seller info:', error);
      alert('An error occurred while fetching seller information.');
    }
  };

  // Handle clicking a cart request
  const handleRequestClick = (request) => {
    setItemApproved(request.approved)
    fetchItemDetails(request.item_id); // Fetch details for the associated item
  };

   // Close the popup
   const closePopup = () => {
    setShowPopup(false);
    setSellerInfo(null);
  };

  // Fetch cart requests on component mount
  useEffect(() => {
    fetchCartRequests();
  }, []);

  return (
    <div className="requests-page">
      <aside className="sidebar">
        <h2>Cart Requests</h2>
        <ul className="request-list">
          {cartRequests.length > 0 ? (
            cartRequests.map((request) => (
              <li
                key={request._id}
                className="request-item"
                onClick={() => handleRequestClick(request)}
              >
                <strong>Cart ID:</strong> {request._id}
              </li>
            ))
          ) : (
            <p className="no-requests">{error || 'No cart requests available.'}</p>
          )}
        </ul>
      </aside>

      <section className="item-details">
        {itemDetails ? (
          <div className="details-container">
            <h2>Item Details</h2>
            <img
              src={itemDetails.image_urls[0]}
              alt={itemDetails.item_name}
              className="item-image"
            />
            <p><strong>Name:</strong> {itemDetails.item_name}</p>
            <p><strong>Description:</strong> {itemDetails.description}</p>
            <p><strong>Price:</strong> ₹{itemDetails.price}</p>
            <p><strong>Condition:</strong> {itemDetails.condition}/5</p>
            <p><strong>Category:</strong> {itemDetails.category}</p>
            <p><strong>Age:</strong> {itemDetails.item_age} months</p>
            <p><strong>Status:</strong> {itemApproved ? 'Approved' : 'Pending'}</p>
            {itemApproved && (
              <button
                className="info-button"
                onClick={() => fetchSellerInfo(itemDetails.seller_id)}
              >
                Get Info
              </button>
            )}
          </div>
        ) : (
          cartRequests.length > 0 && <p className="no-item-details">{error || 'Select a Cart ID to view details.'}</p>
        )}
      </section>

      {/* Popup for Seller Info */}
      {showPopup && sellerInfo && (
        <div className="popup">
          <div className="popup-content">
            <h3>Seller Information</h3>
            <p><strong>Name:</strong> {sellerInfo.name}</p>
            <p><strong>Email:</strong> {sellerInfo.email}</p>
            <p><strong>Phone:</strong> {sellerInfo.phone}</p>
            <p><strong>Address:</strong> {sellerInfo.seller_info?.seller_address || 'N/A'}</p>
            <button onClick={closePopup} className="close-button">Close</button>
          </div>
        </div>
      )}


    </div>
  );
};

export default Requests;
