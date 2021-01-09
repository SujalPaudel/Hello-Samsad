import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { onePoliticianData } from "../../actions/listPoliticianAction";
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../../../src/index.css';
import Footer from '../../components/utils/Footer';

function PoliticianPage() {
    const { id } = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(onePoliticianData("POPULATE_POLITICIAN", id))
    }, [])

    const history = useHistory();
    const { domainData } = useSelector((state) => state);

    const { onePoliticianDataR } = useSelector((state) => state);

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

    const [margin, setMargin] = useState(0)

    const [marginExp, setMarginExp] = useState(0)

    const [marginNews, setMarginNews] = useState(0)

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
                <div className="hero hero-colored" style={{ backgroundColor: `${onePoliticianDataR.color_code}` }}>
                    <div className="container">
                        <div class="image-container">
                            <div class="image"><img src={onePoliticianDataR.img} alt="Avatar" class="real-image" /></div>
                        </div>
                    </div>
                </div>
                <div id="cover-image-swoosh" class="white upper swoosh">
                    <img aria-hidden="true" src={'/swoosh-tall.svg'} class="abs" />
                </div>
                <div className="container">
                    <div className="poli-header">
                        <h1 className="profile-headline">
                            {onePoliticianDataR.name}
                        </h1>
                    </div>
                    <div className="extra-info">
                        <h2 className="profile-sub-headline">
                            {onePoliticianDataR.designation}
                        </h2>
                        <span className="profile-small">
                            {onePoliticianDataR.address}, Nepal
                        </span>
                    </div>

                    <div className="party-info">
                        <img src={onePoliticianDataR.party_img} />
                    </div>
                </div>
                <div className="container">
                    <div className="three-flex">
                        <div className="stat-card">
                            <span className="value">
                                {onePoliticianDataR.age}
                            </span>
                            <span className="sub-text">Years</span>
                        </div>
                        <div className="stat-card">
                            <span className="value">
                                {onePoliticianDataR.residence}
                            </span>
                            <span className="sub-text">Residence State</span>
                        </div>
                    </div>

                    <div className="poli-summary">
                        <p>
                            {onePoliticianDataR.description}
                        </p>
                    </div>
                </div>

                <div className="container education-container">
                    <div className="header-scroll-bar">
                        <div className="small-title">
                            <h3>Education</h3>
                        </div>
                        <div className="pointers">
                            <img src={'/right.png'} style={{ width: "20px", transform: "scaleX(-1)" }} onClick={() => margin > -(((onePoliticianDataR.education).length) * 272) ? setMargin(margin - 272) : ""} className="arrowHand" />
                            <img src={'/right.png'} style={{ width: "20px" }} onClick={() => margin < 0 ? setMargin(margin + 272) : ""} className="arrowHand" />
                        </div>
                    </div>
                    <div className="featured-politician-card-container" style={{ marginLeft: margin + "px" }}>
                        {onePoliticianDataR.education ? onePoliticianDataR.education.map((eleme) =>
                            <div className="slider-item-container portfolio-card">
                                <div class="text-container">
                                    <h4><b>{eleme.degree}</b></h4>
                                    <span>{eleme.institution}</span>
                                </div>
                            </div>
                        ):""}
                    </div>
                </div>

                <div className="container experience-container">
                    <div className="header-scroll-bar">
                        <div className="small-title">
                            <h3>Political History</h3>
                        </div>
                        <div className="pointers">
                            <img src={'/right.png'} style={{ width: "20px", transform: "scaleX(-1)" }} onClick={() => marginExp > -(((onePoliticianDataR.politicalHistory).length) * 272) ? setMarginExp(marginExp - 272) : ""} className="arrowHand" />
                            <img src={'/right.png'} style={{ width: "20px" }} onClick={() => marginExp < 0 ? setMarginExp(marginExp + 272) : ""} className="arrowHand" />
                        </div>
                    </div>
                    <div className="featured-politician-card-container" style={{ marginLeft: marginExp + "px" }}>
                        {onePoliticianDataR.politicalHistory ? onePoliticianDataR.politicalHistory.map((eleme) =>
                            <div className="slider-item-container portfolio-card">
                                <div class="text-container">
                                    <div>
                                        <h4><b>{eleme.party}</b></h4>
                                        <p>{eleme.date}</p>
                                    </div>
                                </div>
                            </div>
                        ) : ""}
                    </div>
                </div>

                <div className="container experience-container">
                    <div className="header-scroll-bar">
                        <div className="small-title">
                            <h3>Major News</h3>
                        </div>
                        <div className="pointers">
                            <img src={'/right.png'} style={{ width: "20px", transform: "scaleX(-1)" }} onClick={() => marginNews > -(((onePoliticianDataR.majorNews).length) * 272) ? setMarginNews(marginNews - 272) : ""} className="arrowHand" />
                            <img src={'/right.png'} style={{ width: "20px" }} onClick={() => marginNews < 0 ? setMarginNews(marginNews + 272) : ""} className="arrowHand" />
                        </div>
                    </div>
                    <div className="featured-politician-card-container" style={{ marginLeft: marginNews + "px" }}>
                        {onePoliticianDataR.majorNews ? onePoliticianDataR.majorNews.map((eleme)=>
                        <a href={`${eleme.link}`} className="news-link" target="_blank">
                            <div className="slider-item-container portfolio-card">
                                <div class="text-container">
                                    <h4><b>{eleme.title.substring(0, 38)}...</b></h4>
                                    <p>Src: {eleme.source}</p>
                                </div>
                            </div>
                        </a>) : ""}
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
            {Footer()}
        </div>
    )
}

export default PoliticianPage;
