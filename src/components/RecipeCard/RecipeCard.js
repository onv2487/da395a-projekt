import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onSave}) => (
    <div className="recipe-card">
        <h2>{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} />
        <p>{recipe.description}</p>
        <button onClick= {() => onSave(recipe)}>Spara</button>
    </div>
);

export default RecipeCard;