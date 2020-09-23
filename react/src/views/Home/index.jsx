import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios'
import scroll from './scroll_test';
import '../../../src/index.css'


import DisplayItems from "../../components/DisplayItems";

function Home() {
    const history = useHistory();
    const { domainData, itemsData } = useSelector((state) => state);
    const [lists, setlist] = useState([]);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [bodyOffset, setBodyOffset] = useState(
        document.body.getBoundingClientRect()
      );
    const [toolBarClass, setToolBarClass] = useState('')

    const handleClick = {
        domain: (each) => {
            history.push(`/${each.route}`);
        },
    };

    let handleChange = (e) => {
        if(e.target.value.length>0){
            axios.get(`/api/search?q=${e.target.value}`)
            .then(res => setlist(res.data))
            .catch(err => console.log(err))
        }else{
            setlist([])
        }
    };

    const perPage = (each) => {
        history.push(`/item/${each._id}`);
    }

    useEffect(()=> {
        window.addEventListener('scroll', ()=>{
            let isTop = window.scrollY < 40
            if(!isTop){
                setToolBarClass('opaque')
            }else{
                setToolBarClass('')
            }
        })
    })
    

    return (
        <div className={`main-container ${toolBarClass}`}>
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
            <div className="main-content">
            <div className="hero">
                <div className = "full-container">
                    <div className = "hero-title">
                        <h1 className="hero">Know your politicians.</h1>
                    </div>
                    <div className = "total-search-segment">
                        <div className="search-options">
                            <a className="search-option">My Representatives</a>
                            <a className="search-option">Search with Maps</a>
                        </div>
                        <div className="context-text"> 
                            Enter your address to find the politicians who represent you. 
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
            <div className="full-container">
                <div className="mission-section">
                    <div className="two-items-flex">
                        <div class="mission-container">
                            <div className="mission-statement">
                                <h2 className="headline-large">At Voterly, We Believe</h2>
                                    <p class="large">
                                        It should be easy to know if politicians are doing a good job and to hold them accountable if they aren't. Decide for yourself by browsing politician track records, finances, top priorities and more.
                                    </p>
                            </div>
                        </div>
                        <div className="image-container">
                            <img aria-hidden="true" id="swatch" src={"/swatch-yellow.png"} />
                            <img aria-hidden="true" id="eagle" src={"/eagle.png"} />
                            <img aria-hidden="true" id="pie" src={"/pie.png"} />
                            <img aria-hidden="true" id="button" src={"/button.png"} />
                        </div>
                    </div>
                </div>

                <div className="features-section">
                    <div  class="features-context">
                        <h2  class="headline">Here's how we help</h2>
                            <span  class="large"> 
                                Browse Voterly’s tools, designed for modern day voters. 
                            </span>
                    </div>
                    <div className="home-page-features">
                        <div className="home-page-feature">
                            <div className="image-container">
                                <img src={"/flag-hand.png"} alt="Dhaka Topi" className=""/>
                            </div>
                            <h2 className="headline">
                                Registration Monitor
                            </h2>
                            <p>
                                Check if you're currently registered to vote and get notified if anything changes. 
                            </p>
                            <span className="feature-spacer"></span>
                            <div className="btn-container">
                                <a className="medium primary button">
                                    Sign Up
                                </a>
                            </div>
                        </div>
                        <div className="home-page-feature">
                            <div className="image-container">
                                <img src={"/flag-hand.png"} alt="Dhaka Topi" className=""/>
                            </div>
                            <h2 className="headline">
                                Registration Monitor
                            </h2>
                            <p>
                                Check if you're currently registered to vote and get notified if anything changes. 
                            </p>
                            <span className="feature-spacer"></span>
                            <div className="btn-container">
                                <a className="medium primary button">
                                    Sign Up
                                </a>
                            </div>
                        </div>
                        <div className="home-page-feature">
                            <div className="image-container">
                                <img src={"/flag-hand.png"} alt="Dhaka Topi" className=""/>
                            </div>
                            <h2 className="headline">
                                Registration Monitor
                            </h2>
                            <p>
                                Check if you're currently registered to vote and get notified if anything changes. 
                            </p>
                            <span className="feature-spacer"></span>
                            <div className="btn-container">
                                <a className="medium primary button">
                                    Sign Up
                                </a>
                            </div>
                        </div>
                    </div>

                    

                </div>
            </div>
            <div className="spacer">
            </div>

            <div className="featured-politician-section">
                <div className = "test-image">
                    <img aria-hidden="true" src={'/swoosh.svg'}/>
                </div>
                <div className="featured-politicans-container">
                    <div className="featured-politician-title-container">
                        <h2  class="headline">Leading Politicians Of Nepal</h2>
                        <span class="large"> 
                            Browse Voterly’s tools, designed for modern day voters. 
                        </span>
                        <div className="btn-container">
                            <a className="medium primary button">
                                View All
                            </a>
                        </div> 
                    </div>
                    <div className="featured-politician-card-container">
                        <div className="slider-item-container">
                            <div className="cover-image">
                                <div className="swoosh">
                                    <svg version="1.1" viewBox="0 0 1039 186" xmlns="http://www.w3.org/2000/svg">
                                        <path className = "card-swoosh" d="m1039 132.38v48.62c0 2.7615-2.2386 5-5 5h-1029c-2.7614 0-5-2.2385-5-5v-177.48c157.43-8.7984 332.77 10.371 526 57.509 205.44 50.116 373.52 71.45 513 71.347z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="image-container">
                                <div className="image">
                                    <img src={"https://files.voterly.com/psn/ef59f8ad9b86e0bff05354d38291b7ab/200x250/donald-trump.jpeg"} alt="Avatar" className="real-image" />
                                </div>
                                
                            </div>
                            <div class="text-container">
                                <h4><b>John Doe</b></h4>
                                <p>Architect and Engineer</p>
                                <div className="party-container">
                                    <span>REPUBLICAN</span>
                                </div>
                            </div>
                        </div>
                        <div className="slider-item-container">
                            <div className="cover-image">
                                <div className="swoosh">
                                    <svg version="1.1" viewBox="0 0 1039 186" xmlns="http://www.w3.org/2000/svg">
                                        <path className = "card-swoosh" d="m1039 132.38v48.62c0 2.7615-2.2386 5-5 5h-1029c-2.7614 0-5-2.2385-5-5v-177.48c157.43-8.7984 332.77 10.371 526 57.509 205.44 50.116 373.52 71.45 513 71.347z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="image-container">
                                <div className="image">
                                    <img src={"https://files.voterly.com/psn/ef59f8ad9b86e0bff05354d38291b7ab/200x250/donald-trump.jpeg"} alt="Avatar" className="real-image" />
                                </div>
                                
                            </div>
                            <div class="text-container">
                                <h4><b>John Doe</b></h4>
                                <p>Architect and Engineer</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="swoosh-img-flip">
                    <img aria-hidden="true" src={"/swoosh.svg"} />
                </div>
            </div>
            <div className="spacer">
            </div>

            {/* Blog Section */}

            <div className="full-container">
                <div className="blog-section">
                    <div className="blog-header">
                        <h2 className="headline">
                            Voterly Blog
                        </h2>
                    </div>
                    
                    <div className="blog-row row">
                        <div className="blog-post-card-container">
                            <a href="https://medium.com" className="blog-post-card">
                                <img src="https://cdn-images-1.medium.com/max/350/0*GZtLnMihPDVAzwCr" className="medium-img"/>
                                <div className="blog-card-content">
                                    <span className="post-title">
                                        Nine Lesser-Known Elected Offices That Influence Social Systems
                                    </span>
                                </div>
                            </a>
                        </div>
                        <div className="blog-post-card-container">
                            <a href="https://medium.com" className="blog-post-card">
                                <img src="https://cdn-images-1.medium.com/max/350/0*GZtLnMihPDVAzwCr" className="medium-img"/>
                                <div className="blog-card-content">
                                    <span className="post-title">
                                        Nine Lesser-Known Elected Offices That Influence Social Systems
                                    </span>
                                </div>
                            </a>
                        </div>
                        <div className="blog-post-card-container">
                            <a href="https://medium.com" className="blog-post-card">
                                <img src="https://cdn-images-1.medium.com/max/350/0*GZtLnMihPDVAzwCr" className="medium-img"/>
                                <div className="blog-card-content">
                                    <span className="post-title">
                                        Nine Lesser-Known Elected Offices That Influence Social Systems
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="blog-view-more-container">
                        <a target="_blank" rel="noopener" className="medium button outline primary" href="https://medium.com/voterly">View All Articles</a>
                    </div>
                </div>
            </div>
            <div className="swoosh-3">
                <img src={'/swoosh-tall.svg'} aria-hidden="true" className="flip-y"/>
            </div>
            <div className="coming-soon">
                <img alt="Nepali Flag" src={"/flag.png"} className="flag-image" />
                <h2 className="headline-large email-section"> Politics, Personalized. </h2>
                <p className="email-description"> 
                    Coming Soon – Compare politicians and get personalized voting recommendations based on issues that matter most to you.
                </p>
            </div>
            </div>
        </div>
    )
}

export default Home;
