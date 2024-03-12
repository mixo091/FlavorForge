import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import { MdLogin } from "react-icons/md";
import './Login.css'

function Login() {

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

    const navigateToRegister = () => {
        navigate('/register');
    };

    return (
        <div className='login-container'>
            <form className='form-container' onSubmit={onSubmit}>
                <div className='login-header'> 
                    <h2> Welcome </h2>
                    <MdLogin className='login-icon' />
                </div>
                <div className='form-group'>
                    <label htmlFor='username'>Username:</label>
                    <input value={username} type='text' id='username' onChange={(e)=>{setUsername(e.target.value)}}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input  value={password} type='text' id='password' onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button type="submit">Login</button>
                <div className='signup-prompt'>New to FlavorForge? <span className='signup-link' onClick={navigateToRegister}>Join Now</span></div>
            </form>
            
        </div>
    )

}

export default Login