import React from 'react';
import './AboutUs.css';
import { Link } from 'react-router-dom';

function AboutUs() {
  return (
    <div className="aboutus-container">
      <section className="aboutus-hero">
        <h1>About Fresh Finds</h1>
        <p>
          Welcome to Fresh Finds, your go-to platform for connecting with fellow NIT Calicut students to buy and sell used items. We are dedicated to creating a seamless and trustworthy marketplace where:
        </p>
      </section>

      <section className="aboutus-features">
        <h2>Our Key Features</h2>
        <ul>
          <li>
            <strong>Students sell:</strong> Easily list and sell your pre-loved books, gadgets, and other items.
          </li>
          <li>
            <strong>Students buy:</strong> Find great deals on used items, saving money and promoting sustainability.
          </li>
          <li>
            <strong>Chat feature:</strong> Directly connect with sellers to ask questions and negotiate deals.
          </li>
        </ul>
      </section>

      <section className="aboutus-mission">
        <p>
          Our mission is to foster a community of resourcefulness and sustainability within NIT Calicut. By providing this platform, we hope to make it easier for students to access affordable resources while promoting the reuse of items.
        </p>
        <p>Join us in making a positive impact on our campus community!</p>
        <Link to="/register">
          <button className="aboutus-cta-button">Join Us Now</button>
        </Link>
      </section>

      <section className="aboutus-team">
        <h2>Meet Our Team</h2>
        <ul className="aboutus-team-list">
          <li>
            <h3>Rishi</h3>
            <p><strong>Role:</strong> Full Stack Developer</p>
          </li>
          <li>
            <h3>Tilok</h3>
            <p><strong>Role:</strong> Backend Developer & Team Lead</p>
          </li>
          <li>
            <h3>Ajinkya</h3>
            <p><strong>Role:</strong> Designer & Backend Developer</p>
          </li>
          <li>
            <h3>Ankit</h3>
            <p><strong>Role:</strong> Full Stack Developer</p>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default AboutUs;