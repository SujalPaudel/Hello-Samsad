import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { oneLocationData } from "../../actions/listLocationAction";
import axios from 'axios'
import '../../../src/index.css'

function OneLocation() {
    const { id } = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(oneLocationData("POPULATE_LOCATION", id))
    }, [])

    const history = useHistory();

    const [one, setOne] = useState([])

    const [opaque, setOpaque] = useState('')

    const [sideView, setSideView] = useState('');

    const [scrollDir, setScrollDir] = useState("scroll-up");

    const { domainData } = useSelector((state) => state);

    const { oneLocationDataR } = useSelector((state) => state);

    const handleClick = {
        domain: (each) => {
            history.push(`/${each.route}`);
        },
    };

    useEffect(() => {
        axios.get(`/api/location/${id}`)
        .then(res=>setOne(res.data))
        .catch(err=>console.log(err))
    },[]);

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

    useEffect(() => {
        if(one){
            console.log(one)
        }
    })


    if (one.length===0) {
        return <></>;
    }

    return (
        <div className="main-container">
            <div className={`header toolbar toolbar-location ${opaque} ${scrollDir}`}>
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
            <div className="main-content">
                    <div className="full-container">
                            <h1 className="sub-header">Your Representatives</h1>
                </div>
                <div className="container experience-container">
                            <div className="featured-politician-card-container-one-rep" onClick={()=>one?history.push(`/politician/${one.repId}`):""}>
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
                                        <h4><b>{one ? one.representative[0]:""}</b></h4>
                                        <p>Local Representative</p>
                                    </div>
                                </div>
                                </div>
                        </div>
            </div>
        </div>
    );
}

export default OneLocation;