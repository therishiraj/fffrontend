import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [role, setRole] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    // Check if the email ends with @nitc.ac.in
    if (!email.endsWith('@nitc.ac.in')) {
      setError('Only @nitc.ac.in email addresses are allowed for registration.');
      return;
    }

    // Clear error and proceed with registration logic
    setError('');
    console.log('Registering:', { email, password, name, phone, yearOfStudy, role, address });
    // Here you can add the API call to register the user
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Your Account</h2>
        <form onSubmit={handleRegister} className="register-form">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
          <label htmlFor="confirmPassword">Confirm Password</label>
<input
  id="confirmPassword"
  type="password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  required
/>

          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label htmlFor="year_of_study">Year of Study</label>
          <select
            id="year_of_study"
            value={yearOfStudy}
            onChange={(e) => setYearOfStudy(e.target.value)}
            required
          >
            <option value="">Select Year of Study</option>
            <option value="1st_btech">1st Year B.Tech</option>
<option value="2nd_btech">2nd Year B.Tech</option>
<option value="3rd_btech">3rd Year B.Tech</option>
<option value="4th_btech">4th Year B.Tech</option>
<option value="5th_barch">5th Year B.Arch</option>
<option value="1st_mtech">1st Year M.Tech</option>
<option value="2nd_mtech">2nd Year M.Tech</option>
<option value="1st_msc">1st Year M.Sc</option>
<option value="2nd_msc">2nd Year M.Sc</option>
<option value="1st_mca">1st Year MCA</option>
<option value="2nd_mca">2nd Year MCA</option>
<option value="3rd_mca">3rd Year MCA</option>
<option value="1st_mba">1st Year MBA</option>
<option value="2nd_mba">2nd Year MBA</option>
<option value="1st_phd">1st Year Ph.D.</option>
<option value="2nd_phd">2nd Year Ph.D.</option>
<option value="3rd_phd">3rd Year Ph.D.</option>
<option value="4th_phd">4th Year Ph.D.</option>
<option value="5th_phd">5th Year Ph.D.</option>

          </select>

          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>

          <label htmlFor="address">Address/Hostel name and room number</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <button type="submit" className="register-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
