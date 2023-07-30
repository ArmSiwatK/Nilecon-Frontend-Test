import React from 'react';
import './Logo.scss';

const Logo = () => {
    return (
        <div className="logo-wrapper">
            <a className="logo" href="https://www.embassycineplex.com/home" target="_blank" rel="noopener noreferrer">
                <img src="./images/logo.png" alt="Logo" />
            </a>
        </div>
    );
};

export default Logo;
