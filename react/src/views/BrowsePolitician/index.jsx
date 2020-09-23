import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import '../../../src/index.css'

function BrowsePolitician(){
    const history = useHistory();
    const { domainData } = useSelector((state) => state);

    const handleClick = {
        domain: (each) => {
            history.push(`/${each.route}`);
        },
    };
    return(
        <div className="main-content">
            <div className = "toolbar header">
                    <div className="logo-container">
                    
                    </div>
                    <nav>
                        {domainData.map((each) => (
                            <a className = "link" key={each.id} onClick={() => handleClick.domain(each)}>
                                {each.name}
                            </a>
                        ))}
                    </nav>
            </div>
            <div className="hero">
                <div className = "full-container">
                    <div className = "hero-title">
                        <h1 className="hero">Browse Politicians.</h1>
                    </div>
                    <div className = "total-search-segment">
                        <div className="context-text"> 
                            Search our extensive database for any politician.
                        </div>
                        <div className="search-box">
                            <input type="search" class="main-search" placeholder="Address" autocomplete="off"></input>
                            <button color="primary" class="search-button button primary" ><span >Search</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="cover-image-swoosh" class="white upper swoosh">
                <img aria-hidden="true" src={'/swoosh-tall.svg'} class="abs" />
            </div>
        </div>
    )
}

export default BrowsePolitician;