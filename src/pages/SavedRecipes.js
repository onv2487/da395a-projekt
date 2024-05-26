import React, {useState, useEffect} from "react";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import "./SavedRecipes.css";

const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const recipes = JSON.parse(localStorage.getItem("savedRecipes"));
        setSavedRecipes(recipes || {});
    }, []);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const categories = Object.keys(savedRecipes);

    return (
        <div className="saved-recipes">
            <div className="category-selector">
                <h2>Sparade recept</h2>
                <button onClick={() => handleCategorySelect('')}>Visa Alla</button>
                {categories.map(category => (
                    <button key={category} onClick={() => handleCategorySelect(category)}>{category}</button>
                ))}

            </div>
            <div className="recipes-container">
                {selectedCategory === '' ? (
                    //visa alla recipies
                    categories.map(category => (
                        savedRecipes[category].map(recipe => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))
                    ))
                ) : (
                    //Visa recept under valt kategory
                    savedRecipes[selectedCategory].map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))

                )}

            </div>
        </div>
           
    );

};

export default SavedRecipes;