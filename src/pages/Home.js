import React, {useState} from "react";
import axios from 'axios';
import SearchBar from "../components/SearchBar/SearchBar";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import "./Home.css";

const Home = () => {
    const [recipes, setRecipes] = useState([]);

    const handleSearch = (query) => {
        axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=YOUR_API_KEY`)
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
            </div>
        </div>
    );
};

export default Home;
