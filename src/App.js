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
import Messages from './pages/Requests';
import Transactions from './pages/Transactions';
import MyOrders from './pages/MyOrders'; // Updated to MyOrders
import Profile from './pages/Profile';
import PostItem from './pages/PostItem';
import ContactUs from './pages/ContactUs';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import ReviewUsers from './pages/ReviewUsers';
import ReviewItems from './pages/ReviewItems';
import Notifications from './pages/Notifications';
import Requests from './pages/Requests';
import './App.css';
import axios from 'axios';
import { useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

// axios.defaults.baseURL = "http://13.54.149.207:3001/api/v0";
axios.defaults.baseURL = "http://192.168.204.246:3001/api/v0";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

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
          <Route path="/messages" element={<ProtectedRoute>
              <Messages />
            </ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute>
              <Transactions />
            </ProtectedRoute>} />
          <Route path="/my-orders" element={<ProtectedRoute>
              <MyOrders /> {/* Updated here */}
            </ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute>
              <Profile />
            </ProtectedRoute>} />
          <Route path="/post-item" element={<PostItem />} />
          <Route path="/requests" element={<Requests />} /> {/* Route for Requests */}

          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/notifications" element={<Notifications />} />
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

