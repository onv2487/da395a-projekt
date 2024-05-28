import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({onSearch, isHeader}) => {
    const [searchQuery, setSearchQuery] = useState('');

    //för att undvika för många API kall
    useEffect(() => {
        if (searchQuery.length >= 3) {
            const delayDebounceFn = setTimeout(() => {
                onSearch(searchQuery);
            }, 300);

            return () => clearTimeout(delayDebounceFn);
        }
    }, [searchQuery, onSearch]);

    return (
        <div className ={`search-bar ${isHeader ? 'header-search-bar' : ''}`}>

            <input 
            type="text" 
            value={searchQuery}  
            placeholder="Sök efter recept..." 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="search-input"
            
            />

        </div>

    ); 
};

export default SearchBar;