import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import SavedRecipes from './pages/SavedRecipes';
import './App.css';

const App = () => {
    //State för sökning och funktion som uppdaterar sökningen
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <Router>
            <Header onSearch={handleSearch} />
            {/* Routes för att definiera vägarna för olika sidor */}
            <Routes>
                <Route path="/" element={<Home  searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
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