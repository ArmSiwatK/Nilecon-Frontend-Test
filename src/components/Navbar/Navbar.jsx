import React, { useState } from 'react';
import './Navbar.scss';

const Navbar = () => {
    const [language, setLanguage] = useState('EN');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const languages = ['EN', 'TH'];

    const handleLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        setDropdownOpen(false);
    };

    const handleDropdownClick = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const navItems = ['TODAY', 'ADVANCE BOOKING', 'COMING SOON', 'INFORMATION', 'PROMOTION', 'EVENT & ACTIVITY'];

    return (
        <div className="navbar">
            {navItems.map((item) => (
                <div
                    key={item}
                    className="nav-item"
                >
                    {item}
                </div>
            ))}
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
        </div>
    );
};

export default Navbar;
