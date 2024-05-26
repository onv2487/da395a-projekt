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
        let updatedSavedRecipes = {...savedRecipes};
        //hitta kategorin receptet är sparat i
        const category = Object.keys(updatedSavedRecipes).find(category =>
            updatedSavedRecipes[category].some(savedRecipe => savedRecipe.id === recipe.id)
        );
        //ta bort receptet och kategorin om den blir tom
        if(category) {
            updatedSavedRecipes[category] = updatedSavedRecipes[category].filter(savedRecipe => savedRecipe.id !== recipe.id);
            if(updatedSavedRecipes[category].length === 0) {
                delete updatedSavedRecipes[category];
            }
            setSavedRecipes(updatedSavedRecipes);
            localStorage.setItem("savedRecipes", JSON.stringify(updatedSavedRecipes));
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
                            <SavedRecipeCard key={recipe.id} recipe={recipe}  onDelete={handleDelete}/>
                        ))
                    ))
                ) : (
                    //Visa recept under valt kategory
                    savedRecipes[selectedCategory] ? (
                        savedRecipes[selectedCategory].map(recipe => (
                            <SavedRecipeCard key={recipe-id} recipe={recipe} onDelete={handleDelete} />
                        ))

                    ) : (
                        <p>Inga recept hittades för den valda kategorin.</p>
                    )
                )}

            </div>
        </div>
           
    );

};

export default SavedRecipes;