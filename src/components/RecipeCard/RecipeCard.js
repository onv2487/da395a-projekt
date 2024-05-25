import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onSave}) => (
    <div className="recipe-card">
        <img src={recipe.image} alt={recipe.title} />
        <div className="recipe-content">
            <h2 className="recipe-title">{recipe.title}</h2>
            <p className="recipe-description" dangerouslySetInnerHTML={{ __html: recipe.description }}>{recipe.description}</p>
            <div className="recipe-details">
                <p><strong>Förberedelse:</strong> {recipe.prepTime} minuter</p>
                <p><strong>Matlagning:</strong> {recipe.cookTime} minuter</p>
                <p><strong>Ingredienser:</strong></p>
                <ul>
                    {recipe.ingredients ? recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    )) : <li>Ingen information</li>}
                </ul>

            </div>
            <button onClick= {() => onSave(recipe)}>Spara</button>
        </div> 
    </div>
);

export default RecipeCard;