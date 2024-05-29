import React from 'react';

const OwnRecipeCard = ({ recipe, onDelete }) => (
  //Receptets innehåll (en lista med beskrivning)
  <div className="saved-recipe-card">
    <div className="saved-recipe-content">
      <div className="saved-recipe-details">
        <h2 className="saved-recipe-title">{recipe.name}</h2>
        <p><strong>Förberedelse:</strong> {recipe.prepTime} minuter</p>
        <p><strong>Matlagning:</strong> {recipe.cookTime} minuter</p>
        <p><strong>Ingredienser:</strong></p>
        <ul>
          {recipe.ingredients && Array.isArray(recipe.ingredients) && recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <button className="delete-button" onClick={() => onDelete(recipe)}>Radera</button>
    </div>
  </div>
);


export default OwnRecipeCard;