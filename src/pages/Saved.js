import React, { useState } from 'react';
import './Saved.css';

const Saved = () => {
  // Sample initial data for saved items
  const [savedItems, setSavedItems] = useState([
    { id: 1, title: "Item 1", description: "Short description of item 1", img: "path_to_image" },
    { id: 2, title: "Item 2", description: "Short description of item 2", img: "path_to_image" },
    { id: 3, title: "Item 3", description: "Short description of item 3", img: "path_to_image" },
    { id: 4, title: "Item 4", description: "Short description of item 4", img: "path_to_image" },
    { id: 5, title: "Item 5", description: "Short description of item 5", img: "path_to_image" },
    { id: 6, title: "Item 6", description: "Short description of item 6", img: "path_to_image" }
  ]);

  // Function to remove an item by its ID
  const handleRemove = (id) => {
    const updatedItems = savedItems.filter(item => item.id !== id);
    setSavedItems(updatedItems);
  };

  return (
    <div className="saved-page">
      <h2>Saved Items</h2>
      <div className="saved-items">
        {savedItems.map(item => (
          <div className="saved-item" key={item.id}>
            <img src={item.img} alt="Item" className="item-thumbnail" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button className="remove-btn" onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
