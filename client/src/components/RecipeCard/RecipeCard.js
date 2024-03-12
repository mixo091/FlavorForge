import React from 'react';
import './RecipeCard.css';
import { useState } from 'react';

const RecipeCard = ({ recipe ,saveRecipe ,isRecipeSaved }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <div className="recipe-card" onClick={handleTogglePopup}>
        <div className="recipe-header">
          {recipe.imageUrl && <img src={recipe.imageUrl} alt="Recipe" />}
          <h3>{recipe.title}</h3>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
          <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
          </button>
            <img src={recipe.imageUrl} alt="Recipe" />
            <h2>{recipe.title}</h2>
            <p>Description: {recipe.description}</p>
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
            <p>Ingredients: {recipe.ingredients.join(', ')}</p>
            <p>Instructions: {recipe.instructions}</p>
            <button onClick={handleTogglePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;