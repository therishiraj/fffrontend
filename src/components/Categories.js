import React from 'react';
import './Categories.css';

function Categories() {
  const categories = ["Furniture", "Electronics", "Clothing", "Books", "Sports"];

  return (
    <section className="categories">
      <h3>Browse Categories</h3>
      <div className="category-tags">
        {categories.map((category, index) => (
          <button className="category-tag" key={index}>
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;
