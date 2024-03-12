import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import express from 'express'
import { verifyToken } from "./users.js";
import { userModel } from '../models/Users.js';



const router =  express.Router();

//Get all the recipes 
router.get('/' , async (req ,res) => {
    try{
        const response = await RecipeModel.find({});
        res.json(response);
    }catch ( err ){
        res.json(err);
    }

})

// Get a recipe by ID
router.get("/:recipeId", async (req, res) => {
    try {
      const result = await RecipeModel.findById(req.params.recipeId);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Save a Recipe
router.put("/", async (req, res) => {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await userModel.findById(req.body.userID);
    try {
      user.savedRecipes.push(recipe);
      await user.save();
      res.status(201).json({ savedRecipes: user.savedRecipes });
    } catch (err) {
      res.status(500).json(err);
    }
  });


// Get id of saved recipes
router.get("/savedRecipes/ids/:userId", async (req, res) => {
    try {
      const user = await userModel.findById(req.params.userId);
      res.status(201).json({ savedRecipes: user?.savedRecipes });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  // Get saved recipes
  router.get("/savedRecipes/:userId", async (req, res) => {
    try {
      const user = await userModel.findById(req.params.userId);
      const savedRecipes = await RecipeModel.find({
        _id: { $in: user.savedRecipes },
      });
  
      console.log(savedRecipes);
      res.status(201).json({ savedRecipes });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  


  // Create a new recipe
router.post("/", verifyToken, async (req, res) => {
  const recipe = new RecipeModel({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    image: req.body.image,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    imageUrl: req.body.imageUrl,
    cookingTime: req.body.cookingTime,
    userOwner: req.body.userOwner,
  });
  console.log(recipe);

  try {
    const result = await recipe.save();
    res.status(201).json({
      createdRecipe: {
        title: result.title,
        image: result.image,
        ingredients: result.ingredients,
        instructions: result.instructions,
        _id: result._id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



export { router as recipesRouter };