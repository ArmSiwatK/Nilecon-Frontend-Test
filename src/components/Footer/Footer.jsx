import React, { useState, useEffect } from 'react';
import './Footer.scss';

const Footer = () => {
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
        <footer>
            {isMobile ? (
                <div></div>
            ) : (
                <>
                    <img src="./images/bg-tel-footer.png" />
                    <div className="footer-menu">
                        <div className="footer-list">
                            <ul>
                                <li>Today</li>
                                <li>Advance Booking</li>
                                <li>Coming Soon</li>
                                <li>Promotion</li>
                                <li>Event & Activity</li>
                            </ul>
                        </div>
                        <div className="footer-list">
                            <ul>
                                <li>Information</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                        <div className="footer-list">
                            <ul>
                                <li>Privacy Policy</li>
                                <li>Terms & Conditions</li>
                            </ul>
                        </div>
                        <div className="footer-right">
                            <span>Follow us on</span>
                            <div className="footer-links">
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
                        </div>
                    </div>
                    <div className="copyright">
                        Copyright © 2014 by Executive Cinema Corporation. All Rights Reserved
                    </div>
                </>
            )}
        </footer>
    );
};

export default Footer;
