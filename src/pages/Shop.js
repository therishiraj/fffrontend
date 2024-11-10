import React from 'react';
import Categories from '../components/Categories'; // Import Categories component
import './Shop.css';

const Shop = () => {
  return (
    <div className="shop">
      {/* Shop Header */}
      <header className="shop-header">
        <h1>Shop Our Collection</h1>
        <p>Browse through our wide range of affordable used items that are perfect for students!</p>
      </header>

      {/* Categories Section */}
      <Categories />

      {/* Filter & Sort Section */}
      <div className="filter-sort">
        <button>Sort by Price</button>
        <button>Filter by Category</button>
      </div>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {/* Example Product Card */}
          <div className="product-card">
            <img src="https://m.media-amazon.com/images/I/71rzb-oaO6L.jpg" alt="Product" />
            <h3>Parker Ball Pen</h3>
            <p className="price">$5</p>
            <p className="description">A good old costly pen</p>
            <button className="add-to-cart">Buy now</button>
          </div>
          <div className="product-card">
            <img src="https://m.media-amazon.com/images/I/71sX+zyCwzL.jpg" alt="Product" />
            <h3>Thermos Bottle</h3>
            <p className="price">$10</p>
            <p className="description">A perfect container to keep your warm water hot for a long time</p>
            <button className="add-to-cart">Buy now</button>
          </div>
          {/* More product cards can go here */}
          <div className="product-card">
            <img src="https://m.media-amazon.com/images/I/51mFSgo26PL._AC_.jpg" alt="Product" />
            <h3>Apple charger</h3>
            <p className="price">$100</p>
            <p className="description">iPhone charger hai sir ji</p>
            <button className="add-to-cart">Buy now</button>
          </div>
          <div className="product-card">
            <img src="https://m.media-amazon.com/images/I/717V4glGOsL._AC_UF894,1000_QL80_.jpg" alt="Product" />
            <h3>Kettle Electric</h3>
            <p className="price">$104</p>
            <p className="description">Best for making hot water and tea/coffee</p>
            <button className="add-to-cart">Buy now</button>
          </div>
          <div className="product-card">
            <img src="https://m.media-amazon.com/images/I/61r9G8yzTCL.jpg" alt="Product" />
            <h3>Table lamp</h3>
            <p className="price">$40</p>
            <p className="description">Study at night without disturbing your roommate now</p>
            <button className="add-to-cart">Buy now</button>
          </div>
          <div className="product-card">
            <img src="https://m.media-amazon.com/images/I/71AwbwrbYCL._AC_UF350,350_QL80_.jpg" alt="Product" />
            <h3>Pillow</h3>
            <p className="price">$10</p>
            <p className="description">Takia hai bhay</p>
            <button className="add-to-cart">Buy now</button>
          </div>
        </div>
      </section>

      {/* Additional Products Section */}
      <section className="additional-products">
        <h2>Shop More Products</h2>
        <div className="product-grid">
          {/* Render more product cards dynamically */}
          <div className="additional-products">
            <img src="https://m.media-amazon.com/images/I/71AwbwrbYCL._AC_UF350,350_QL80_.jpg" alt="Product" />
            <h3>Pillow</h3>
            <p className="price">$10</p>
            <p className="description">Takia hai bhay</p>
            <button className="add-to-cart">Buy now</button>
          </div>

          <div className="additional-products">
            <img src="https://m.media-amazon.com/images/I/71AwbwrbYCL._AC_UF350,350_QL80_.jpg" alt="Product" />
            <h3>Pillow</h3>
            <p className="price">$10</p>
            <p className="description">Takia hai bhay</p>
            <button className="add-to-cart">Buy now</button>
          </div>

          <div className="additional-products">
            <img src="https://m.media-amazon.com/images/I/71AwbwrbYCL._AC_UF350,350_QL80_.jpg" alt="Product" />
            <h3>Pillow</h3>
            <p className="price">$10</p>
            <p className="description">Takia hai bhay</p>
            <button className="add-to-cart">Buy now</button>
          </div>

          <div className="additional-products">
            <img src="https://m.media-amazon.com/images/I/71AwbwrbYCL._AC_UF350,350_QL80_.jpg" alt="Product" />
            <h3>Pillow</h3>
            <p className="price">$10</p>
            <p className="description">Takia hai bhay</p>
            <button className="add-to-cart">Buy now</button>
          </div>

          <div className="additional-products">
            <img src="https://m.media-amazon.com/images/I/71AwbwrbYCL._AC_UF350,350_QL80_.jpg" alt="Product" />
            <h3>Pillow</h3>
            <p className="price">$10</p>
            <p className="description">Takia hai bhay</p>
            <button className="add-to-cart">Buy now</button>
          </div>

          <div className="additional-products">
            <img src="https://m.media-amazon.com/images/I/71AwbwrbYCL._AC_UF350,350_QL80_.jpg" alt="Product" />
            <h3>Pillow</h3>
            <p className="price">$10</p>
            <p className="description">Takia hai bhay</p>
            <button className="add-to-cart">Buy now</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
