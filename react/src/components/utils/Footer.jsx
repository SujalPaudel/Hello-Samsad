import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useHistory } from "react-router-dom";

function Footer(){
    const history = useHistory();
    return (
        <div>
            <div className="footer even-row">
                <a onClick={() => history.push('/')}>
                    Home
        </a>
                <a onClick={() => history.push('/')}>
                    Reps
        </a>
                <a onClick={() => history.push('/')}>
                    Browse
        </a>
                <a onClick={() => history.push('/')}>
                    Home
        </a>
            </div>

            <div className="footer-all">
                <div className="logo-container">
                    <img src={"/main-logo.jpg"} alt="logo" className="footer-logo" />
                </div>
                <div className="footer-center-links">
                    <a onClick={() => history.push('/')}>Report Problem</a>
                    <a onClick={() => history.push('/')}>About Us</a>
                    <a onClick={() => history.push('/')}>Terms & Conditions</a>
                </div>
                <div className="footer-center-links">
                    <div className="social-links">
                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faTwitter} />
                        <FontAwesomeIcon icon={faInstagram} />
                    </div>
                    <a onClick={() => history.push('/')}>For Politicians</a>
                    <a onClick={() => history.push('/')}>Settings</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;