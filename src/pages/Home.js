import React, {useEffect, useState} from "react";
import axios from 'axios';
import SearchBar from "../components/SearchBar/SearchBar";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import "./Home.css";

const Home = ({ searchQuery, setSearchQuery }) => {
    const [recipes, setRecipes] = useState([]);
    
    //>Funktion för att hämta recept 
    useEffect (() => {
        const fetchRecipes = async () => {
            // Kontrollera om sökfrågan är längre än 3 bokstäver 
            if(searchQuery.length >= 3) {
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

                        // Hämta ingredienserna för varje recept
                        const ingredientResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/ingredientWidget.json`, {
                            params: {
                                apiKey: '4f5c4482685449dbb9a7d54b3c97b2e5'
                            }
                        });
                        
                        const ingredients = ingredientResponse.data.ingredients.map(ingredient => ingredient.name);

                        return {
                            id: recipe.id,
                            title: recipe.title,
                            image: recipe.image,
                            description: recipe.summary,
                            prepTime: recipe.readyInMinutes,
                            cookTime: recipe.cookingMinutes || recipe.readyInMinutes,
                            ingredients: ingredients
                        

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
    
    //Funktion för att spara recept 
    const handleSave = (recipe) => {
        const category = prompt("Välj en kategori för denna recept:");
        if(!category) return;

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
