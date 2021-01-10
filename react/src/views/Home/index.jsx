import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';
import '../../../src/index.css';
import Footer from '../../components/utils/Footer';

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

    const [margin, setMargin] = useState(0);

    const landing_array = [{ id: "5f566064c618f4d4faf8aa70", name: "KP Sharma Oli", position: "Prime Minister Of Nepal", img: "https://i.postimg.cc/MTxBSrnh/oli.jpg", color: "rgb(219, 108, 108), rgb(179, 58, 58)" },
    { id: "5f56627064b765daf26dc0b6", name: "Pushpa Kamal Dahal", position: "Chairman, Nepal Communist Party", img: "https://i.postimg.cc/RCJWYBpN/prachanda.jpg", color: "rgb(219, 108, 108), rgb(179, 58, 58)" },
    { id: "5f579dc91f21ba9af0502f68", name: "Sher Bahadur Deuba", position: "President of Nepali Congress Party", img: "https://i.postimg.cc/bYnvTRdn/sher-bdr.jpg", color: "rgb(136, 159, 133), rgb(59, 102, 57)"},
    { id: "5f8fabf2d42a6e69601b4a4f", name: "Matrika Prasad Yadav", position: "Ministry Of Industry, Commerce and Supplies", img: "https://i.postimg.cc/mZ7bM26N/yadav.jpg", color: "rgb(219, 108, 108), rgb(179, 58, 58)" },
    { id: "5ff2994df7622666e57d0a1f", name: "Rabindra Mishra", position: "Co-Ordinator of Sajha Party", img: "https://i.postimg.cc/k40gC2YD/rav-mishra.jpg", color: "rgb(71, 94, 228), rgb(28, 45, 146)" },
    { id: "5fa6b1fab6b938cdfce32fae", name: "UmaShankar Argariya", position: "Member of Parliament (MP)", img: "https://i.postimg.cc/qM3KJGSy/umashankar.png", color: "rgb(255, 2, 8), rgb(0, 152, 37)" },
    ]

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
                                <a className="search-option" onClick={() => history.push(`/search-filters`)}>Use Filters</a>
                                <a className="search-option" onClick={() => history.push(`/map-search`)}>Search with Maps</a>
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
                                    </div></li>) : ""}
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
                                <img aria-hidden="true" id="flower" src={"/flower.png"} />
                                <img aria-hidden="true" id="dal-bhat" src={"/dal-bhat.png"} />
                                <img aria-hidden="true" id="topi" src={"/topi.png"} />
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
                                <div className="image-container">
                                    <img src={"/representative.png"} alt="Dhaka Topi"/>
                                </div>
                                <h2 className="headline">
                                    Your Representatives
                                </h2>
                                <p>
                                    Find the information about your local and country representatives with ease.
                                </p>
                            </div>
                            <div className="home-page-feature">
                                <div className="image-container">
                                    <img src={"/beaureacrats.png"} alt="Dhaka Topi"/>
                                </div>
                                <h2 className="headline">
                                    Top Beaureacrats
                            </h2>
                                <p>
                                    Find information about beaureacrats who make important decisions for your country.
                            </p>
                            </div>
                            <div className="home-page-feature">
                                <div className="image-container">
                                    <img src={"/search.png"} alt="Dhaka Topi"/>
                                </div>
                                <h2 className="headline">
                                    Filtered Searches
                            </h2>
                                <p>
                                    Use filtered search techniques to get niche information about the representatives of country.
                            </p>
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
                            <img src={'/right.png'} style={{ width: "20px", transform: "scaleX(-1)" }} onClick={() => margin < 0 ? setMargin(margin + 272) : ""} className="arrowHand" />
                            <img src={'/right.png'} style={{ width: "20px" }} onClick={() => margin > -1000 ? setMargin(margin - 272) : ""} className="arrowHand" />
                            <div className="featured-politician-card-container" style={{ marginLeft: margin + "px" }}>
                                {landing_array.map((each) => (
                                    <div className="slider-item-container" onClick={() => history.push(`politician/${each.id}`)}>
                                        <div className="cover-image" style={{
						                    backgroundImage: `linear-gradient(to right bottom, ${each.color})`}}>
                                            <div className="swoosh">
                                                <svg version="1.1" viewBox="0 0 1039 186" xmlns="http://www.w3.org/2000/svg">
                                                    <path className="card-swoosh" d="m1039 132.38v48.62c0 2.7615-2.2386 5-5 5h-1029c-2.7614 0-5-2.2385-5-5v-177.48c157.43-8.7984 332.77 10.371 526 57.509 205.44 50.116 373.52 71.45 513 71.347z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="image-container">
                                            <div className="image">
                                                <img src={each.img} loading="lazy" alt="Avatar" className="real-image" />
                                            </div>

                                        </div>
                                        <div class="text-container">
                                            <h4><b>{each.name}</b></h4>
                                            <p>{each.position}</p>
                                            {/* <div className="party-container">
                                            <span>REPUBLICAN</span>
                                        </div> */}
                                        </div>
                                    </div>))}
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
                    <img alt="Nepali Flag" src={"/nepali-flag.png"} className="flag-image" />
                    <h2 className="headline-large email-section"> Politics, Personalized. </h2>
                    <p className="email-description">
                        Coming Soon – Compare politicians and get personalized voting recommendations based on issues that matter most to you.
                    </p>
                </div>
            </div>
            {Footer()}
        </div>
    )
}

export default Home;
