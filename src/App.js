import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Home from './pages/Home';
import SavedRecipes from './pages/SavedRecipes';
import './App.css';

const App = () => {

    return (
        <Router>
        <Header />
        <SearchBar />

        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/saved" element={<SavedRecipes />} />
        </Routes>
        </Router>

    /*
        <Router>
            <Header />
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/saved" element={<SavedRecipes />} />
                {/* Error route }
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    */
    );
};

export default App;