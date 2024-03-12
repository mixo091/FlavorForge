import './Navbar.css'
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import FlavorForgeLogo from '../Logo/FlavorForgeLogo';
import { IoHomeOutline } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import { CiSaveDown2 } from "react-icons/ci";

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
  
    const logout = () => {
      setCookies("access_token", "");
      window.localStorage.clear();
      navigate("/auth");
    };
    return (
        <div className="navbar">
            <FlavorForgeLogo />
            <div className='nav-links'>
                <Link  className="nav-link" to="/"><IoHomeOutline className='nav-icon'/><div>Home</div></Link>
                <Link  className="nav-link" to="/create-recipe"><IoCreateOutline className='nav-icon'/> <div>CreateRecipe </div></Link>
                    <Link  className="nav-link" to="/saved-recipe"><CiSaveDown2  className='nav-icon'/><div>SavedRecipes</div></Link>
                {!cookies.access_token ? (             
                <div className='auth-links'>
                    <Link className="login-link" to="/login">Login</Link> 
                    <Link className="register-link" to="/register">Register</Link> 
                </div>
                ) : ( <button onClick={logout}> Logout </button> )}
            </div>
        </div>
    );
};