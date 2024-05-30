import React from "react";
import { Link } from 'react-router-dom';
import SearchBar from "../SearchBar/SearchBar";
import './Header.css';

const Header = ({ onSearch }) => {
    return (
        <header className="header">
            <h1 className="logo"><a href="/">KöksKompis</a></h1>
            <nav className="nav-links">
                {/*länkar */}
                <Link to="/" className="nav-link">Hem</Link>
                <Link to="/saved" className="nav-link">Sparade Recept</Link>
                <Link to="/own-recipes" className="nav-link">Egna Recept</Link>
            </nav>
            {/* Sökfält i header, skickar sökquery till on search-funktionen */}
            <SearchBar className="header-search-bar" isHeader={true} onSearch={onSearch} />

        </header>
    );

};

export default Header;