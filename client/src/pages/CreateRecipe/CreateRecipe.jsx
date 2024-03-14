import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FiDelete } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import "./CreateRecipe.css";

const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [step, setStep] = useState(1);
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const handleAddIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients.splice(index, 1);
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/recipes/",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const validateStep = () => {
    const currentStepErrors = {};
    switch (step) {
      case 1:
        if (!recipe.title || !recipe.description) {
          currentStepErrors.title = !recipe.title ? "Title is required" : "";
          currentStepErrors.description = !recipe.description ? "Description is required" : "";
        }
        break;
      case 2:
        if (recipe.ingredients.some(ingredient => !ingredient)) {
          currentStepErrors.ingredients = "All ingredients must be filled";
        }
        break;
      case 3:
        if (!recipe.instructions || !recipe.imageUrl || !recipe.cookingTime) {
          currentStepErrors.instructions = !recipe.instructions ? "Instructions are required" : "";
          currentStepErrors.imageUrl = !recipe.imageUrl ? "Image URL is required" : "";
          currentStepErrors.cookingTime = !recipe.cookingTime ? "Cooking Time is required" : "";
        }
        break;
      default:
        break;
    }
    setErrors(currentStepErrors);
    return Object.keys(currentStepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={recipe.title}
                onChange={handleChange}
              />
              {errors.title && <div className="error">{errors.title}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={recipe.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && <div className="error">{errors.description}</div>}
            </div>
            <button onClick={nextStep}>Next</button>
          </>
        );
      case 2:
        return (
          <>
            <label htmlFor="ingredients">Ingredients</label>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  <FiDelete />
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddIngredient}>
              Add ingredient <IoMdAddCircleOutline />
            </button>
            {errors.ingredients && <div className="error">{errors.ingredients}</div>}
            <button onClick={prevStep}>Previous</button>
            <button onClick={nextStep}>Next</button>
          </>
        );
      case 3:
        return (
          <>
            <div className="form-group">
              <label htmlFor="instructions">Instructions</label>
              <textarea
                className="instructions"
                id="instructions"
                name="instructions"
                value={recipe.instructions}
                onChange={handleChange}
              ></textarea>
              {errors.instructions && <div className="error">{errors.instructions}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="imageUrl">Image URL</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={recipe.imageUrl}
                onChange={handleChange}
              />
              {errors.imageUrl && <div className="error">{errors.imageUrl}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="cookingTime">Cooking Time (minutes)</label>
              <input
                type="number"
                id="cookingTime"
                name="cookingTime"
                value={recipe.cookingTime}
                onChange={handleChange}
              />
              {errors.cookingTime && <div className="error">{errors.cookingTime}</div>}
            </div>
            <button onClick={prevStep}>Previous</button>
            <button type="submit">Create Recipe</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="create-recipe-container">
      <form className="create-recipe-form" onSubmit={handleSubmit}>
        <h2>Create Recipe</h2>
        {renderStep()}
      </form>
    </div>
  );
};

export default CreateRecipe;