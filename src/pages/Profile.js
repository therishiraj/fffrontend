import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa'; // Import an icon from react-icons

  const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [userData, setUserData] = useState({
    "email": "",
    "name":"",
    "phone":"",
    "role":"",
    "seller_info": {
    item_counts:"",
    seller_address:""
    },
    user_id:"",
    year_of_study: ""  });
  const [myListings, setMyListings] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { role } = useAuth();

  // axios.defaults.baseURL = 
  const fetchMyListings = async () => {
    try {
      console.log("called")
      const response = await axios.get('/open/get-products');
      const data = response.data;
      console.log(data)
      if (data.success) {
        const userProducts = data.items
          .filter((item) => item.seller_id === userData.user_id)
          .map((item) => ({
            id: item._id,
            name: item.item_name,
            images: item.image_urls,
            price: item.price,
            description: item.description,
            category: item.category,
            age: item.item_age,
            condition: item.condition,
          }));
          console.log(data)
        setMyListings(userProducts);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const fetchUserData = async () => {
    try {
      const user_id = localStorage.getItem('user_id') || '';
      const response = await axios.post(
        '/protected/get-user-complete',
        { user_id, role },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('accessToken'),
          },
        }
      );
      console.log(response)
      if (response.status === 200) {
        setUserData(response.data.details); // Update state with the API response
        localStorage.setItem('name', response.data.details.name || '');
        localStorage.setItem('email', response.data.details.email || '');
        localStorage.setItem('phone', response.data.details.phone || '');
        localStorage.setItem('year_of_study', response.data.details.year_of_study || '');
        /*localStorage.setItem('address', response.data.details.seller_info.seller_address || '');*/
      } else {
        console.error('Failed to fetch user data:', response);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchMyListings();
  }, []);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      setProfilePhoto(photoURL);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const closePopup = () => {
    setSelectedProduct(null);
    setCurrentImageIndex(0);
  };

  const handleImageNavigation = (direction) => {
    if (selectedProduct) {
      const totalImages = selectedProduct.images.length;
      if (direction === 'next') {
        setCurrentImageIndex((currentImageIndex + 1) % totalImages);
      } else if (direction === 'prev') {
        setCurrentImageIndex((currentImageIndex - 1 + totalImages) % totalImages);
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      console.log(productId);
      const response = await axios.delete(`protected/remove-product?id=${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken'),
        },
      });

      const data = response.data;
      if (response.ok) {
        alert('Product deleted successfully');
        setMyListings(myListings.filter((product) => product.id !== productId));
        closePopup();
      } else {
        alert(`Failed to delete product: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('An error occurred while deleting the product.');
    }
  };
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
        {profilePhoto ? (
        <img src={profilePhoto} alt="User Avatar" />
        ) : (
              <FaUserCircle className="default-avatar-icon" /> // Display default user icon
        )}
        <input type="file" id="file-upload" onChange={handlePhotoUpload} />
          <label htmlFor="file-upload" className="upload-label">Upload Photo</label>
        </div>
        <div className="profile-status">
          <h3>{userData.name || "User Name"}</h3>
          <span className="status-badge">{role || "No role assigned"}</span>
          <p>Number of Items Listed: {myListings.length}</p>
          <button onClick={toggleEdit}>{isEditing ? "Save" : "Edit Profile"}</button>
        </div>
      </div>

      <div className="profile-details">
        <div className="section">
          <h3>Personal Details</h3>
          <div className="details-grid">
            <div>
              <label>Name</label>
              <p contentEditable={isEditing}>{userData.name}</p>
            </div>
            <div>
              <label>Email</label>
              <p>{userData.email}</p>
            </div>
            <div>
              <label>Phone</label>
              <p contentEditable={isEditing}>{userData.phone}</p>
            </div>
            <div>
              <label>Year of Study</label>
              <p contentEditable={isEditing}>{userData.year_of_study}</p>
            </div>
            <div>
              <label>Role</label>
              <p>{role}</p>
            </div>
            {/* <div><label>Address</label><p>{userData.seller_info.seller_address}</p>
            </div> */}
          </div>
        </div>

        <div className="section my-listings">
          <h3>My Listings</h3>
          {myListings.length > 0 ? (
            <ul>
              {myListings.map((product) => (
                <li
                  key={product.id}
                  className="listing-item"
                  onClick={() => handleProductClick(product)}
                >
                  {product.name} - ₹{product.price}
                </li>
              ))}
            </ul>
          ) : (
            <p>No items listed yet.</p>
          )}
        </div>
      </div>

      {/* Popup for Product Details */}
      {selectedProduct && (
        <div className="popup">
          <div className="popup-content">
            <h3>{selectedProduct.name}</h3>
            <div className="image-slider">
              <img
                src={selectedProduct.images[currentImageIndex]}
                alt={`Product ${currentImageIndex + 1}`}
              />
              {selectedProduct.images.length > 1 && (
                <div className="slider-controls">
                  <button className="arrow" onClick={() => handleImageNavigation('prev')}>
                    &#8249; Prev
                  </button>
                  <button className="arrow" onClick={() => handleImageNavigation('next')}>
                    Next &#8250;
                  </button>
                </div>
              )}
            </div>
            <p className="category">Category: {selectedProduct.category}</p>
            <p className="description">{selectedProduct.description}</p>
            <p className="age">Age: {selectedProduct.age} months</p>
            <p className="condition">Condition: {selectedProduct.condition}/5</p>
            <p className="price">Price: ₹{selectedProduct.price}</p>
            <button
              onClick={() => handleDeleteProduct(selectedProduct.id)}
              className="delete-button"
            >
              Delete Product
            </button>
            <button onClick={closePopup} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
