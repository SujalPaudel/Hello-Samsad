import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import OneItem from '../../views/OneItem'
import axios from 'axios'


import DisplayItems from "../../components/DisplayItems";

function Home() {
    const history = useHistory();
    const { domainData, itemsData } = useSelector((state) => state);
    const [lists, setlist] = useState([]);
    const [oneData, setOneData] = useState([]);

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

    return (
        <div>
            {domainData.map((each) => (
                <button key={each.id} onClick={() => handleClick.domain(each)}>
                    {each.name}
                </button>
            ))}
            <hr />
            <input type="text" placeholder="Search.." onChange={handleChange}></input>
            <button>+</button>
            {lists.map((each)=><li onClick={()=> perPage(each)}>{each.name}{each.age}</li>)}
        </div>

    )
}

export default Home;
