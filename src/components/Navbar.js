import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo2.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">  {/* Link to Landing Page */}
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>
      </div>
      
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li> {/* Link to Home page */}
        <li><Link to="/post-item">Post an Item</Link></li> {/* Post an Item button */}
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/contact-us">Contact Us</Link></li> {/* New Contact Us button */}
      </ul>
      
      <div className="nav-auth">
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/register" className="register-btn">Register</Link>
      </div>

      {/* User Menu */}
      <div className="user-menu">
        <button onClick={toggleMenu} className="menu-icon">
          ☰
        </button>
        {isMenuOpen && (
          <div className="dropdown-menu">
            <Link to="/messages" className="dropdown-item">Messages</Link>
            <Link to="/transactions" className="dropdown-item">Transactions</Link>
            <Link to="/saved" className="dropdown-item">Saved</Link>
            <Link to="/profile" className="dropdown-item">Profile</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
