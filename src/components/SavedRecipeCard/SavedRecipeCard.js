import React from 'react';
import './SavedRecipeCard.css';

const SavedRecipeCard = ({ recipe, onDelete}) => (
    //komponent som visar sparade recept 
    <div className="saved-recipe-card">
        <img src={recipe.image} alt={recipe.title} />
        <div className="saved-recipe-content">

            <div className="saved-recipe-details">
                <h2 className="saved-recipe-title">{recipe.title}</h2>
                <p><strong>Förberedelse:</strong> {recipe.prepTime} minuter</p>
                <p><strong>Matlagning:</strong> {recipe.cookTime} minuter</p>
                 {/* Lista över ingredienser för receptet */}
                <p><strong>Ingredienser:</strong></p>
                <ul>
                     {/* Kolla om ingredienserna finns och är en array innan listan skapas*/}
                    {recipe.ingredients && Array.isArray(recipe.ingredients) && recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>

            </div>
            {/* Knapp för att radera receptet */}
            <button className="delete-button" onClick= {() => onDelete(recipe)}>Radera</button>
        </div> 
        
    </div>
);

export default SavedRecipeCard;