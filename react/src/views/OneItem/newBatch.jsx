import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { addToCart } from '../../actions/cartAction'
import { useDispatch } from "react-redux";
import { login } from '../../actions/authAction'
import axios from 'axios'
import { useHistory } from "react-router-dom";

function NewBatch() {

    const history = useHistory();
    const { id } = useParams();

    const { [id]: itemDetail } = useSelector((state) => state.itemsData);

    const [taken_units_count, set_taken_units_count] = useState(0);

    const [const_taken_units, set_const_taken_units] = useState(0);

    const dispatch = useDispatch()

    useEffect(() => {
        itemDetail ? set_const_taken_units(0) : set_const_taken_units(null)
    }, [const_taken_units])


    const newBatch = () => {
        if (window.confirm('Start a new batch ?')) {
            alert('Please save this to cart !!!')

            dispatch(addToCart(itemDetail.pinct_price, itemDetail.productName, taken_units_count - const_taken_units))

            history.push(`/item/${itemDetail.id}/newBatch`);

        }

    }

    const submitOrder = () => {
        if (window.confirm(`${taken_units_count - const_taken_units} Units of ${itemDetail.productName}`)) {
            if (window.confirm('Confirm This Order ?')) {

                dispatch(addToCart(itemDetail.pinct_price, itemDetail.productName, taken_units_count - const_taken_units))

            }
        }
    }


    if (!itemDetail) {
        return <></>;
    }


    return (
        <div>
            <p>Item Id: <strong>{itemDetail.id}</strong></p>

            <p>Item Domain: <strong>{itemDetail.domain}</strong></p>

            <p>Product Code: <strong>{itemDetail.productCode}</strong></p>

            <p>Brand Name: <strong>{itemDetail.brandName}</strong></p>

            <p>Product Name: <strong>{itemDetail.productName}</strong></p>

            <p>Minimum Units: <strong>{itemDetail.minimum_units}</strong></p>

            <p>Pinct Price: <strong>{itemDetail.pinct_price}</strong></p>

            <p>Global Taken Units: <strong>{taken_units_count}</strong></p>

            <button onClick={() => taken_units_count > 0 ? set_taken_units_count(taken_units_count - 1) : null}>-</button>


            <button onClick={() => taken_units_count < itemDetail.minimum_units ? set_taken_units_count(taken_units_count + 1) : newBatch()}>
                +
            </button>
            <br />
            <button onClick={() => submitOrder()}>
                Submit
            </button>


        </div>
    );
}

export default NewBatch;