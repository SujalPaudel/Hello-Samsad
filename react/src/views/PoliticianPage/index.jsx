import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios'
import '../../../src/index.css'

function PoliticianPage() {
    const history = useHistory();
    const { domainData, itemsData } = useSelector((state) => state);
    const [lists, setlist] = useState([]);

    const [toolBarClass, setToolBarClass] = useState('')

    const [opaque, setOpaque] = useState('')

    const handleClick = {
        domain: (each) => {
            history.push(`/${each.route}`);
        },
    };

    let handleChange = (e) => {
        if (e.target.value.length > 0) {
            axios.get(`/api/search?q=${e.target.value}`)
                .then(res => setlist(res.data))
                .catch(err => console.log(err))
        } else {
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
        <div className={`main-container ${toolBarClass}`}>
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
            <div className="main-content" onClick={() => setSideView('')}>
                <div className="hero hero-colored" style={{ backgroundColor: "red" }}>
                    <div className="container">
                        <div class="image-container">
                            <div class="image"><img src="https://files.voterly.com/psn/ef59f8ad9b86e0bff05354d38291b7ab/200x250/donald-trump.jpeg" alt="Avatar" class="real-image" /></div>
                        </div>
                    </div>
                </div>
                <div id="cover-image-swoosh" class="white upper swoosh">
                    <img aria-hidden="true" src={'/swoosh-tall.svg'} class="abs" />
                </div>
                <div className="container">
                    <div className="poli-header">
                        <h1 className="profile-headline">
                            Barack Obama
                        </h1>
                    </div>
                    <div className="extra-info">
                        <h2 className="profile-sub-headline">
                            44th president of the United States
                        </h2>
                        <span className="profile-small">
                            Chicago, Illinois
                        </span>
                    </div>

                    <div className="party-info">
                        <img src={'/party-image.png'} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PoliticianPage;