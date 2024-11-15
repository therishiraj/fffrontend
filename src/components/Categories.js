// import React from 'react';
// import './Categories.css';

// function Categories() {
//   const categories = ["Furniture", "Electronics", "Clothing", "Books", "Sports"];

//   return (
//     <section className="categories">
//       <h3>Browse Categories</h3>
//       <div className="category-tags">
//         {categories.map((category, index) => (
//           <button className="category-tag" key={index}>
//             {category}
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Categories;


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