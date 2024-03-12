import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import {useCookies} from 'react-cookie'
import { MdAppRegistration } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import './Register.css'


function Register() {
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate();

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

    const navigateToLogin = () => {
        navigate('/login');
    };

    return (
        <div className='register-container'>
            <form className='form-container' onSubmit={onSubmit}>
                <div className='register-header'>
                    <h2> Register </h2>
                    <MdAppRegistration className='registration-icon' />
                </div>
                
                <div className='form-group'>
                    <label htmlFor='username'>Username:</label>
                    <input value={username} type='text' id='username' onChange={(e)=>{setUsername(e.target.value)}}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input  value={password} type='text' id='password' onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button type="submit"  >Register</button>
                <div className='login-prompt'>Already in FlavorForge? <span className='login-link' onClick={navigateToLogin}>Login here</span></div>
            </form>
        </div>
    );
}

export default Register