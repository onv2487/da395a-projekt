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

    return (
        <div className="saved-recipes">
            <div className="category-selector">
                <button onClick={() => handleCategorySelect('')}>All</button>
                {Object.keys(savedRecipes).map(category => (
                    <button key={category} onClick={() => handleCategorySelect(category)}>{category}</button>
                ))}

            </div>
            <div className="recipes-container">
                {selecttedCategory === '' ? (
                    //visa alla recipies
                    Object.keys(savedRecipes).map(category => (
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