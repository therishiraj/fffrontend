import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h3>Fresh-Finds</h3>
          <div className="footer-socials">
            <a href="#instagram" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#facebook" className="social-icon">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#twitter" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
        
        <div className="footer-links">
          <div className="links-group">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms & Conditions</a>
            <a href="#about">About</a>
          </div>
          <div className="links-group">
            <a href="#partner">Become Partner</a>
            <a href="#refund">Refund Policy</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="newsletter">
          <p>Weekly Newsletter</p>
          <div className="newsletter-subscribe">
            <input type="email" placeholder="Name@Email.com" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <p className="footer-bottom-text">
        &copy; {new Date().getFullYear()} Copyright | Designed by Rishi
      </p>
    </footer>
  );
}

export default Footer;
