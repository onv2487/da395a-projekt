import React, {useState} from "react";
import axios from 'axios';
import SearchBar from "../components/SearchBar/SearchBar";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import "./Home.css";

const Home = () => {
    const [recipes, setRecipes] = useState([]);

    const handleSearch = (query) => {
        axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=4f5c4482685449dbb9a7d54b3c97b2e5`)
        .then(response => {
            setRecipes(response.data.Search || []);
        })

        .catch(error => {
            console.error('Error fetching data:', error);
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
                {recipes && recipes.map(recipe => (
                    <RecipeCard key={recipe.imdbID} recipe={recipe} onSave={handleSave} />
                ))}
                {recipes.length === 0 && <p className="no-results">Inga recept hittades. Försök igen med ett annat sökord.</p>}
            </div>
        </div>
    );
};

export default Home;
