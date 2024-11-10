import React from 'react';
import './FeaturedListings.css';

function FeaturedListings() {
  return (
    <section className="featured-listings">
      <h2>Featured Listings</h2>
      <div className="listing-items">
        <div className="listing-item">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI_M_oeDfbYVXGmuz_gyqoRBw9eOwK7X-GmQ&s" alt="Listing 1" />
          <h3>Used Backpack</h3>
          <p>High-quality, lightly used backpack for college students.</p>
          <span className="price">$15</span>
        </div>
        <div className="listing-item">
          <img src="data:image/jpeg;base64,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" alt="Listing 2" />
          <h3>Pre-owned Laptop</h3>
          <p>Reliable laptop, perfect for study and browsing.</p>
          <span className="price">$200</span>
        </div>
        <div className="listing-item">
          <img src="https://images.pexels.com/photos/7034502/pexels-photo-7034502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Listing 3" />
          <h3>Textbook Bundle</h3>
          <p>Essential textbooks for first-year students.</p>
          <span className="price">$50</span>
        </div>
        <div className="listing-item">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyQcMtFN9d-bg8VRiZ5pUwCYZbFaIEYPRdMg&s" alt="Listing 3" />
          <h3>Mattress</h3>
          <p>Mattress for newly joined hostellers</p>
          <span className="price">$51</span>
        </div>
        <div className="listing-item">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQpPyGlxEDsJlW-PdZZjU5XgTEpWFW0UUCOA&s" alt="Listing 3" />
          <h3>Bucket</h3>
          <p>Bucket for washroom uses</p>
          <span className="price">$5</span>
        </div>
      </div>
    </section>
  );
}

export default FeaturedListings;
