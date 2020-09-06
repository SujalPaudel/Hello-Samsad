import React from "react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function CartItem() {

    const { token } = useSelector((state) => state.authReducer)
}

export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: 'USER_LOADING' })



    //if token, send it to the profile

    if (token) {
        const tokenRequest = {
            token,
        }

        axios.post('/profile', tokenRequest)
            .then(res => dispatch(
                {
                    type: 'USER_LOADED',
                    payload: res.data
                }))
            .catch(err => {
                dispatch(returnErrors(err.response.data.error, err.response.status));
                dispatch({
                    type: 'AUTH_ERROR'
                })
            })
    }
}