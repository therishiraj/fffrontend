
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import heroImage from '../assets/nitc_main.jpg'; // Ensure this path is correct
// import FeaturedListings from '../components/FeaturedListings'; // Import FeaturedListings

const Home = () => {
  const [products, setProducts] = useState([]);

  // Fetch products and randomly select 5
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/open/get-products');

        if (response.data && response.data.success && Array.isArray(response.data.items)) {
          const formattedProducts = response.data.items
            .filter((item) => item.isListed)
            .map((item) => ({
              id: item._id,
              name: item.item_name,
              image: item.image_urls[0], // Use the first image
              price: item.price,
              category: item.category,
            }));

          const randomProducts = formattedProducts
            .sort(() => 0.5 - Math.random())
            .slice(0, 5); // Select 5 random products

          setProducts(randomProducts);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);


  return (
    <div className="home">
      <section className="hero-banner">
        <img src={heroImage} alt="Hero Banner" className="hero-image" />
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Welcome to Fresh-Finds</h1>
          <p>Your one-stop shop for amazing products</p>
          <Link to="/shop" className="shop-now-btn">Shop Now</Link>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"I found the perfect study table for my dorm at half the price of a new one. The quality was great, and the process was so smooth!"</p>
            <p>- m240434cs</p>
          </div>
          <div className="testimonial-card">
            <p>"Fresh-Finds saved me a lot of money on textbooks. Buying second-hand is not only economical but also eco-friendly!"</p>
            <p>- b234523ee</p>
          </div>
          <div className="testimonial-card">
            <p>"I sold my old headphones here in just a day! The platform is easy to use and connects you with genuine buyers."</p>
            <p>- b234523ee</p>
          </div>
          <div className="testimonial-card">
            <p>"This platform is a blessing for students. I got a pre-loved blender at an unbeatable price. Highly recommend!"</p>
            <p>- b234523ee</p>
          </div>
        </div>
      </section>

      {/* <FeaturedListings /> */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-cards">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
              <p className="category">{product.category}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
