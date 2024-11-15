import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import './Shop.css';

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] = useState(false);
  const [isPriceDropdownVisible, setIsPriceDropdownVisible] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState('All');
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  const handleMeetSeller = () => {
    closePopup();
    navigate('/messages');
  };

  const handleCategoryFilter = () => {
    setIsCategoryDropdownVisible(!isCategoryDropdownVisible);
    setIsPriceDropdownVisible(false); // Close price dropdown if open
  };

  const handlePriceSort = () => {
    setIsPriceDropdownVisible(!isPriceDropdownVisible);
    setIsCategoryDropdownVisible(false); // Close category dropdown if open
  };

  const handleCategorySelect = (category) => {
    setFilteredCategory(category);
    setIsCategoryDropdownVisible(false);
  };

  const handleSortSelect = (order) => {
    const sorted = [...products].sort((a, b) => {
      const priceA = parseFloat(a.price.replace('$', ''));
      const priceB = parseFloat(b.price.replace('$', ''));
      return order === 'low-to-high' ? priceA - priceB : priceB - priceA;
    });
    setSortedProducts(sorted);
    setIsPriceDropdownVisible(false);
  };

  const products = [
    { id: 1, name: 'Parker Ball Pen', image: 'https://m.media-amazon.com/images/I/71rzb-oaO6L.jpg', price: '$5', description: 'A good old costly pen', category: 'Stationery' },
    { id: 2, name: 'Thermos Bottle', image: 'https://m.media-amazon.com/images/I/71sX+zyCwzL.jpg', price: '$10', description: 'A perfect container to keep your warm water hot for a long time', category: 'Kitchenware' },
    { id: 3, name: 'Apple Charger', image: 'https://m.media-amazon.com/images/I/51mFSgo26PL._AC_.jpg', price: '$100', description: 'iPhone charger hai sir ji', category: 'Electronics' },
    { id: 4, name: 'Kettle Electric', image: 'https://m.media-amazon.com/images/I/717V4glGOsL._AC_UF894,1000_QL80_.jpg', price: '$104', description: 'Best for making hot water and tea/coffee', category: 'Kitchenware' },
    { id: 5, name: 'Table Lamp', image: 'https://m.media-amazon.com/images/I/61r9G8yzTCL.jpg', price: '$40', description: 'Study at night without disturbing your roommate now', category: 'Furniture' },
    { id: 6, name: 'Pillow', image: 'https://m.media-amazon.com/images/I/71AwbwrbYCL._AC_UF350,350_QL80_.jpg', price: '$10', description: 'Takia hai bhay', category: 'Home Decor' },
  ];

  const displayedProducts = (sortedProducts.length > 0 ? sortedProducts : products).filter(
    (product) => filteredCategory === 'All' || product.category === filteredCategory
  );

  return (
    <div className="shop">
      <header className="shop-header">
        <h1>Pick your product</h1>
        <p>Browse through our wide range of affordable used items that are perfect for NITC students!</p>
      </header>

      <Categories />

      <div className="filter-sort">
        <button onClick={handlePriceSort}>Sort by Price</button>
        <button onClick={handleCategoryFilter}>Filter by Category</button>

        {isPriceDropdownVisible && (
          <div className="dropdown-menu">
            <button onClick={() => handleSortSelect('low-to-high')}>Low to High</button>
            <button onClick={() => handleSortSelect('high-to-low')}>High to Low</button>
          </div>
        )}

        {isCategoryDropdownVisible && (
          <div className="dropdown-menu">
            <button onClick={() => handleCategorySelect('All')}>All</button>
            <button onClick={() => handleCategorySelect('Stationery')}>Stationery</button>
            <button onClick={() => handleCategorySelect('Kitchenware')}>Kitchenware</button>
            <button onClick={() => handleCategorySelect('Electronics')}>Electronics</button>
            <button onClick={() => handleCategorySelect('Furniture')}>Furniture</button>
            <button onClick={() => handleCategorySelect('Home Decor')}>Home Decor</button>
          </div>
        )}
      </div>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {displayedProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
              <p className="description">{product.description}</p>
              <p className="category">{product.category}</p>
              <button className="add-to-cart" onClick={() => handleProductClick(product)}>
                Buy now
              </button>
            </div>
          ))}
        </div>
      </section>

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
