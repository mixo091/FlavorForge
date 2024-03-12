import React from 'react';
import './FlavorForgeLogo.css';
import { GiKnifeFork } from "react-icons/gi"

const FlavorForgeLogo = () => {
    return (
        <div className="logo-container">
            <div className="logo-icon"><GiKnifeFork /></div>
            <div className="logo-text">FlavorForge</div>
        </div>
    );
}

export default FlavorForgeLogo;