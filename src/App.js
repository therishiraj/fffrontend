import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Shop from './pages/Shop';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Messages from './pages/Messages';
import Transactions from './pages/Transactions';
import Saved from './pages/Saved';
import Profile from './pages/Profile';
import PostItem from './pages/PostItem';
import ContactUs from './pages/ContactUs';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import ReviewUsers from './pages/ReviewUsers';
import ReviewItems from './pages/ReviewItems';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App" style={{ backgroundColor: 'var(--background-color)' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Default route to LandingPage */}
          <Route path="/home" element={<Home />} /> {/* Separate route for Home */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post-item" element={<PostItem />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/review-users" element={<ReviewUsers />} />
          <Route path="/review-items" element={<ReviewItems />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
