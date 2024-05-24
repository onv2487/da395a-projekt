import React, {useState} from "react";
import axios from 'axios';
import SearchBar from "../components/SearchBar/SearchBar";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import "./Home.css";

const Home = () => {
    const [recipes, setRecipes] = useState([]);

    const handleSearch = (query) => {
        axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`)
        .then(response => {
            setRecipes(response.data.results);
        });
    };
    
    const handleSave = (recipe) => {
        let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || {};
        if (!savedRecipes["Allmän"]) {
            savedRecipes["Allmän"] = [];
        }
    
        savedRecipes["Allmän"].push(recipe);
        localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    };
    
    return (
        <div className="home">
            <SearchBar onSearch={handleSearch} />
            <div className="recipes-container">
                {recipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} onSave={handleSave} />
                ))}
                {recipes.length === 0 && <p className="no-results">Inga recept hittades. Försök igen med ett annat sökord.</p>}
            </div>
        </div>
    );
};

export default Home;
