import React, { useState, useEffect } from 'react';
import './Logo.scss';

const Logo = () => {
    const [isMobile, setIsMobile] = useState(false);

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
        !isMobile && (
            <div className="logo-wrapper">
                <a className="logo" href="https://www.embassycineplex.com/home" target="_blank" rel="noopener noreferrer">
                    <img src="./images/logo.png" alt="Logo" />
                </a>
            </div>
        )
    );
};

export default Logo;
