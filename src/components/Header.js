import React from "react";
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
    <div className="header-container">
        <h1 className="logo">Recept Hemsida</h1>
        <div className="nav-links">
            <Link to="/" className="nqv-link">Hem</Link>
            <Link to="/saved" className="nav-link">Sparade Recept</Link>
        </div>

    </div>

);

export default Header;