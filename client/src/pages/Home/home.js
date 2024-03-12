import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './Home.css'
import axios from 'axios'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import { useGetUserID } from '../../hooks/useGetUserID'

function Home() {

  const [recipes , setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:5000/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className='home-page'>

      <div className='recipe-grid'>
          {
            recipes.map((recipe)=>{
                return <RecipeCard key={recipe._id} recipe={recipe} isRecipeSaved={isRecipeSaved} saveRecipe={saveRecipe}/>
            })
        }
      </div>

    </div>
  )
}

export default Home