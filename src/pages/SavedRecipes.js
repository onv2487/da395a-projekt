import React, { useState, useEffect } from "react";
import SavedRecipeCard from "../components/SavedRecipeCard/SavedRecipeCard";
import "./SavedRecipes.css";

const SavedRecipes = () => {
    // state för sparade recept i localStorage
    const [savedRecipes, setSavedRecipes] = useState({});
    //state som håller den valda kategorin
    const [selectedCategory, setSelectedCategory] = useState('');

    //ladda sparade recept från localStorage
    useEffect(() => {
        const recipes = JSON.parse(localStorage.getItem("savedRecipes"));
        setSavedRecipes(recipes || {});
    }, []);

    //detta hanterar kategorival
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    //hämtar listan på kategorierna som finns
    const categories = Object.keys(savedRecipes);

    const handleDelete = (recipe) => {
        //kopiera savedRecipes till updateSavedRecipes
        let updatedSavedRecipes = { ...savedRecipes };
        //hitta kategorin receptet är sparat i
        const category = Object.keys(updatedSavedRecipes).find(category =>
            updatedSavedRecipes[category].some(savedRecipe => savedRecipe.id === recipe.id)
        );
        //ta bort receptet och kategorin om den blir tom
        if (category) {
            updatedSavedRecipes[category] = updatedSavedRecipes[category].filter(savedRecipe => savedRecipe.id !== recipe.id);
            //radera kategorin om den blir tom
            if (updatedSavedRecipes[category].length === 0) {
                delete updatedSavedRecipes[category];
            }

            //Updatering av localStorage och state
            setSavedRecipes(updatedSavedRecipes);
            localStorage.setItem("savedRecipes", JSON.stringify(updatedSavedRecipes));
        }
    };

    return (
        <div className="saved-recipes">
            <div className="category-selector">
                <h2>Sparade Recept</h2>
                <button key="alla" onClick={() => handleCategorySelect('')}>Alla</button>
                {categories.map(category => (
                    <button key={category} onClick={() => handleCategorySelect(category)}>{category}</button>
                ))}

            </div>
            <div className="recipes-container" key={selectedCategory}>
                {selectedCategory === '' ? (
                    //visa alla recipies
                    categories.length === 0 ? (
                        <p className="no-results">Inga Recept hittades.</p>
                    ) : (
                        categories.map(category =>
                            savedRecipes[category].map((recipe) => {
                                console.log(recipe.id);
                                return (
                                    // Använd en unik key genom att kombinera recipe.id och kategori
                                    <SavedRecipeCard key={`${recipe.id}-${category}`} recipe={recipe} onDelete={handleDelete} />
                                );
                            })
                        )

                    )

                ) : (
                    //Visa recept under valt kategory
                    savedRecipes[selectedCategory] ? (
                        savedRecipes[selectedCategory].map((recipe) => (
                            // Använd en unik key genom att kombinera recipe.id och kategori
                            <SavedRecipeCard key={`${recipe.id}-${selectedCategory}`} recipe={recipe} onDelete={handleDelete} />

                        ))

                    ) : (
                        <p className="no-results">Inga recept hittades för den valda kategorin.</p>
                    )
                )}

            </div>
        </div>

    );

};

export default SavedRecipes;