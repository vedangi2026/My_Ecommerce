import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './CartContext';
import Navbar from './components/Navbar';
import './App.css';
import React, { useState, useEffect } from 'react';
function App() {
  const [username, setUsername] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleFilter = (category, query) => {
    const filtered = products.filter((product) => {
      const categoryMatch = category === 'all' || product.category === category;
      const searchMatch = product.title.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && searchMatch;
    });
    setFilteredProducts(filtered);
  };

  const updateUsername = (newUsername) => {
    setUsername(newUsername);
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar username={username} onFilter={handleFilter} />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage updateUsername={updateUsername} />} />
          <Route path="/signup" element={<SignupPage updateUsername={updateUsername} />} />
          <Route
            path="/products"
            element={<ProductPage products={filteredProducts} setProducts={setFilteredProducts}/>}
          />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;