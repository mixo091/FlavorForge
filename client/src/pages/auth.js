import React from 'react'
import { useState } from 'react';
import '../styles/Auth.css'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom';

function Auth() {
  return (
    <div className='auth'>
        <Login />
        <Register />
    </div>
  )
}


const Login = () => {
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    const [_, setCookies] = useCookies(['access_token']);
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post("http://localhost:5000/auth/login" , {
                username,
                password,
            });
            setCookies("access_token"  , response.data.token);
            window.localStorage.setItem('userID' , response.data.userID);
            navigate('/'); 
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className='auth-container'>
            <form  onSubmit={onSubmit}>
                <h2> Login </h2>
                <div className='form-group'>
                    <label htmlFor='username'>Username:</label>
                    <input value={username} type='text' id='username' onChange={(e)=>{setUsername(e.target.value)}}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input  value={password} type='text' id='password' onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};


const Register = () => {
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            await axios.post("http://localhost:5000/auth/register" , {
                username,
                password,
            });
            alert('Registration Completed! Now login.');
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className='auth-container'>
            <form onSubmit={onSubmit}>
                <h2> Register </h2>
                <div className='form-group'>
                    <label htmlFor='username'>Username:</label>
                    <input value={username} type='text' id='username' onChange={(e)=>{setUsername(e.target.value)}}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input  value={password} type='text' id='password' onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button type="submit"  >Register</button>
            </form>
        </div>
    );
};

export default Auth