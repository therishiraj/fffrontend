import React from 'react';

const Categories = ({ onCategorySelect }) => {
  return (
    <div className="categories">
      <h3>Browse Categories</h3>
      <button onClick={() => onCategorySelect('All')}>All</button>
      <button onClick={() => onCategorySelect('Stationery')}>Stationery</button>
      <button onClick={() => onCategorySelect('Kitchenware')}>Kitchenware</button>
      <button onClick={() => onCategorySelect('Electronics')}>Electronics</button>
      <button onClick={() => onCategorySelect('Furniture')}>Furniture</button>
      <button onClick={() => onCategorySelect('Home Decor')}>Home Decor</button>
    </div>
  );
};

export default Categories;
