import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import SavedRecipes from './pages/SavedRecipes';
import OwnRecipes from './pages/OwnRecipes';
import './App.css';

const App = () => {
    //State för sökning och funktion som uppdaterar sökningen
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    //State för att spara recept
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const savedRecipes = JSON.parse(localStorage.getItem('ownRecipes')) || [];
        setRecipes(Array.isArray(savedRecipes) ? savedRecipes : []);
    }, []);

    // lägga till ett nytt recept
    const addRecipe = (recipe) => {
        const updatedRecipes = [...recipes, recipe];
        setRecipes(updatedRecipes);
        localStorage.setItem('ownRecipes', JSON.stringify(updatedRecipes));
    };

    // radera ett recept
    const deleteRecipe = (recipeId) => {
        const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeId);
        setRecipes(updatedRecipes);
        localStorage.setItem('ownRecipes', JSON.stringify(updatedRecipes));
    };


    return (
        <Router>
            <Header onSearch={handleSearch} />
            {/* Routes för att definiera vägarna för olika sidor */}
            <Routes>
                <Route
                    path="/"
                    element={<Home
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        addRecipe={addRecipe}
                    />}
                />
                <Route path="/saved" element={<SavedRecipes />} />
                <Route
                    path="/own-recipes"
                    element={<OwnRecipes
                        recipes={recipes}
                        onDelete={deleteRecipe}
                    />}
                />
            </Routes>
        </Router>

        /*
            {/* Error route *}
            <Route path="*" element={<NotFound />} />
        */

    );
};

export default App;