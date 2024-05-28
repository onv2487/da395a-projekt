import React from "react";
import { Link } from 'react-router-dom';
import SearchBar from "../SearchBar/SearchBar";
import './Header.css';

const Header = ({onSearch}) => {
    return(
        <header className="header">
            <h1 className="logo">KöksKompis</h1>
            <nav className="nav-links">
                <Link to="/" className="nav-link">Hem</Link>
                <Link to="/saved" className="nav-link">Sparade Recept</Link>
            </nav>
            <SearchBar className="header-search-bar" isHeader={true} onSearch={onSearch} />

        </header>
    );

};

export default Header;