import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userModel } from '../models/Users.js';

const router = express.Router();


router.post('/login', async (req , res) => {
    const { username ,password } = req.body;
    const user = await userModel.findOne({username:username});
    if (!user){
        return res.json({message:'User does not exists'});
    }

    const isPasswordValid  = await bcrypt.compare(password , user.password);

    if(!isPasswordValid){
        return res.json({message:'Invalid Credentials'});
    }

    const token  = jwt.sign({id : user._id} , "secret");
    return res.json({token , userID: user._id});

})

router.post('/register', async (req , res) => {
    const { username , password } = req.body ; 
    const user = await userModel.findOne({username:username});
    if (user){
        return res.json({message:'User already exists'});
    }

    // Lets hash our pass 
    const hashedPassword = await bcrypt.hash(password ,10 );
    const newUser  = new userModel({username:username , password:hashedPassword});
    await newUser.save();
    res.json({message:'User Registered Succesfully'});

})



export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      jwt.verify(authHeader, "secret", (err) => {
        if (err) {
          return res.sendStatus(403);
        }
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };


export { router as userRouter };