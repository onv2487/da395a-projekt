import React from 'react';
import './SavedRecipeCard.css';

const SavedRecipeCard = ({ recipe, onDelete}) => (
    <div className="recipe-card">
        <img src={recipe.image} alt={recipe.title} />
        <div className="recipe-content">

            <div className="recipe-details">
                <h2 className="recipe-title">{recipe.title}</h2>
                <p><strong>Förberedelse:</strong> {recipe.prepTime} minuter</p>
                <p><strong>Matlagning:</strong> {recipe.cookTime} minuter</p>
                <p><strong>Ingredienser:</strong></p>
                <ul>
                    
                    {recipe.ingredients && Array.isArray(recipe.ingredients) && recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>

            </div>
            <button className="delete-button" onClick= {() => onDelete(recipe)}>Radera</button>
        </div> 
        
    </div>
);

export default SavedRecipeCard;