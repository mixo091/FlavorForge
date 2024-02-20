import '../styles/Navbar.css'
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

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
            <Link  className="link" to="/">Home</Link>
            <Link  className="link" to="/create-recipe">CreateRecipe</Link>
            <Link  className="link" to="/saved-recipe">SavedRecipes</Link>
            {!cookies.access_token ? ( <Link className="link" to="/auth">Login/Register</Link>) : ( <button onClick={logout}> Logout </button> )}
        </div>
    );
};