import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios'
import '../../../src/index.css'

function SearchFilter() {
    const history = useHistory();
    const { domainData } = useSelector((state) => state);
    const [result, setResult] = useState([]);

    const searchQuery = () => {
        let baseRoute = 'api/people/custom?'
        let searchItem = document.getElementById('search').value
        let ageRange = document.getElementById('ageRange').value
        let gender = document.getElementById('gender').value
        let state = document.getElementById('state').value

        if (searchItem) {
            baseRoute += `name=${searchItem}`
        }
        if (ageRange != 'null') {
            baseRoute += `&age=${ageRange}`
        }
        if (gender != 'null') {
            baseRoute += `&gender=${gender}`
        }
        if (state != 'null') {
            baseRoute += `&state=${state}`
        }

        axios.get(baseRoute)
            .then(res => setResult(res.data))
            .catch(err => console.log(err))
    }

    const handleClick = {
        domain: (each) => {
            history.push(`/${each.route}`);
        },
    };

    const [sideView, setSideView] = useState('');

    const [scrollDir, setScrollDir] = useState("scroll-up");

    const [toolBarClass, setToolBarClass] = useState('')

    const [opaque, setOpaque] = useState('')

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
            <div className={`header toolbar ${opaque} ${scrollDir} reps-head`}>
                <div className="logo-container" onClick={()=>history.push('/')}>
                    <img src={"/main-logo.jpg"} alt="logo"/>
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

            <div className="main-content reps">
                <div className="full-container">
                    <div className="hero-title filters">
                        <h1 className="hero">Search With Filters.</h1>
                    </div>
                    <div className="total-search-segment">
                        <div className="context-text">
                            Who are you looking for?
                            </div>
                        <div className="search-box-filter">
                            <div className="filter-input">
                                <input type="search" class="main-search" placeholder="Enter Name" autocomplete="off" id="search" />
                            </div>
                            <div className="filter-input">
                                <label for="Age">Age:</label>
                                <select name="ageRange" id="ageRange">
                                    <option value="null">Any</option>
                                    <option value="first">20-30</option>
                                    <option value="second">30-40</option>
                                    <option value="third">40-50</option>
                                    <option value="fourth">50-60</option>
                                    <option value="fifth">60-70</option>
                                    <option value="sixth">70-80</option>
                                    <option value="seventh">80+</option>
                                </select>
                            </div>
                            <div className="filter-input">
                                <label for="Gender">Gender:</label>
                                <select name="gender" id="gender">
                                    <option value="null">Any</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="filter-input">
                                <label for="State">State:</label>
                                <select name="state" id="state">
                                    <option value="null">Any</option>
                                    <option value="province1">Province1</option>
                                    <option value="province2">Province2</option>
                                    <option value="province3">Province3</option>
                                    <option value="province4">Province4</option>
                                    <option value="province5">Province5</option>
                                    <option value="province6">Province6</option>
                                    <option value="province7">Province7</option>
                                </select>
                            </div>
                            <button onClick={() => searchQuery()} color="primary" class="filter-button" ><span >Go</span></button>
                            {result.map((one) => <li>{one.name} - {one.age} -{one.gender}</li>)}
                        </div>
                    </div>
                        <div className="filter-graphics">
                            <img aria-hidden="true" src={"/backgrnd-cool.png"}  />
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

        </div>
    )
}

export default SearchFilter;
