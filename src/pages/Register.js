import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    // Check if the email ends with @nitc.ac.in
    if (!email.endsWith('@nitc.ac.in')) {
      setError('Only @nitc.ac.in email addresses are allowed for registration.');
      return;
    }

    // Clear error and proceed with registration logic
    setError('');
    console.log('Registering:', { email, password });
    // Here you can add the API call to register the user
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Your Account</h2>
        <form onSubmit={handleRegister} className="register-form">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <p className="email-note">* Only @nitc.ac.in email addresses are allowed for registration.</p>
          
          {error && <p className="error-message">{error}</p>}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="register-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
