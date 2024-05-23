import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SavedRecipes from './pages/SavedRecipes';
import './App.css';

const App = () => {

    return (


        <Router>
            <Header />
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/saved" element={<SavedRecipes />} />
                {/* Error route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;