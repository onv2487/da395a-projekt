import React, { useState, useEffect } from "react";
import OwnRecipeCard from '../components/OwnRecipeCard/OwnRecipeCard';
import './OwnRecipes.css';

const OwnRecipes = () => {
  // state för egna recept i localStorage
  const [ownRecipes, setOwnRecipes] = useState({});
  // state för ekategori
  const [selectedCategory, setSelectedCategory] = useState('');
  //ladda egna recept från localStorage
  useEffect(() => {
    const storedRecipes = localStorage.getItem("ownRecipes");

    const parseStoredRecipes = (storedRecipes) => {
      try {
        const recipes = JSON.parse(storedRecipes);
        return Array.isArray(recipes) ? recipes : [];
      } catch (e) {
        return [];
      }
    };

    let recipes = storedRecipes ? parseStoredRecipes(storedRecipes) : [];


    const categorizedRecipes = recipes.reduce((acc, recipe) => {
      if (!acc[recipe.category]) {
        acc[recipe.category] = [];
      }
      acc[recipe.category].push(recipe);
      return acc;
    }, {});

    setOwnRecipes(categorizedRecipes);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const categories = Object.keys(ownRecipes);
  //ta bort receptet
  // kkunde inte göra samma sak som i sparade recept. pga id?
  const handleDelete = (recipe) => {
    let updatedOwnRecipes = { ...ownRecipes };
    const category = Object.keys(updatedOwnRecipes).find(category =>
      Array.isArray(updatedOwnRecipes[category]) &&
      updatedOwnRecipes[category].some(ownRecipe => ownRecipe.id === recipe.id)
    );

    if (category) {
      updatedOwnRecipes[category] = updatedOwnRecipes[category].filter(ownRecipe => ownRecipe.id !== recipe.id);
      if (updatedOwnRecipes[category].length === 0) {
        delete updatedOwnRecipes[category];
      }
      setOwnRecipes(updatedOwnRecipes);
      localStorage.setItem("ownRecipes", JSON.stringify(updatedOwnRecipes));
    }
  };

  return (
    <div className="saved-recipes">
      <div className="category-selector">
        <h2>Sparade Recept</h2>
        <button key="alla" onClick={() => handleCategorySelect('')}>Alla</button>
        {categories.length > 0 && categories.map(category => (
          <button key={category} onClick={() => handleCategorySelect(category)}>{category}</button>
        ))}
      </div>
      <div className="recipes-container" key={selectedCategory}>
        {selectedCategory === '' ? (
          categories.length === 0 ? (
            <p className="no-results">Inga Recept hittades.</p>
          ) : (
            categories.map(category =>
              (Array.isArray(ownRecipes[category]) ? ownRecipes[category] : []).map((recipe) => (
                <OwnRecipeCard key={`${recipe.id}-${category}`} recipe={recipe} onDelete={handleDelete} />
              ))
            )
          )
        ) : (
          Array.isArray(ownRecipes[selectedCategory]) && ownRecipes[selectedCategory].length > 0 ? (
            ownRecipes[selectedCategory].map((recipe) => (
              <OwnRecipeCard key={`${recipe.id}-${selectedCategory}`} recipe={recipe} onDelete={handleDelete} />
            ))
          ) : (
            <p className="no-results">Inga recept hittades för den valda kategorin.</p>
          )
        )}
      </div>
    </div>
  );
};

export default OwnRecipes;
