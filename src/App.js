import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import Home from './pages/Home';
import SavedRecipes from './pages/SavedRecipes';
import './App.css';

const App = () => {

    const[searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };
    
    return (
        <Router>
            <Header onSearch={handleSearch} />
            <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />

            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/saved" element={<SavedRecipes />} />

            </Routes>
        </Router>

        /*
            {/* Error route *}
            <Route path="*" element={<NotFound />} />
        */

    );
};

export default App;