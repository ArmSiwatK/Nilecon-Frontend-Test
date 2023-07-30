import React, { useState, useEffect } from 'react';
import './Header.scss';

const Header = () => {
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
        <>
            {isMobile ? (
                <header>
                    <a className="mobile-logo" href="https://www.embassycineplex.com/home">
                        <img src="./images/logo-mobile.svg" alt="Logo" />
                    </a>
                    <a className="phone-button">
                        <img src="./images/btn-tel.svg" alt="Phone Button" />
                    </a>
                </header>
            ) : (
                <header>
                    <div className="header-left">
                        <span>Follow us on</span>
                        <a href="https://www.facebook.com/embassycineplex" target="_blank" rel="noopener noreferrer">
                            <img src="./icons/icon-fb.png" alt="Facebook" />
                        </a>
                        <a href="https://twitter.com/embassycineplex" target="_blank" rel="noopener noreferrer">
                            <img src="./icons/icon-tw.png" alt="Twitter" />
                        </a>
                        <a href="https://www.instagram.com/embassyscreens" target="_blank" rel="noopener noreferrer">
                            <img src="./icons/icon-ig.png" alt="Instagram" />
                        </a>
                        <a href="https://www.youtube.com/user/embassycineplex" target="_blank" rel="noopener noreferrer">
                            <img src="./icons/icon-yt.png" alt="YouTube" />
                        </a>
                    </div>
                    <div className="header-right">
                        <span>Get Embassy Screens app on</span>
                        <a href="https://apps.apple.com/app/embassy-screens/id882209348" target="_blank" rel="noopener noreferrer">
                            <img src="./images/download-appstore.png" alt="App Store" />
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=th.co.invp.EmbassyActivity" target="_blank" rel="noopener noreferrer">
                            <img src="./images/download-googleplay.png" alt="Google Play" />
                        </a>
                    </div>
                </header>
            )}
        </>
    );
};

export default Header;
