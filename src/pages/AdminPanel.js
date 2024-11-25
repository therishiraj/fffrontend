import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const [selectedOption, setSelectedOption] = useState('users'); // Default view is 'users'
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/protected/getallusers', { _id:localStorage.getItem("admin_id") },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('accessToken'),
          },
        }
      );

      if (response.data && response.data.success) {
        console.log("this is admin:",response)
        setUsers(response.data.user || []);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a user
  const deleteUser = async (id, role) => {
    try {
      await axios.delete('/protected/remove-user', {
        params: { id, role },
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      });
      setUsers(users.filter((user) => user._id !== id));
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/open/get-products');
      if (response.data && response.data.success) {
        setProducts(response.data.items || []);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      await axios.delete('/protected/remove-product', {
        params: { id },
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      });
      setProducts(products.filter((product) => product._id !== id));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

   // Handle Admin Logout
   const handleLogout = () => {
    localStorage.clear(); // Clear all local storage
    navigate('/home'); // Redirect to home page
  };


  // Fetch data based on selected option
  useEffect(() => {
    if (selectedOption === 'users') {
      fetchUsers();
    } else if (selectedOption === 'products') {
      fetchProducts();
    }
  }, [selectedOption]);

  return (
    <div className="admin-panel">
      <div className="sidebar">
        <button
          className={`sidebar-btn ${selectedOption === 'users' ? 'active' : ''}`}
          onClick={() => setSelectedOption('users')}
        >
          Review Users
        </button>
        <button
          className={`sidebar-btn ${selectedOption === 'products' ? 'active' : ''}`}
          onClick={() => setSelectedOption('products')}
        >
          Review Products
        </button>
        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="main-content">
        <h2>Admin Panel - {selectedOption === 'users' ? 'Users' : 'Products'}</h2>
        {loading && <p>Loading...</p>}

        {selectedOption === 'users' && (
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Year of Study</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>{user.year_of_study}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(user._id, user.role)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedOption === 'products' && (
          <table className="product-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Description</th>
                <th>Condition</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.image_urls[0]}
                      alt={product.item_name}
                      className="product-table-image"
                    />
                  </td>
                  <td>{product.item_name}</td>
                  <td>₹{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>{product.condition}/5</td>
                  <td>{product.item_age} months</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && selectedOption === 'users' && users.length === 0 && (
          <p>No users available to review.</p>
        )}
        {!loading && selectedOption === 'products' && products.length === 0 && (
          <p>No products available to review.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
