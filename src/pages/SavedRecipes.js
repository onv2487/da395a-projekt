import React, {useState, useEffect} from "react";
import RecipeCard from "../components/RecipeCard";
import "./SavedRecipes.css";

const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState({});

    useEffect(() => {
        const recipes = JSON.parse(localStorage.getItem("savedRecipes"));
        setSavedRecipes(recipes || {});
    }, []);

    return (
        <div className="saved-recipes">
            {Object.keys(savedRecipes).map(category => (
                <div key={category}>
                    <h2>{category}</h2>
                    <div className="recipes-container">
                        {savedRecipes[category].map(recipe => ( 
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
                </div>

            ))}
        </div>
    );

};

export default SavedRecipes;