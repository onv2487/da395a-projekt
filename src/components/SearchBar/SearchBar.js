import React, {useState} from 'react';
import './SearchBar.css';

const SearchBar = ({onSearch}) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);

    };

    return (
        <div className = "search-bar">

            <input 
            type="text" 
            value={query}  
            placeholder="Sök efter recept..." 
            onChange={(e) => setQuery(e.target.value)} 
            
            />

            <button className="search-btn" onClick={handleSearch}>Sök</button>
        </div>

    ); 
};

export default SearchBar;