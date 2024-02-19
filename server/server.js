require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());
const { default: mongoose } = require('mongoose');



app.get('/' , (req , res) => {
    res.status(200).send('Recipe App');
})

app.get('/api/recipes' , (req , res) => {
    res.status(200).send('Recipes');
})



const PORT = process.env.PORT;
app.listen(PORT , () => {
    console.log(`Server is listening on port ${PORT}..`);
})