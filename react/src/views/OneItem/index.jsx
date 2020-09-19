import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

function OneItem() {

    const { id } = useParams();

    const [one, setOne] = useState([])

    useEffect(() => {
        axios.get(`/api/people/${id}`)
        .then(res=>setOne(res.data))
        .catch(err=>console.log(err))
    },[]);

    if (one.length===0) {
        return <></>;
    }

    

    return (
        <div>
            <p>Name:{one.name}</p>

            <p>Gender:{one.gender}</p>

            <p>Age:{one.age}</p>

        </div>
    );
}

export default OneItem;