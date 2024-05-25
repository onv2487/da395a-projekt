import React, {useEffect, useState} from "react";
import axios from 'axios';
import SearchBar from "../components/SearchBar/SearchBar";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import "./Home.css";

const Home = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect (() => {
        fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=4f5c4482685449dbb9a7d54b3c97b2e5`)
        .then(respone => respone.json())
        .then(data => {
            //hämta all nödvändig data
            const formattedRecips = data.map(recipe => ({
                title: recipe.title,
                image: recipe.image,
                description: recipe.description,
                prepTime: recipe.prepTime,
                cookTime: recipe.cookTime,
                ingredients: recipe.ingredients,
            }));
            setRecipes(formattedRecips);
        })
        .catch(error =>
            console.error('Error fetching recipes:', error));
        
    }, []);
    /*
    const handleSearch = (query) => {
        axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=4f5c4482685449dbb9a7d54b3c97b2e5`)
        .then(response => {
            const searchResults = response.data.results || [];
            const recipesData = searchResults.map(result => ({
                id: result.id,
                title: result.title,
                image: result.image,
            }));
            setRecipes(recipesData);
        })

        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };
    */
    
    const handleSave = (recipe) => {
        let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || {};
        if (!savedRecipes["Allmän"]) {
            savedRecipes["Allmän"] = [];
        }
    
        savedRecipes["Allmän"].push(recipe);
        localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    };
    
    return (

        <div>
            {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} onSave={(savedRecipe) => console.log('Saved recipe:', savedRecipe)} />
            ))}
        </div>
        /*
            <div className="home">
                <SearchBar onSearch={handleSearch} />
                <div className="recipes-container">
                    {recipes.map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} onSave={handleSave} />
                    ))}
                    {recipes.length === 0 && <p className="no-results">Inga recept hittades. Försök igen med ett annat sökord.</p>}
                </div>
            </div>
        */
    );
};

export default Home;
