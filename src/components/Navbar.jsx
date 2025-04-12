import React, { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import Filter from './Filter';

const Navbar = ({ username, onFilter }) => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-title">CartZilla</Link>
      </div>
      <div className="navbar-links">
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart 🛒 ({cart.length})</Link>
        <button onClick={() => setShowFilter(!showFilter)}>
          Filter <span role="img" aria-label="filter">
          </span>
        </button>
        {showFilter && <Filter onFilter={onFilter} />}
      </div>
      <div className="navbar-right">
        <button onClick={toggleDropdown}>👤</button>
        {isDropdownOpen && (
          <div className="dropdown">
            {localStorage.getItem('token') ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
