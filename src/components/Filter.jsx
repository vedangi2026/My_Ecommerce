import React, { useState, useEffect } from 'react';

const Filter = ({ onFilter }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const data = await res.json();
        if (!data || data.length === 0) {
          throw new Error('Failed to load categories');
        }
        setCategories(['all', ...data]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilter(e.target.value, searchQuery);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onFilter(selectedCategory, e.target.value);
  };

  return (
    <div className="filters">
      <select value={selectedCategory} onChange={handleCategoryChange}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Filter;