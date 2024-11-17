import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo2.png';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBell } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { isLoggedIn, role, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handlePostItemClick = (event) => {
    if (role !== "seller" && role !== "buyer+seller") {
      event.preventDefault();
      setShowPopup(true);
    }
  };

  useEffect(() => {
    const fetchNotifications = () => {
      fetch('/api/notifications')
        .then((res) => res.json())
        .then((data) => setNotifications(data))
        .catch((err) => console.error(err));
    };

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 10000);

    return () => clearInterval(interval);
  }, []);

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
              <Link to="/post-item">Post an Item</Link> 
            ) : (
              <Link to="#" onClick={handlePostItemClick} className="disabled-link">Post an Item</Link> 
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
            <div className="nav-icons">
              {/* Notification Icon */}
              <div
                className="nav-notification"
                onClick={() => navigate('/notifications')}
                title="Notifications"
              >
                <FontAwesomeIcon icon={faBell} size="lg" />
                {notifications.length > 0 && (
                  <span className="notification-badge">{notifications.length}</span>
                )}
              </div>

              {/* Profile Icon */}
              <div className="user-profile" ref={menuRef}>
                <FontAwesomeIcon
                  icon={faUserCircle}
                  size="2x"
                  onClick={toggleMenu}
                  className="profile-icon"
                />
                {isMenuOpen && (
                  <div className="dropdown-menu">
                  <Link to="/requests" className="dropdown-item">Requests</Link>
                  <Link to="/transactions" className="dropdown-item">Transactions</Link>
                  <Link to="/my-orders" className="dropdown-item">My Orders</Link>
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  <button onClick={logout} className="dropdown-item logout-btn">Logout</button>
                </div>
                )}
              </div>
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
