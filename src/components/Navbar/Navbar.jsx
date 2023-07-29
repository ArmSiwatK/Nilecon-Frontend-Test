import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import NavItems from '../../assets/NavItems.json';
import './Navbar.scss';

const Navbar = () => {
    const [language, setLanguage] = useState('EN');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const languages = ['EN', 'TH'];

    const handleLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        setDropdownOpen(false);
    };

    const handleDropdownClick = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1100);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="navbar">
            {isMobile
                ? NavItems.slice(0, 3).map((item) => (
                    <NavLink
                        to={item.path}
                        key={item.displayName}
                        className="nav-item"
                    >
                        {item.displayName}
                    </NavLink>
                ))
                : NavItems.map((item) => (
                    <NavLink
                        to={item.path}
                        key={item.displayName}
                        className="nav-item"
                    >
                        {item.displayName}
                    </NavLink>
                ))}
            {!isMobile && (
                <div className={`language-dropdown ${dropdownOpen ? 'open' : ''}`} onClick={handleDropdownClick}>
                    <span className="selected-language">{language}</span>
                    <span className="dropdown-icon">{dropdownOpen ? '⏶' : '⏷'}</span>
                    {dropdownOpen && (
                        <div className="dropdown-content">
                            {languages
                                .filter((lang) => lang !== language)
                                .map((lang) => (
                                    <div key={lang} onClick={() => handleLanguageChange(lang)}>
                                        {lang}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
