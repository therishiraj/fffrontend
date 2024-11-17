import React, { useState } from 'react';
import './PostItem.css';
import axios from 'axios';

const PostItem = () => {
  const [itemName, setItemName] = useState('');
  const [itemAge, setItemAge] = useState('');
  const [price, setPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [category, setCategory] = useState('');
  const [itemCondition, setItemCondition] = useState(0);
  const [conditionDescription, setConditionDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Define descriptions for each rating
  const descriptions = ["Bad", "Decent", "Fair", "Good", "Excellent"];

  const validateFiles = (selectedFiles) => {
    const allowedExtensions = ["image/jpeg", "image/jpg", "image/png"];
    return Array.from(selectedFiles).every((file) => allowedExtensions.includes(file.type));
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (validateFiles(selectedFiles)) {
      setFiles([...files, ...Array.from(selectedFiles)]);
      setError('');
    } else {
      setError('Please upload only valid image files (jpg, jpeg, or png).');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!files.length) {
      setError('Please upload at least one image.');
      return;
    }

    const formData = new FormData();
    const userId = localStorage.getItem('user_id');
    formData.append('seller_id', userId);
    formData.append('item_name', itemName);
    formData.append('description', itemDescription);
    formData.append('item_age', itemAge);
    formData.append('condition', itemCondition);
    formData.append('category', category);
    formData.append('price', price);
    files.forEach((file) => formData.append('images', file));

    try {
      const response = await axios.post('http://13.54.149.207:3001/api/v0/protected/add-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: localStorage.getItem('accessToken'),
        },
      });
      setIsPopupVisible(true); // Show popup on success
      setItemName('');
      setItemAge('');
      setPrice('');
      setItemDescription('');
      setCategory('');
      setItemCondition(0);
      setFiles([]);
    } catch (error) {
      console.error(error);
      setError('Failed to post the item. Please try again later.');
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="post-item-container">
      <h2>Post an Item</h2>
      <form onSubmit={handleSubmit} className="post-item-form">
        <div className="form-group">
          <label className="label1">Item Name</label>
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label1">Item Age (in months)</label>
          <input
            type="number"
            placeholder="Mention the Item Age"
            value={itemAge}
            onChange={(e) => setItemAge(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label1">Price (in Rs.)</label>
          <input
            type="number"
            placeholder="Enter expected price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label1">Item Description</label>
          <textarea
            placeholder="Description of the item"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label1">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="books">Books</option>
            <option value="clothing">Clothing</option>
            <option value="furniture">Furniture</option>
            <option value="kitchenware">Kitchenware</option>
            <option value="other">Other</option>
          </select>
        </div>

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
                title={descriptions[rating - 1]}
              >
                ★
              </span>
            ))}
          </div>
          {conditionDescription && (
            <div className="condition-description">{conditionDescription}</div>
          )}
        </div>

        <div className="form-group">
          <label className="label1">Upload Images</label>
          <input type="file" multiple onChange={handleFileChange} />
          <div className="uploaded-images">
            {files.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Uploaded Preview ${index + 1}`}
                className="preview-image"
              />
            ))}
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>

      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <p>Product listed successfully!</p>
            <button onClick={closePopup} className="close-popup-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostItem;
