import React, { useEffect, useState } from "react";
import axios from 'axios';
import SearchBar from "../components/SearchBar/SearchBar";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import AddRecipeForm from '../components/AddRecipeForm/AddRecipeForm';
import "./Home.css";

const Home = ({ searchQuery, setSearchQuery, addRecipe }) => {
    //State för att lagra recept
    const [recipes, setRecipes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    // hanterar klick på knappen f.a. lägga ett recept
    const handleAddRecipeClick = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    //>Funktion för att hämta recept 
    useEffect(() => {
        const fetchRecipes = async () => {
            // Kontrollera om sökfrågan är längre än 3 bokstäver 
            if (searchQuery.length >= 3) {
                try {
                    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
                        params: {
                            query: searchQuery,
                            apiKey: '4f5c4482685449dbb9a7d54b3c97b2e5',
                            addRecipeInformation: true
                        }
                    });

                    const searchResults = response.data.results || [];

                    const formattedRecips = searchResults.map(async recipe => {
                        //Hämta detaljerad information om recept för att kunna extrahera källans URL
                        const recipeInfoResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information`, {
                            params: {
                                apiKey: 'c6705cf968914fa1b0973dc2bb0b79eb',
                            }
                        });

                        const recipeInfo = recipeInfoResponse.data;

                        // Hämta ingredienserna för varje recept
                        const ingredientResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/ingredientWidget.json`, {
                            params: {
                                apiKey: '4f5c4482685449dbb9a7d54b3c97b2e5',
                            }
                        });

                        const ingredients = ingredientResponse.data.ingredients.map(ingredient => ingredient.name);
                        return {
                            id: recipe.id,
                            title: recipe.title,
                            image: recipe.image,
                            description: recipe.summary,
                            prepTime: recipe.readyInMinutes,
                            link: recipe.sourceUrl,
                            cookTime: recipe.cookingMinutes || recipe.readyInMinutes,
                            ingredients: ingredients,
                            link: recipeInfo.sourceUrl

                        }

                    });

                    Promise.all(formattedRecips).then(recipes => {
                        setRecipes(recipes);
                    });
                } catch (error) {
                    console.error('error fetching recipe', error);
                }
            } else {
                // Rensa recepten om frågan är mindre än 3 tecken
                setRecipes([]);
            }

        };
        fetchRecipes();

    }, [searchQuery]);
    //återställ sökresultaten
    useEffect(() => {
        return () => {
            setSearchQuery('');
        };
    }, [setSearchQuery]);

    //Funktion för att spara recept 
    const handleSave = (recipe) => {
        const category = prompt("Välj en kategori för denna recept:");
        if (!category) return;

        let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || {};
        if (!savedRecipes[category]) {
            savedRecipes[category] = [];
        }

        savedRecipes[category].push(recipe);
        localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    };

    return (
        <div className="home">
            {/* Sökfält för att söka efter recept */}
            <SearchBar onSearch={setSearchQuery} />
            <button onClick={handleAddRecipeClick} className="rounded-button">
                Lägg till nytt recept
            </button>
            {showForm && <AddRecipeForm addRecipe={addRecipe} onClose={handleCloseForm} />}
            <div className="recipes-container">
                {/* Visa meddelande om sökfrågan är för kort */}
                {searchQuery.length < 3 ? (
                    <p className="no-results">Skriv minst tre bokstäver för att söka efter recept.</p>
                ) : (
                    //visa resultat om recept hittas
                    recipes.length > 0 ? (
                        recipes.map((recipe, index) => (
                            <RecipeCard key={`${recipe.id}-${index}`} recipe={recipe} onSave={handleSave} />
                        ))
                    ) : (
                        //Meddelande om inga recept hittas 
                        <p className="no-results">Inga recept hittades. Försök igen!</p>
                    )
                )}
            </div>
        </div>
    );
};

export default Home;
