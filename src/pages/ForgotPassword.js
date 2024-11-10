import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = (e) => {
    e.preventDefault();
    // Handle forgot password logic here (e.g., API call to send reset link)
    console.log('Password reset requested for:', email);
  };

  return (
    <div className="forgot-password-page">
      <h2>Forgot Password</h2>
      <p>Enter your email address, and we’ll send you a link to reset your password.</p>
      <form onSubmit={handlePasswordReset}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="reset-btn">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;