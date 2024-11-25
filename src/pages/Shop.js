import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Categories from '../components/Categories';
import axios from 'axios';
import './Shop.css';

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [comment, setComment] = useState(''); // State for comment input
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] = useState(false);
  const [isPriceDropdownVisible, setIsPriceDropdownVisible] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState('All');
  const navigate = useNavigate();
  const { role } = useAuth();

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/open/get-products');
      
      if (response.data && response.data.success && Array.isArray(response.data.items)) {
        console.log("This is get-products reponse:",response)
        const formattedProducts = response.data.items
        .filter((item) => item.isListed)
        .map((item) => ({
          id: item._id,
          name: item.item_name,
          images: item.image_urls,
          price: item.price,
          description: item.description,
          category: item.category,
          age: item.item_age,
          condition: item.condition,
          seller_id: item.seller_id,
        }));
        setProducts(formattedProducts);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Handle "I am Interested" click
  const handleInterestedClick = (product) => {
    setSelectedProduct(product);
    setComment(''); // Reset the comment input
  };

  // Handle sending the request
  const handleSendRequest = async () => {
    const buyerId = localStorage.getItem('user_id') || '';
    const token = localStorage.getItem('accessToken');

    if (!token || !selectedProduct) {
      alert('User is not logged in or session has expired.');
      return;
    }

    try {
      const response = await axios.post(
        '/protected/add-to-cart',
        {
          seller_id: selectedProduct.seller_id,
          buyer_id: buyerId,
          item_id: selectedProduct.id,
          comment, // Include the comment in the request
          item_name: selectedProduct.name,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        alert('Request sent successfully!');
        navigate('/requests'); // Redirect to requests page
      } else {
        console.error('Failed to send request:', response);
      }
    } catch (error) {
      console.error('Error sending request:', error);
      if (error.response && error.response.status === 401) {
        alert('Unauthorized: Please log in again.');
      }
    } finally {
      setSelectedProduct(null); // Close the popup
      setComment(''); // Reset the comment input
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

      <Categories onCategorySelect={() => {}} />

      <div className="filter-sort">
        <button onClick={() => setIsPriceDropdownVisible(!isPriceDropdownVisible)}>Sort by Price</button>
        <button onClick={() => setIsCategoryDropdownVisible(!isCategoryDropdownVisible)}>Filter by Category</button>

        {isPriceDropdownVisible && (
          <div className="dropdown-menu">
            <button onClick={() => setSortedProducts([...products].sort((a, b) => a.price - b.price))}>
              Low to High
            </button>
            <button onClick={() => setSortedProducts([...products].sort((a, b) => b.price - a.price))}>
              High to Low
            </button>
          </div>
        )}

        {isCategoryDropdownVisible && (
          <div className="dropdown-menu">
            <button onClick={() => setFilteredCategory('All')}>All</button>
            <button onClick={() => setFilteredCategory('Books')}>Books</button>
            <button onClick={() => setFilteredCategory('Kitchenware')}>Kitchenware</button>
            <button onClick={() => setFilteredCategory('Electronics')}>Electronics</button>
            <button onClick={() => setFilteredCategory('Furniture')}>Furniture</button>
            <button onClick={() => setFilteredCategory('Other')}>Other</button>
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
              <button className="add-to-cart" onClick={() => handleInterestedClick(product)}>
                I am interested
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Popup for comment and sending request */}
      {selectedProduct && (
        <div className="popup">
          <div className="popup-content">
            <h3>{selectedProduct.name}</h3>
            <div className="image-slider">
              <img
                src={selectedProduct.images[currentImageIndex]}
                alt={`Product ${currentImageIndex + 1}`}
                className='product-image'
              />
            </div>
            <textarea
              placeholder="Add a comment for the seller..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="comment-input"
            ></textarea>
            <button className="confirm-button" onClick={handleSendRequest}>
              Send Request
            </button>
            <button className="close-button" onClick={() => setSelectedProduct(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
