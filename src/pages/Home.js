import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import FeaturedListings from '../components/FeaturedListings.js';

const Home = () => {
  return (
    <div className="home">
      <section className="hero-banner">
        <div className="overlay"></div> {/* Overlay to create the fade effect */}
        <h1>Welcome to Our Store</h1>
        <p>Your one-stop shop for amazing products</p>
        <Link to="/shop" className="shop-now-btn">Shop Now</Link>
      </section>

      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-cards">
          {/* Static testimonials */}
          <div className="testimonial-card">
            <p>"Great Service, maza aa gaya"</p>
            <p>- m240434cs</p>
          </div>
          <div className="testimonial-card">
            <p>"Quality at its best, love the collection!"</p>
            <p>- b234523ee</p>
          </div>
          <div className="testimonial-card">
            <p>"Very good site, easy to navigate"</p>
            <p>- b234523ee</p>
          </div>
          <div className="testimonial-card">
            <p>"Jabardast it is a great website"</p>
            <p>- b234523ee</p>
          </div>
        </div>
      </section>

      <FeaturedListings />
    </div>
  );
};

export default Home;
