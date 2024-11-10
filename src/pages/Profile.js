import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("https://via.placeholder.com/150");

  const toggleEdit = () => setIsEditing(!isEditing);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      setProfilePhoto(photoURL);
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
          <h3>User Name</h3>
          <span className="status-badge">Student</span>
          <p>Number of Items Listed: 5</p>
          <button onClick={toggleEdit}>{isEditing ? "Save" : "Edit Profile"}</button>
        </div>
      </div>

      <div className="profile-details">
        <div className="section">
          <h3>Personal Details</h3>
          <div className="details-grid">
            <div>
              <label>Name</label>
              <p contentEditable={isEditing}>Rishi</p>
            </div>
            <div>
              <label>Nationality</label>
              <p contentEditable={isEditing}>Indian</p>
            </div>
            <div>
              <label>Gender</label>
              <p contentEditable={isEditing}>Male</p>
            </div>
            <div>
              <label>College</label>
              <p contentEditable={isEditing}>NIT Calicut</p>
            </div>
            <div>
              <label>State</label>
              <p contentEditable={isEditing}>Kerala</p>
            </div>
            <div>
              <label>Email</label>
              <p contentEditable={isEditing}>rio@nitc.ac.in</p>
            </div>
          </div>
        </div>

        <div className="section my-listings">
          <h3>My Listings</h3>
          <ul>
            <li className="listing-item" onClick={() => alert("Show item details")}>Item 1</li>
            <li className="listing-item" onClick={() => alert("Show item details")}>Item 2</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
