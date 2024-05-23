import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onSave}) => (
    <div className="recipe-card">
        <h2>{recipe.tite}</h2>
        <img src={recipe.image} alt={recipe.title} />
        <button onClick= {() => onSave(recipe)}>Spara</button>
    </div>
);

export default RecipeCard;