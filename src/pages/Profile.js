import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("https://via.placeholder.com/150");
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    year_of_study: '',
    role: '',
    user_id: '',
  });
  const [myListings, setMyListings] = useState([]); // Store user's listings
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Fetch user data from localStorage
    const storedData = {
      name: localStorage.getItem('name') || '',
      email: localStorage.getItem('email') || '',
      phone: localStorage.getItem('phone') || '',
      year_of_study: localStorage.getItem('year_of_study') || '',
      role: localStorage.getItem('role') || '',
      user_id: localStorage.getItem('user_id') || '', // Ensure user_id is stored in localStorage
    };
    setUserData(storedData);

    // Fetch all products and filter by seller_id
    const fetchMyListings = async () => {
      try {
        const response = await fetch('http://13.54.149.207:3001/api/v0/open/get-products');
        const data = await response.json();

        if (data.success) {
          const userProducts = data.items
            .filter((item) => item.seller_id === storedData.user_id)
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
          setMyListings(userProducts);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

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
    setCurrentImageIndex(0); // Reset image index when a new product is selected
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

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          <img src={profilePhoto} alt="User Avatar" />
          <input type="file" id="file-upload" onChange={handlePhotoUpload} />
          <label htmlFor="file-upload" className="upload-label">Upload Photo</label>
        </div>
        <div className="profile-status">
          <h3>{userData.name || "User Name"}</h3>
          <span className="status-badge">{userData.role || "Role"}</span>
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
              <p>{userData.role}</p>
            </div>
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
            <button onClick={closePopup} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
