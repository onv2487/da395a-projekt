import React from "react";
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
    <HeaderContainer>
        <h1>Recept Hemsida</h1>
        <NavLinks>
            <Link to="/">Hem</Link>
            <Link to="/saved">Sparade Recept</Link>
        </NavLinks>

    </HeaderContainer>

);

export default Header;