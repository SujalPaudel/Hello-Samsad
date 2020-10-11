import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios'
import '../../../src/index.css'

function FindRepresentative() {
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
        <div className={`main-container opaque`}>
            <div className = "toolbar header">
                    <div className="logo-container" onClick={()=>history.push('/')}>
                        <img img src={"/main-logo.jpg"} alt="logo"/>
                    </div>
                    <nav>
                        {domainData.map((each) => (
                            <a className = "link" key={each.id} onClick={() => handleClick.domain(each)}>
                                {each.name}
                            </a>
                        ))}
                    </nav>
            </div>
            <div className="main-content reps">
                    <div className = "full-container">
                        <div className = "hero-title">
                            <h1 className="hero">Find My Representatives.</h1>
                        </div>
                        <div className = "total-search-segment">
                            <div className="context-text"> 
                                Enter your address below and see who represents you:
                            </div>
                            <div className="search-box">
                                <input type="search" class="main-search" placeholder="Enter Name" autocomplete="off"></input>
                                <button color="primary" class="search-button button primary" ><span >Search</span></button>
                            </div>
                        </div>
                    <div className="reps-bg">
                        <div className="reps-graphics">
                            <img aria-hidden="true" src={"/blue-blob-dot.png"} className="blue-blob"/>
                            <img aria-hidden="true" src={"/yellow-blob-dot.png"} className="yellow-blob"/>
                            <img aria-hidden="true" src={"/statue-of-liberty.png"} className="image-blob"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-all">
                
            </div>
        </div>
    )
}

export default FindRepresentative;