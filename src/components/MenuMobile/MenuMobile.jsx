import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import NavItems from '../../assets/NavItems.json';
import './MenuMobile.scss';

const MenuMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [navItems, setNavItems] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuButtonClick = () => {
        setIsMenuOpen((prevState) => !prevState);
    };


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1100);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        const updatedNavItems = [...NavItems];
        updatedNavItems[3].displayName = "MOVIES";
        setNavItems(updatedNavItems);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`menu-mobile-wrapper${isMenuOpen ? ' open' : ''}`}>
            <div className="menu-mobile">
                <a href="https://www.embassycineplex.com/home" target="_blank" rel="noopener noreferrer">
                    <img src="./images/logo-mobile-embassy-side.svg" alt="Logo" />
                </a>
                <div className="menu-items">
                    {navItems.slice(3, 6).map((item) => (
                        <NavLink
                            to={item.path}
                            key={item.displayName}
                            className="menu-item"
                        >
                            {item.displayName}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className="menu-button" onClick={handleMenuButtonClick}>
                <img src="./images/btn-mobile-sidemenu.svg" alt="Side Menu Button" />
            </div>
        </div>
    );
};

export default MenuMobile;
