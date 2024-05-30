import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, isHeader, id }) => {
    //State för sökfrågan
    const [searchQuery, setSearchQuery] = useState('');

    //Effekt somhanderar sökning och debounce för att undvika för många API-anrop
    useEffect(() => {
        if (searchQuery.length >= 3) {
            const delayDebounceFn = setTimeout(() => {
                // Anropa den funktion som skickats från förälderkomponenten för att utföra sökning
                onSearch(searchQuery);
            }, 300);

            // Rensa timeout-funktionen för att undvika flera anrop
            return () => clearTimeout(delayDebounceFn);
        }
    }, [searchQuery, onSearch]);

    return (
        <div className ={`search-bar ${isHeader ? 'header-search-bar' : ''}`}>
            {/* Input-fält för att skriva in sökfrågan */}
            <input 
                type="text" 
                id={id}
                name="search"
                value={searchQuery}  
                placeholder="Sök efter recept..." 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="search-input"
            
            />

        </div>

    ); 
};

export default SearchBar;