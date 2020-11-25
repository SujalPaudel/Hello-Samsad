import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios'
import '../../../src/index.css'

function Home() {
    const history = useHistory();
    const { domainData, itemsData } = useSelector((state) => state);
    const [lists, setlist] = useState([]);

    const [opaque, setOpaque] = useState('')

    const [searchOpen, setSearchOpen] = useState(true);

    const handleClick = {
        domain: (each) => {
            history.push(`/${each.route}`);
        },
    };

    let handleChange = (e) => {
        if (e.target.value.length > 0) {
            axios.get(`/api/search/location?q=${e.target.value}`)
                .then(res => setlist(res.data))
                .catch(err => console.log(err))
        } else {
            setlist([])
        }
    };

    const perPage = (each) => {
        history.push(`/location/${each._id}`);
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

    useEffect(() => {
        window.addEventListener("scroll", () => {
            let st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > 40) {
                setOpaque('opaque')
            } else {
                setOpaque('')
            }
        });
    })

    const [first, setFirst] = useState(0);

    const [margin, setMargin] = useState(0)

    return (
        <div className="main-container">
            <div className={`header toolbar ${opaque} ${scrollDir}`}>
                <div className="logo-container" onClick={() => history.push('/')}>
                    <img img src={"/main-logo.jpg"} alt="logo" />
                </div>
                <nav className="main-nav">
                    {domainData.map((each) => (
                        <a className="link" key={each.id} onClick={() => handleClick.domain(each)}>
                            {each.name}
                        </a>
                    ))}
                </nav>
                <button className="side-view-button" onClick={() => setSideView('visible')}>k</button>
            </div>
            <div className={`profile-menu ${sideView}`}>
                <div className="close-container">
                    <div className="close-button" onClick={() => setSideView('')}>
                        ×
                    </div>
                </div>
            </div>
            <div className="main-content" onClick={() => { setSearchOpen(false); setSideView('') }}>
                <div className="hero">
                    <div className="full-container">
                        <div className="hero-title">
                            <h1 className="hero">Know your politicians.</h1>
                        </div>
                        <div className="total-search-segment">
                            <div className="search-options">
                                <a className="search-option">My Representatives</a>
                                <a className="search-option">Search with Maps</a>
                            </div>
                            <div className="context-text">
                                Enter your address to find the politicians who represent you.
                            </div>
                            <div onClick={(e) => e.stopPropagation()} className="search-box">
                                <input type="search" class="main-search" placeholder="Address" autocomplete="off"
                                    onChange={handleChange} onClick={() => setSearchOpen(true)} />
                                <div className='search-rec-bg'>
                                    {searchOpen ? lists.map((each) => <li onClick={() => perPage(each)}>{each.name}, <div className="faint-recommend">
                                        {each.district[0].toUpperCase() + each.district.slice(1)}, Province {each.state}
                                    </div></li>): ""}
                                </div>
                            </div>

                            {/* <div className="search-box-button">
                                <button color="primary" class="search-button button primary" ><span >Search</span></button>
                            </div> */}
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
                                    <h2 className="headline-large">We Believe</h2>
                                    <p class="large">
                                        It should be easy to know if politicians are doing a good job and to hold them accountable if they aren't. Decide for yourself by browsing politician track records, finances, top priorities and more.
                                    </p>
                                </div>
                            </div>
                            <div className="image-container">
                                <img aria-hidden="true" id="swatch" src={"/swatch-yellow.png"} />
                                {/* <img aria-hidden="true" id="eagle" src={"/dal-bhat.jpg"} />
                                <img aria-hidden="true" id="pie" src={"/pie.png"} />
                                <img aria-hidden="true" id="button" src={"/button.png"} /> */}
                            </div>
                        </div>
                    </div>

                    <div className="features-section">
                        <div class="features-context">
                            <h2 class="headline">Here's how we help</h2>
                            <span class="large">
                                Browse our's tools, designed for modern day voters.
                            </span>
                        </div>
                        <div className="home-page-features">
                            <div className="home-page-feature">
                                {/* <div className="image-container">
                                    <img src={"/flag-hand.png"} alt="Dhaka Topi" className="" />
                                </div> */}
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
                                {/* <div className="image-container">
                                    <img src={"/flag-hand.png"} alt="Dhaka Topi" className="" />
                                </div> */}
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
                                {/* <div className="image-container">
                                    <img src={"/flag-hand.png"} alt="Dhaka Topi" className="" />
                                </div> */}
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
                    <div className="test-image">
                        <img aria-hidden="true" src={'/swoosh.svg'} />
                    </div>
                    <div className="featured-politicans-container">
                        <div className="featured-politician-title-container">
                            <h2 class="headline">Leading Politicians Of Nepal</h2>
                            <span class="large">
                                Browse through the politicians of Nepal.
                            </span>
                        </div>
                        <div className="container experience-container">
                            
                            <img src = {'/right.png'} style={{width: "20px", transform: "scaleX(-1)"}} onClick={() => margin < 0 ? setMargin(margin + 272) : ""}/>
                            <img src = {'/right.png'} style={{width: "20px"}} onClick={() => margin > -1000 ? setMargin(margin - 272) : ""}/>
                            <div className="featured-politician-card-container" style={{ marginLeft: margin + "px" }}>
                                <div className="slider-item-container">
                                    <div className="cover-image">
                                        <div className="swoosh">
                                            <svg version="1.1" viewBox="0 0 1039 186" xmlns="http://www.w3.org/2000/svg">
                                                <path className="card-swoosh" d="m1039 132.38v48.62c0 2.7615-2.2386 5-5 5h-1029c-2.7614 0-5-2.2385-5-5v-177.48c157.43-8.7984 332.77 10.371 526 57.509 205.44 50.116 373.52 71.45 513 71.347z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="image-container">
                                        <div className="image">
                                            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTTBn6bCmY4hkvOB5E0g1F04iQ0GGllHB966A&usqp=CAU'} alt="Avatar" className="real-image" />
                                        </div>

                                    </div>
                                    <div class="text-container">
                                        <h4><b>KP Sharma Oli</b></h4>
                                        <p>Prime Minister Of Nepal</p>
                                        {/* <div className="party-container">
                                            <span>REPUBLICAN</span>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="slider-item-container">
                                    <div className="cover-image">
                                        <div className="swoosh">
                                            <svg version="1.1" viewBox="0 0 1039 186" xmlns="http://www.w3.org/2000/svg">
                                                <path className="card-swoosh" d="m1039 132.38v48.62c0 2.7615-2.2386 5-5 5h-1029c-2.7614 0-5-2.2385-5-5v-177.48c157.43-8.7984 332.77 10.371 526 57.509 205.44 50.116 373.52 71.45 513 71.347z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="image-container">
                                        <div className="image">
                                            <img src={"/prachanda.jpg"} alt="Avatar" className="real-image" />
                                        </div>

                                    </div>
                                    <div class="text-container">
                                        <h4><b>Pushpa Kamal Dahal</b></h4>
                                        <p>Chair</p>
                                    </div>
                                </div>
                                <div className="slider-item-container">
                                    <div className="cover-image">
                                        <div className="swoosh">
                                            <svg version="1.1" viewBox="0 0 1039 186" xmlns="http://www.w3.org/2000/svg">
                                                <path className="card-swoosh" d="m1039 132.38v48.62c0 2.7615-2.2386 5-5 5h-1029c-2.7614 0-5-2.2385-5-5v-177.48c157.43-8.7984 332.77 10.371 526 57.509 205.44 50.116 373.52 71.45 513 71.347z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="image-container">
                                        <div className="image">
                                            <img src={"/sher_bdr.jpg"} alt="Avatar" className="real-image" />
                                        </div>

                                    </div>
                                    <div class="text-container">
                                        <h4><b>Sher Bdr Deuba</b></h4>
                                        <p>Leader Of Opposition</p>
                                    </div>
                                </div>
                                <div className="slider-item-container" onClick={() => history.push('/politician/1')}>
                                    <div className="cover-image">
                                        <div className="swoosh">
                                            <svg version="1.1" viewBox="0 0 1039 186" xmlns="http://www.w3.org/2000/svg">
                                                <path className="card-swoosh" d="m1039 132.38v48.62c0 2.7615-2.2386 5-5 5h-1029c-2.7614 0-5-2.2385-5-5v-177.48c157.43-8.7984 332.77 10.371 526 57.509 205.44 50.116 373.52 71.45 513 71.347z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="image-container">
                                        <div className="image">
                                            <img src={"/yadav.jpeg"} alt="Avatar" className="real-image" />
                                        </div>

                                    </div>
                                    <div class="text-container">
                                        <h4><b>Matrika Pd Yadav</b></h4>
                                        <p>Ministry Of Industry</p>
                                    </div>
                                </div>
                                <div className="slider-item-container">
                                    <div className="cover-image">
                                        <div className="swoosh">
                                            <svg version="1.1" viewBox="0 0 1039 186" xmlns="http://www.w3.org/2000/svg">
                                                <path className="card-swoosh" d="m1039 132.38v48.62c0 2.7615-2.2386 5-5 5h-1029c-2.7614 0-5-2.2385-5-5v-177.48c157.43-8.7984 332.77 10.371 526 57.509 205.44 50.116 373.52 71.45 513 71.347z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="image-container">
                                        <div className="image">
                                            <img src={"/kam_thapa.jpg"} alt="Avatar" className="real-image" />
                                        </div>

                                    </div>
                                    <div class="text-container">
                                        <h4><b>Kamal Thapa</b></h4>
                                        <p>Rastriya Prajatantra Party</p>
                                    </div>
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
                                Our Blog
                        </h2>
                        </div>

                        <div className="blog-row row">
                            <div className="blog-post-card-container">
                                <a href="https://medium.com" className="blog-post-card">
                                    <img src="https://cdn-images-1.medium.com/max/350/0*GZtLnMihPDVAzwCr" className="medium-img" />
                                    <div className="blog-card-content">
                                        <span className="post-title">
                                            Nine Lesser-Known Elected Offices That Influence Social Systems
                                    </span>
                                    </div>
                                </a>
                            </div>
                            <div className="blog-post-card-container">
                                <a href="https://medium.com" className="blog-post-card">
                                    <img src="https://cdn-images-1.medium.com/max/350/0*GZtLnMihPDVAzwCr" className="medium-img" />
                                    <div className="blog-card-content">
                                        <span className="post-title">
                                            Nine Lesser-Known Elected Offices That Influence Social Systems
                                    </span>
                                    </div>
                                </a>
                            </div>
                            <div className="blog-post-card-container">
                                <a href="https://medium.com" className="blog-post-card">
                                    <img src="https://cdn-images-1.medium.com/max/350/0*GZtLnMihPDVAzwCr" className="medium-img" />
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
                    <img src={'/swoosh-tall.svg'} aria-hidden="true" className="flip-y" />
                </div>
                <div className="coming-soon">
                    <img alt="Nepali Flag" src={"/flag.png"} className="flag-image" />
                    <h2 className="headline-large email-section"> Politics, Personalized. </h2>
                    <p className="email-description">
                        Coming Soon – Compare politicians and get personalized voting recommendations based on issues that matter most to you.
                    </p>
                </div>
            </div>

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

            </div>
        </div>
    )
}

export default Home;
