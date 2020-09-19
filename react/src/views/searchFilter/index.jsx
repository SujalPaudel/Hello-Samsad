import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

function SearchFilter() {
    const [result, setResult] = useState([]);

    const searchQuery = ()=>{
        let baseRoute = 'api/people/custom?'
        let searchItem = document.getElementById('search').value
        let ageRange = document.getElementById('ageRange').value
        let gender = document.getElementById('gender').value

        if(searchItem){
            baseRoute+=`name=${searchItem}`
        }
        if(ageRange !='null') {
            baseRoute+=`&age=${ageRange}`
        }
        if(gender !='null'){
            baseRoute+=`&gender=${gender}`
        }

        console.log(baseRoute)

        axios.get(baseRoute) 
        .then(res=>setResult(res.data))
        .catch(err=>console.log(err))
    }


    return (
        <div>
            <input type="text" placeholder="Search.." id="search"></input>
            <select name="gender" id="gender">
                <option value="null">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>

            <label for="Age Range">Age Range:</label>
                <select id="ageRange">
                    <option value="null">any</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="35">35</option>
                    <option value="65">65</option>
                    <option value="70">70</option>
                </select>
            <button onClick={()=>searchQuery()}>Search</button>
    {result.map((one)=><li>{one.name} - {one.age} -{one.gender}</li>)}
        </div>

    )
}

export default SearchFilter;