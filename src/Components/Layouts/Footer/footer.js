import React from 'react';
import Twitter from "../../../Assets/Images/Twitter.svg"
import Facebook from "../../../Assets/Images/Facebook.svg"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__text">
                    <p className="footer__logo">MOVIES</p>
                    <p className="footer__copyright">© 2023 Movies, All Rights Reserved</p>
                </div>
                <div className="footer__links">
                    <img className="footer__image" src={Twitter} alt="Twitter" />
                    <img className="footer__image" src={Facebook} alt="Facebook" />

                </div>
            </div>
        </footer>
    );
};

export default Footer;