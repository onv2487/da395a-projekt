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
            //radera kategorin om den blir tom
            if(updatedSavedRecipes[category].length === 0) {
                delete updatedSavedRecipes[category];
            }

            //Updatering av localStorage och state
            setSavedRecipes(updatedSavedRecipes);
            localStorage.setItem("savedRecipes", JSON.stringify(updatedSavedRecipes));
        }
    };


    return (
        <div className="saved-recipes">
            <div className="category-selector">
                <h2>Sparade Recept</h2>
                <button key="alla" onClick={() => handleCategorySelect('')}>Alla</button>
                {categories.map(category => (
                    <button key={category} onClick={() => handleCategorySelect(category)}>{category}</button>
                ))}

            </div>
            <div className="recipes-container" key={selectedCategory}>
                {selectedCategory === '' ? (
                    //visa alla recipies
                    categories.length === 0 ? (
                        <p className="no-results">Inga Recept hittades.</p>
                    ) : (
                        categories.map(category => (
                            savedRecipes[category].map((recipe, index) => {
                                const recipeId = recipe.id ||  `temp-id-${category}-${index}`;
                                console.log(`Recipe ID: ${recipeId}`);
                                return (
                                    <SavedRecipeCard key={recipe.id} recipe={recipe}  onDelete={handleDelete}/>
                                );
                            })
                        ))

                    )
                    
                ) : (
                    //Visa recept under valt kategory
                    savedRecipes[selectedCategory] ? (
                        savedRecipes[selectedCategory].map((recipe, index) => {
                            const recipeId = recipe.id ||  `temp-id-${selectedCategory}-${index}`;
                            console.log(`Recipe ID: ${recipeId}`);
                            return (
                                <SavedRecipeCard key={recipe.id} recipe={recipe} onDelete={handleDelete} />
                            );
                        })

                    ) : (
                        <p className="no-results">Inga recept hittades för den valda kategorin.</p>
                    )
                )}

            </div>
        </div>
           
    );

};

export default SavedRecipes;