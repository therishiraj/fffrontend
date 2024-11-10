import React, { useState } from 'react';
import './ContactUs.css'; // We will style this component separately

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ name, email, phone, message });
    // You can handle the form submission logic here (e.g., sending the data to a backend)
  };

  return (
    <div className="contact-us-container">
      <section className="contact-us-header">
        <h1>Contact Us</h1>
        <p>For all enquiries, please email us using the given form.</p>
        <p>Based in National Institue of Technology,Calicut (Available for campus students and employees.)</p>
      </section>

      <section className="contact-us-form">
        <form onSubmit={handleSubmit} className="form">
          {/* Name Field */}
          <div className="form-group">
            <label>Your Name</label>
            <input 
              type="text" 
              placeholder="Your Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label>Your Email</label>
            <input 
              type="email" 
              placeholder="Your Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <label>Your Phone</label>
            <input 
              type="text" 
              placeholder="Your Phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
          </div>

          {/* Message Field */}
          <div className="form-group">
            <label>Your Message</label>
            <textarea 
              placeholder="Your Message" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;
