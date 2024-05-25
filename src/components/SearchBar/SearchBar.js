import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({onSearch, isHeader}) => {
    const [query, setQuery] = useState('');

    //för att undvika för många API kall
    useEffect(() => {
        if (query.length >= 3) {
            const delayDebounceFn = setTimeout(() => {
                onSearch(query);
            }, 300); // Adjust the debounce delay as needed

            return () => clearTimeout(delayDebounceFn);
        }
    }, [query, onSearch]);

    return (
        <div className ={`search-bar ${isHeader ? 'header-search-bar' : ''}`}>

            <input 
            type="text" 
            value={query}  
            placeholder="Sök efter recept..." 
            onChange={(e) => setQuery(e.target.value)} 
            className="search-input"
            
            />

        </div>

    ); 
};

export default SearchBar;