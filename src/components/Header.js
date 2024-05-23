import React from "react";
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
    <header className = "header">
        <h1>Recept Hemsida</h1>
        <nav>
            <Link to="/">Hem</Link>
            <Link to="saved">Sparade Recept</Link>
        </nav>
    </header>
);

export default Header;