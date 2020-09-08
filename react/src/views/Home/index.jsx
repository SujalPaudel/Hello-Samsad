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
    const [check, setCheck]=useState(true);
    const [filter, setFilter]=useState(false);

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

    let onCheck = () => {
        setCheck(!check)
        setFilter(!filter)
    }

    return (
        <div>
            {domainData.map((each) => (
                <button key={each.id} onClick={() => handleClick.domain(each)}>
                    {each.name}
                </button>
            ))}
            <hr />
            
            <label>Search With Filters:</label>
            <input type="radio" id="no" name="gender" value="no" checked={check} onChange={() => onCheck()}/>
            <label for="no">No</label>
            <input type="radio" id="yes" name="gender" value="yes" onChange={() => onCheck()}/>
            <label for="yes">Yes</label> <br></br>
            
            {<input type="text" placeholder="Search.." onChange={!filter?handleChange:""}></input>}
            {lists.map((each)=><li onClick={()=> perPage(each)}>{each.name}{each.age}</li>)}
        </div>

    )
}

export default Home;
