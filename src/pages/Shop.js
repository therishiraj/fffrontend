import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories'; // Import Categories component
import './Shop.css';

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  const handleMeetSeller = () => {
    closePopup();
    navigate('/messages'); // Redirect to the chatbot page
  };

  const products = [
    {
      id: 1,
      name: 'Parker Ball Pen',
      image: 'https://m.media-amazon.com/images/I/71rzb-oaO6L.jpg',
      price: '$5',
      description: 'A good old costly pen',
    },
    {
      id: 2,
      name: 'Thermos Bottle',
      image: 'https://m.media-amazon.com/images/I/71sX+zyCwzL.jpg',
      price: '$10',
      description: 'A perfect container to keep your warm water hot for a long time',
    },
    {
      id: 3,
      name: 'Apple Charger',
      image: 'https://m.media-amazon.com/images/I/51mFSgo26PL._AC_.jpg',
      price: '$100',
      description: 'iPhone charger hai sir ji',
    },
    {
      id: 4,
      name: 'Kettle Electric',
      image: 'https://m.media-amazon.com/images/I/717V4glGOsL._AC_UF894,1000_QL80_.jpg',
      price: '$104',
      description: 'Best for making hot water and tea/coffee',
    },
    {
      id: 5,
      name: 'Table Lamp',
      image: 'https://m.media-amazon.com/images/I/61r9G8yzTCL.jpg',
      price: '$40',
      description: 'Study at night without disturbing your roommate now',
    },
    {
      id: 6,
      name: 'Pillow',
      image: 'https://m.media-amazon.com/images/I/71AwbwrbYCL._AC_UF350,350_QL80_.jpg',
      price: '$10',
      description: 'Takia hai bhay',
    },
  ];

  return (
    <div className="shop">
      {/* Shop Header */}
      <header className="shop-header">
        <h1>Shop Our Collection</h1>
        <p>Browse through our wide range of affordable used items that are perfect for students!</p>
      </header>

      {/* Categories Section */}
      <Categories />

      {/* Filter & Sort Section */}
      <div className="filter-sort">
        <button>Sort by Price</button>
        <button>Filter by Category</button>
      </div>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
              <p className="description">{product.description}</p>
              <button className="add-to-cart" onClick={() => handleProductClick(product)}>
                Buy now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Popup Modal */}
      {selectedProduct && (
        <div className="popup">
          <div className="popup-content">
            <h3>{selectedProduct.name}</h3>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <p>{selectedProduct.description}</p>
            <p className="price">{selectedProduct.price}</p>
            <button onClick={closePopup}>Close</button>
            <button onClick={handleMeetSeller} className="meet-seller">
              Meet the Seller
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
