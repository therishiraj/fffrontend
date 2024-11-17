import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import AuthContext
import Categories from '../components/Categories';
import './Shop.css';

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // to set current index 
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] = useState(false);
  const [isPriceDropdownVisible, setIsPriceDropdownVisible] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState('All');
  const [showBuyerPopup, setShowBuyerPopup] = useState(false); // New state for buyer popup
  const navigate = useNavigate();
  const { role } = useAuth(); // Get the user's role from AuthContext

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closePopup = () => {
    setSelectedProduct(null);
    setShowBuyerPopup(false); // Close the buyer popup
  };

  const handleImageNavigation = (direction) => {
    if (selectedProduct) {
      const totalImages = selectedProduct.images.length;
      if (direction === 'next') {
        setCurrentImageIndex((currentImageIndex + 1) % totalImages);
      } else if (direction === 'prev') {
        setCurrentImageIndex((currentImageIndex - 1 + totalImages) % totalImages);
      }
    }
  };

  const handleMeetSeller = () => {
    closePopup();
    navigate('/messages');
  };

  const handleBuyNowClick = (product) => {
    if (role === 'seller') {
      setShowBuyerPopup(true); // Show popup if the user is a seller
    } else {
      handleProductClick(product); // Allow buyers to proceed
    }
  };

  const handleCategoryFilter = () => {
    setIsCategoryDropdownVisible(!isCategoryDropdownVisible);
    setIsPriceDropdownVisible(false);
  };

  const handlePriceSort = () => {
    setIsPriceDropdownVisible(!isPriceDropdownVisible);
    setIsCategoryDropdownVisible(false);
  };

  const handleCategorySelect = (category) => {
    setFilteredCategory(category); // Update the selected category
    setIsCategoryDropdownVisible(false);
  };

  const handleSortSelect = (order) => {
    const sorted = [...products].sort((a, b) =>
      order === 'low-to-high' ? a.price - b.price : b.price - a.price
    );
    setSortedProducts(sorted);
    setIsPriceDropdownVisible(false);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://13.54.149.207:3001/api/v0/open/get-products');
      const data = await response.json();

      if (data.success) {
        const formattedProducts = data.items.map((item) => ({
          id: item._id,
          name: item.item_name,
          images: item.image_urls, // Use array of images
          price: item.price,
          description: item.description,
          category: item.category,
          age: item.item_age,
          condition: item.condition,
        }));
        setProducts(formattedProducts);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const displayedProducts = (sortedProducts.length > 0 ? sortedProducts : products).filter(
    (product) => filteredCategory === 'All' || product.category.toLowerCase() === filteredCategory.toLowerCase()
  );

  return (
    <div className="shop">
      <header className="shop-header">
        <h1>Pick your product</h1>
        <p>Browse through our wide range of affordable used items that are perfect for NITC students!</p>
      </header>

      <Categories onCategorySelect={handleCategorySelect} />

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
            <button onClick={() => handleCategorySelect('Books')}>Books</button>
            <button onClick={() => handleCategorySelect('Kitchenware')}>Kitchenware</button>
            <button onClick={() => handleCategorySelect('Electronics')}>Electronics</button>
            <button onClick={() => handleCategorySelect('Furniture')}>Furniture</button>
            <button onClick={() => handleCategorySelect('Other')}>Other</button>

          </div>
        )}
      </div>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {displayedProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.images[0]} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
              <p className="condition">Condition: {product.condition}/5</p>
              <button className="add-to-cart" onClick={() => handleBuyNowClick(product)}>
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
            <div className="image-slider">
              <img src={selectedProduct.images[currentImageIndex]} alt={`Product ${currentImageIndex + 1}`} />
              <button className="arrow right-arrow" onClick={() => handleImageNavigation('next')}>I am interested
                &#8250;
              </button>
            </div>
            <p className="category">Category: {selectedProduct.category}</p>
            <p className="description">{selectedProduct.description}</p>
            <p className="age">Age: {selectedProduct.age} months</p>
            <p className="condition">Condition: {selectedProduct.condition}/5</p>
            <p className="price">Price: ₹{selectedProduct.price}</p>
            <button onClick={closePopup}>Close</button>
            <button onClick={handleMeetSeller} className="meet-seller">
              Meet the Seller
            </button>
          </div>
        </div>
      )}

      {/* Buyer Popup */}
      {showBuyerPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Please register as a buyer to purchase this product.</p>
            <button onClick={closePopup} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
