import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Check if email ends with @nitc.ac.in
    if (!email.endsWith('@nitc.ac.in')) {
      alert('Please use a valid @nitc.ac.in email address.');
      return;
    }

    // Handle login logic here (e.g., API call to authenticate user)
    console.log('Logging in:', { email, password });
  };

  return (
    <div className="auth-container">
      <div className="sign-in">
        <h2>Sign in</h2>
        <p>Use your @nitc.ac.in account</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="auth-links">
            <Link to="/forgot-password">Forgot your password?</Link>
            <Link to="/admin-login" className="admin-login">Admin login</Link>
          </div>
          <button type="submit" className="sign-in-button">SIGN IN</button>
        </form>
      </div>
      <div className="sign-up">
        <h2>Hello, Friend!</h2>
        <p>Enter your personal details and start your journey with us</p>
        <Link to="/sign-up" className="sign-up-button">SIGN UP</Link>
      </div>
    </div>
  );
};

export default Login;
