import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios'
import '../../../src/index.css'

function Home() {
    const history = useHistory();
    const { domainData, itemsData } = useSelector((state) => state);
    const [lists, setlist] = useState([]);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [bodyOffset, setBodyOffset] = useState(
        document.body.getBoundingClientRect()
      );
    const [toolBarClass, setToolBarClass] = useState('')

    const [opaque, setOpaque] = useState('')


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

    const [sideView, setSideView] = useState('');

    const [scrollDir, setScrollDir] = useState("scroll-up");

    useEffect(() => {
        const threshold = 0;
        let lastScrollY = window.pageYOffset;
        let ticking = false;
    
        const updateScrollDir = () => {
            const scrollY = window.pageYOffset;
    
            if (Math.abs(scrollY - lastScrollY) < threshold) {
            ticking = false;
            return;
            }
            setScrollDir(scrollY > lastScrollY ? "scroll-down" : "scroll-up");
            lastScrollY = scrollY > 0 ? scrollY : 0;
            ticking = false;
        };
    
        const onScroll = () => {
            if (!ticking) {
            window.requestAnimationFrame(updateScrollDir);
            ticking = true;
            }
        };
    
        window.addEventListener("scroll", onScroll);
    
        return () => window.removeEventListener("scroll", onScroll);
        }, []);
    
        useEffect(()=> {
            window.addEventListener("scroll", ()=> {
                let st = window.pageYOffset || document.documentElement.scrollTop;
                if(st>40){
                    setOpaque('opaque')
                }else {
                    setOpaque('')
                }
            });
        }) 
    

    return (
        <div className={`main-container ${toolBarClass}`}>
            <div className={`header toolbar ${opaque} ${scrollDir}`}>
                <div className="logo-container" onClick={()=>history.push('/')}>
                    <img img src={"/main-logo.jpg"} alt="logo"/>
                </div>
                <nav className="main-nav">
                    {domainData.map((each) => (
                        <a className = "link" key={each.id} onClick={() => handleClick.domain(each)}>
                            {each.name}
                        </a>
                    ))}
                </nav>
                <button className="side-view-button" onClick={()=>setSideView('visible')}>k</button>
            </div>
            <div className={`profile-menu ${sideView}`}>
                <div className="close-container">
                    <div className="close-button" onClick={()=>setSideView('')}>
                        ×
                    </div>
                </div>
            </div>
            <div className="main-content" onClick={()=>setSideView('')}>
            <div className="hero">
                <div className = "full-container">
                    <div className = "hero-title">
                        <h1 className="hero browse">Browse politicians.</h1>
                    </div>
                    <div className = "total-search-segment">
                        <div className="context-text"> 
                            Search our extensive database for any politician.
                        </div>
                        <div className="search-box">
                            <input type="search" class="main-search" placeholder="Address" autocomplete="off"></input>
                        </div>
                        <div className="search-box-button">
                            <button color="primary" class="search-button button primary" ><span >Search</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="cover-image-swoosh" class="white upper swoosh">
                <img aria-hidden="true" src={'/swoosh-tall.svg'} class="abs" />
            </div>
            
            <div className="spacer">
            </div>

        
            <div className="featured-politician-card-container browse">
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

            <div className="footer even-row">
                <a onClick={()=>history.push('/')}>
                    Home
                </a>
                <a onClick={()=>history.push('/')}>
                    Reps
                </a>
                <a onClick={()=>history.push('/')}>
                    Browse
                </a>
                <a onClick={()=>history.push('/')}>
                    Home
                </a>
            </div>
            <div className="footer-all">
                
            </div>
        </div>
    )
}

export default Home;
