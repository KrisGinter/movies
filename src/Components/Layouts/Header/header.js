import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Header() {
    return (
        <header className="header">
            <nav className="container">
                <div className="header__name">
                    <p>MOVIES</p>
                </div>
                <label className="label">
                    <input className="checkbox" type="checkbox" />
                    <FontAwesomeIcon className="fa-solid fa-bars icon hamburger" icon={faBars} />
                    <div className="header__menu">
                        <Link className="header__link" to="/">Home</Link>
                        <Link className="header__link" to="/search">Search</Link>
                        <Link className="header__link" to="/favourites">Favourites</Link>
                        <Link className="header__link" to="/contact">Contact</Link>
                    </div>
                </label>
            </nav>
        </header>

    );
}

export default Header;