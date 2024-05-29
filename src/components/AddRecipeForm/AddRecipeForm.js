import React, { useState } from 'react';
import './AddRecipeForm.css';

// states för att lagra recept 
const AddRecipeForm = ({ addRecipe, onClose }) => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState(['', '', '']);
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [category, setCategory] = useState('');

  // hantera förändringar i fältet
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };
  // lägga till en ny ingrediens
  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };
  // generera id
  const generateUniqueId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < 24; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
  };
  // hantera formulärskickning
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recipeName || ingredients.some(ing => !ing) || !prepTime || !cookTime || !category) {
      alert('Ange all data!');
      return;
    }

    const newRecipe = {
      id: generateUniqueId(),
      name: recipeName,
      ingredients,
      prepTime,
      cookTime,
      category
    };

    addRecipe(newRecipe);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="add-recipe-form">
      <label>
        Recipe Name:
        <input
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          required
        />
      </label>
      <div className="ingredients-section">
        <label>Ingredients:</label>
        {ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            value={ingredient}
            onChange={(e) => handleIngredientChange(index, e.target.value)}
            required
          />
        ))}
        <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
      </div>
      <label>
        Prep Time:
        <input
          type="text"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          required
        />
      </label>
      <label>
        Cook Time:
        <input
          type="text"
          value={cookTime}
          onChange={(e) => setCookTime(e.target.value)}
          required
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="rounded-button">Save Recipe</button>
    </form>
  );
};

export default AddRecipeForm;
