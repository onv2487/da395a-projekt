import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onSave}) => (
    <div className="recipe-card">
        <img src={recipe.image} alt={recipe.title} />
        <div className="recipe-content">
            <h2 className="recipe-title">{recipe.title}</h2>
            <p className="recipe-description">{recipe.description}</p>
            <div className="recipe-details">
                <p><strong>Förberedelse:</strong> {recipe.prepTime} minuter</p>
                <p><strong>Matlagning:</strong> {recipe.cookTime} minuter</p>
                <p><strong>Ingredienser:</strong> {recipe.ingredients ? recipe.ingredients.join(', ') : 'Ingen information'}</p>
            </div>
            <button onClick= {() => onSave(recipe)}>Spara</button>
        </div> 
    </div>
);

export default RecipeCard;