import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SavedRecipes from './pages/SavedRecipes';
import './App.css';


function App() {
  return (

    <Router>

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<SavedRecipes />} />
      </Routes>
      
    </Router>
  );
}

export default App;
