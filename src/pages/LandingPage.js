import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './LandingPage.css';
import campusImage from '../assets/campus.png';  // Import the campus image


const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">

        <h1>Welcome to Fresh Finds</h1>
        <p>Connecting university students to buy and sell used items easily.</p>
        <p>Sellers list items conveniently, while Buyers get access to affordable books and supplies.</p>

        {/* Add the campus background image */}
        <img src={campusImage} alt="Campus" className="hero-image" />  {/* Add the image with a class for styling */}

        {/* Link wrapping the Get Started button to navigate to Home */}
        <Link to="/home">
          <button className="cta-button">Get Started</button>
        </Link>
      </section>

      {/* Roadmap Section */}
      <section className="roadmap">
        <h2>ROADMAP</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-icon step1-icon"></div>
            <h3>STEP 01 </h3>
            <h4>Find Your Spare Items</h4>
            <p>Identify items you no longer need, like books, bikes, or supplies.</p>
          </div>
          <div className="step">
            <div className="step-icon step2-icon"></div>
            <h3>STEP 02</h3>
            <h4>Post On The Site Hassle Free</h4>
            <p>List your items on the platform with an easy, step-by-step form.</p>
          </div>
          <div className="step">
            <div className="step-icon step3-icon"></div>
            <h3>STEP 03</h3>
            <h4>Chat With Buyer with Privacy</h4>
            <p>Use our built-in chat feature to answer questions without sharing personal details.</p>
          </div>
          <div className="step">
            <div className="step-icon step4-icon"></div>
            <h3>STEP 04</h3>
            <h4>Get the Best Price for Your Item</h4>
            <p>Negotiate and finalize the best deal with other students.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Fresh Finds. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
