import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios'


import DisplayItems from "../../components/DisplayItems";

function Home() {
    const history = useHistory();
    const { domainData, itemsData } = useSelector((state) => state);
    const [lists, setlist] = useState([]);

    const handleClick = {
        domain: (each) => {
            history.push(`/${each.route}`);
        },
    };

    let handleChange = (e) => {
        if(e.target.value.length>0){
            axios.get(`/search?q=${e.target.value}`)
            .then(res => setlist(res.data))
            .catch(err => console.log(err))
        }else{
            setlist([])
        }
    };

    return (
        <div>
            {domainData.map((each) => (
                <button key={each.id} onClick={() => handleClick.domain(each)}>
                    {each.name}
                </button>
            ))}
            <hr />
            <input type="text" placeholder="Search.." onChange={handleChange}></input>
            {lists.map((each)=><li>{each.name}{each.age}</li>)}
        </div>

    )
}

export default Home;
