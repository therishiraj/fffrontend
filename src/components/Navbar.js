import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo2.png';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { isLoggedIn, role, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for the popup
  const menuRef = useRef(null); // Reference for the dropdown menu

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handlePostItemClick = (event) => {
    if (role !== "seller" && role !== "buyer+seller") {
      event.preventDefault(); // Prevent navigation
      setShowPopup(true); // Show popup if role is not seller or buyer+seller
    }
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-image" />
          </Link>
        </div>

        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li>
            {role === "seller" || role === "buyer+seller" ? (
              <Link to="/post-item">Post an Item</Link> // Allow navigation for seller or buyer+seller
            ) : (
              <Link to="#" onClick={handlePostItemClick} className="disabled-link">Post an Item</Link> // Trigger popup for others
            )}
          </li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
        </ul>

        <div className="nav-auth">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Register</Link>
            </>
          ) : (
            <div className="user-profile" ref={menuRef}>
              <FontAwesomeIcon
                icon={faUserCircle}
                size="2x"
                onClick={toggleMenu}
                className="profile-icon"
              />
              {isMenuOpen && (
                <div className="dropdown-menu">
                  <Link to="/messages" className="dropdown-item">Messages</Link>
                  <Link to="/transactions" className="dropdown-item">Transactions</Link>
                  <Link to="/saved" className="dropdown-item">Saved</Link>
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  <button onClick={logout} className="dropdown-item logout-btn">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Popup for non-seller users */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Please sign up as a seller to post a product.</p>
            <button onClick={() => setShowPopup(false)} className="close-popup-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
