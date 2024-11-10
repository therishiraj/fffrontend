import React, { useState } from 'react';
import './PostItem.css'; // We will add the styling for this component

const PostItem = () => {
  const [itemName, setItemName] = useState('');
  const [itemAge, setItemAge] = useState('');
  const [price, setPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [category, setCategory] = useState('');
  const [itemCondition, setItemCondition] = useState(0); // Rating scale (1-5)
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ itemName, itemAge, price, itemDescription, category, itemCondition, file });
  };

  return (
    <div className="post-item-container">
      <h2>Post an Item</h2>
      <form onSubmit={handleSubmit} className="post-item-form">
        {/* Item Name */}
        <div className="form-group">
          <label>Item Name</label>
          <input
            type="text"
            placeholder="Hello"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>

        {/* Item Age */}
        <div className="form-group">
          <label>Item Age</label>
          <input
            type="text"
            placeholder="Mention the Item Age in months"
            value={itemAge}
            onChange={(e) => setItemAge(e.target.value)}
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            placeholder="Put your expected price in Rs."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Item Description */}
        <div className="form-group">
          <label>Item Description</label>
          <textarea
            placeholder="Description of the item"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category</label>
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
          <label>Item Condition</label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((rating) => (
              <span
                key={rating}
                className={`star ${itemCondition >= rating ? 'filled' : ''}`}
                onClick={() => setItemCondition(rating)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* File Upload */}
        <div className="form-group">
          <label>Upload File</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PostItem;
