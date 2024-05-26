import React, {useState, useEffect} from "react";
import SavedRecipeCard from "../components/SavedRecipeCard/SavedRecipeCard";
import "./SavedRecipes.css";

const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const recipes = JSON.parse(localStorage.getItem("savedRecipes"));
        setSavedRecipes(recipes || {});
    }, []);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const categories = Object.keys(savedRecipes);

    const handleDelete = (recipe) => {
        //kopiera savedRecipes till updateSavedRecipes
        let updateSavedRecipes = {...savedRecipes};
        //hitta kategorin receptet är sparat i
        const category = object.keys(updateSavedRecipes).find(category =>
            updateSavedRecipes[category].some(savedRecipes => savedRecipe.id === recipe.id)
        );
        //ta bort receptet och kategorin om den blir tom
        if(category) {
            updateSavedRecipes[category] = updateSavedRecipes[category].filter(savedRecipe => savedRecipe.id !== recipe.id);
            if(updateSavedRecipes[category].length === 0) {
                delete updateSavedRecipes[category];
            }
            setSavedRecipes(updateSavedRecipes);
            localStorage.setItem("savedRecipes", JSON.stringify(updateSavedRecipes));
        }
    };


    return (
        <div className="saved-recipes">
            <div className="category-selector">
                <h2>Sparade Recept</h2>
                <button onClick={() => handleCategorySelect('')}>Visa Alla</button>
                {categories.map(category => (
                    <button key={category} onClick={() => handleCategorySelect(category)}>{category}</button>
                ))}

            </div>
            <div className="recipes-container">
                {selectedCategory === '' ? (
                    //visa alla recipies
                    categories.map(category => (
                        savedRecipes[category].map(recipe => (
                            <SavedRecipeCard key={recipe.id} recipe={recipe} />
                        ))
                    ))
                ) : (
                    //Visa recept under valt kategory
                    savedRecipes[selectedCategory].map(recipe => (
                        <SavedRecipeCard key={recipe.id} recipe={recipe} />
                    ))

                )}

            </div>
        </div>
           
    );

};

export default SavedRecipes;