import React from 'react';
import './SavedRecipeCard.css';

const RecipeCard = ({ recipe, onSave}) => (
    <div className="recipe-card">
        <img src={recipe.image} alt={recipe.title} />
        <div className="recipe-content">
            <h2 className="recipe-title">{recipe.title}</h2>
            <div className="recipe-details">
                <p><strong>Förberedelse:</strong> {recipe.prepTime} minuter</p>
                <p><strong>Matlagning:</strong> {recipe.cookTime} minuter</p>
                <p><strong>Ingredienser:</strong></p>
                <ul>
                    
                    {recipe.ingredients && Array.isArray(recipe.ingredients) && recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>

            </div>
           
        </div> 
         <button className="delete-button" onClick= {() => onSave(recipe)}>Radera</button>
    </div>
);

export default RecipeCard;