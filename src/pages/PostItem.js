import React, { useState } from 'react';
import './PostItem.css'; // We will add the styling for this component
import axios from 'axios';

const PostItem = () => {
  const [itemName, setItemName] = useState('');
  const [itemAge, setItemAge] = useState('');
  const [price, setPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [category, setCategory] = useState('');
  const [itemCondition, setItemCondition] = useState(0); // Rating scale (1-5)
  const [conditionDescription, setConditionDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  //axios.defaults.baseURL = "http://13.54.149.207:3001/api/v0";

  // Define descriptions for each rating
  const descriptions = ["Bad", "Decent", "Fair", "Good", "Excellent"];

  // Check if file is an image
  const validateFile = (file) => {
    const allowedExtensions = ["image/jpeg", "image/jpg", "image/png"];
    return file && allowedExtensions.includes(file.type);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please upload a valid image file (jpg, jpeg, or png).');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !validateFile(file)) {
      setError('Please upload a valid image file (jpg, jpeg, or png).');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    const userId = localStorage.getItem('user_id'); // Fetch user_id from local storage
    formData.append('seller_id', userId);
    formData.append('item_name', itemName);
    formData.append('description', itemDescription);
    formData.append('condition', itemCondition);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('file', file);

    try {
      // Send data to the backend
      const response = await axios.post('http://13.54.149.207:3001/api/v0/protected/add-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('accessToken'), // Add authorization token if required
        },
      });

      // Handle success
      console.log('Token sent:', localStorage.getItem('token'));
      console.log(response.data);
      alert('Item posted successfully!');
    } catch (error) {
      console.error(error);
      setError('Failed to post the item. Please try again later.');
    }
  };

  return (
    <div className="post-item-container">
      <h2>Post an Item</h2>
      <form onSubmit={handleSubmit} className="post-item-form">
        {/* Item Name */}
        <div className="form-group">
          <label className="label1">Item Name</label>
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>

        {/* Item Age */}
        <div className="form-group">
          <label className="label1">Item Age</label>
          <input
            type="text"
            placeholder="Mention the Item Age in months"
            value={itemAge}
            onChange={(e) => setItemAge(e.target.value)}
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label className="label1">Price</label>
          <input
            type="number"
            placeholder="Put your expected price in Rs."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Item Description */}
        <div className="form-group">
          <label className="label1">Item Description</label>
          <textarea
            placeholder="Description of the item"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label className="label1">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="books">Books</option>
            <option value="clothing">Clothing</option>
            <option value="furniture">Furniture</option>
          </select>
        </div>

        {/* Item Condition (Rating) */}
        <div className="form-group">
          <label className="label1">Item Condition</label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((rating) => (
              <span
                key={rating}
                className={`star ${itemCondition >= rating ? 'filled' : ''}`}
                onClick={() => {
                  setItemCondition(rating);
                  setConditionDescription(descriptions[rating - 1]);
                }}
                title={descriptions[rating - 1]} // Tooltip for each star
              >
                ★
              </span>
            ))}
          </div>
          {conditionDescription && (
            <div className="condition-description">
              {conditionDescription}
            </div>
          )}
        </div>

        {/* File Upload */}
        <div className="form-group">
          <label className="label1">Upload File</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        {error && <p className="error-message">{error}</p>}

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PostItem;
