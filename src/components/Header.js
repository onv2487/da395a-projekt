import React from "react";
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
    <div className="header-container">
        <h1>Recept Hemsida</h1>
        <div className="nav-links">
            <Link to="/">Hem</Link>
            <Link to="/saved">Sparade Recept</Link>
        </div>

    </div>

);

export default Header;