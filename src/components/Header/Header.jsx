import React from 'react';
import "./Header.scss";

const Header = () => {
    return (
        <header>
            <div className="left-side">
                <span>Follow us on</span>
                <a href="https://www.facebook.com/embassycineplex" target="_blank" rel="noopener noreferrer">
                    <img src="./images/icon-fb.png" alt="Facebook" />
                </a>
                <a href="https://twitter.com/embassycineplex" target="_blank" rel="noopener noreferrer">
                    <img src="./images/icon-tw.png" alt="Twitter" />
                </a>
                <a href="https://www.instagram.com/embassyscreens" target="_blank" rel="noopener noreferrer">
                    <img src="./images/icon-ig.png" alt="Instagram" />
                </a>
                <a href="https://www.youtube.com/user/embassycineplex" target="_blank" rel="noopener noreferrer">
                    <img src="./images/icon-yt.png" alt="YouTube" />
                </a>
            </div>
            <div className="right-side">
                <span>Get Embassy Screens app on</span>
                <a href="https://apps.apple.com/app/embassy-screens/id882209348" target="_blank" rel="noopener noreferrer">
                    <img src="./images/download-appstore.png" alt="App Store" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=th.co.invp.EmbassyActivity" target="_blank" rel="noopener noreferrer">
                    <img src="./images/download-googleplay.png" alt="Google Play" />
                </a>
            </div>
        </header>
    );
};

export default Header;
