import React from "react";
import { Link } from 'react-router-dom';
import SearchBar from "../SearchBar/SearchBar";
import './Header.css';

const Header = () => {
    return(
        <header className="header">

            <h1 className="logo">Recept Hemsida</h1>
            <nav className="nav-links">
                <Link to="/" className="nav-link">Hem</Link>
                <Link to="/saved" className="nav-link">Sparade Recept</Link>
            </nav>
            <SearchBar isHeader={true} />

        </header>
    );

};

export default Header;