import React from 'react';
import { BrowserRouter as Route, Routes, Link} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SavedRecipes from './pages/SavedRecipes';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>

    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/saved" element={<SavedRecipes />} />
    </Routes>
    </BrowserRouter>


  );

};

export default App;
