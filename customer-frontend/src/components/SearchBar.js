import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, placeholder = "Search customers by name or email..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce search to avoid excessive filtering
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="search-container">
      <div className="input-group">
        <span className="input-group-text bg-light">
          <i className="fas fa-search text-muted"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button 
            className="btn btn-outline-secondary" 
            type="button"
            onClick={handleClear}
            title="Clear search"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;