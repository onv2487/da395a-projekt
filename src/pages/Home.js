import React, {useEffect, useState} from "react";
import axios from 'axios';
import SearchBar from "../components/SearchBar/SearchBar";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import "./Home.css";

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState('');

    useEffect (() => {
        const fetchRecipes = async () => {

            try {
                const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
                    params: {
                        query: query,
                        apiKey: '4f5c4482685449dbb9a7d54b3c97b2e5',
                        addRecipeInformation: true 
                    }
                });

                const searchResults = response.data.results || [];
                const formattedRecips = searchResults.map(recipe => ({
                    title: recipe.title,
                    image: recipe.image,
                    description: recipe.summary,
                    prepTime: recipe.readyInMinutes,
                    cookTime: recipe.cookingMinutes || recipe.readyInMinutes,
                    ingredients: recipe.extendedIngredients ? recipe.extendedIngredients.map(ingredient => ingredient.name) : []
                    
                }));
                setRecipes(formattedRecips);
            } catch (error) {
                console.error('error fetching recipe', error);
            }

        };

        if(query.length >= 3) {
            fetchRecipes();
        } else {
            //Rensa recipes om inputen innehåller mindre än 3 bokstäver
            setRecipes([]);
        }

    }, [query]);

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
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
                {query.length < 3 ? (
                    <p className="no-results">Skriv minst tre bokstäver för att söka efter recept.</p>
                ) : (
                    recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} onSave={handleSave} />
                        ))
                    ) : (
                        <p className="no-results">Inga recept hittades. Försök igen!</p>
                    )
                )}
            </div>
        </div>
    );
};

export default Home;
