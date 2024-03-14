import React, { useState } from 'react';
import { IoIosTimer } from "react-icons/io";
import { BsSave2 } from "react-icons/bs";
import './RecipeCard.css';

const RecipeCard = ({ recipe, saveRecipe, isRecipeSaved }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <div className="recipe-card" onClick={handleTogglePopup}>
        <div className="recipe-header">
          {recipe.imageUrl && <img src={recipe.imageUrl} alt="Recipe" />}
          <div className='recipe-small-info'>
            <div>{recipe.title}</div>
            <div className='recipe-small-time'>
              <IoIosTimer />
              <div>{recipe.cookingTime}'mins</div>
            </div>
            <div className='recipe-small-saved'>

              {isRecipeSaved(recipe._id) ?  <div><BsSave2 /><div>Saved</div></div>: <div onClick={()=>{saveRecipe(recipe._id)}} ><BsSave2 /><div>Save</div></div>}
            </div>
           
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-btn" onClick={handleTogglePopup}>
              &times;
            </button>
            <div className="popup-content">
              <button
                className="save-btn"
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? 'Saved' : 'Save'}
              </button>
              <img src={recipe.imageUrl} alt="Recipe" />
              <h2>{recipe.title}</h2>
              <p>Description: {recipe.description}</p>
              <p>Cooking Time: {recipe.cookingTime} minutes</p>
              <p>Ingredients: {recipe.ingredients.join(', ')}</p>
              <p className="instructions">Instructions: {recipe.instructions}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;