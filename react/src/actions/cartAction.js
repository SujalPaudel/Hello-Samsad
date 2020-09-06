import { returnErrors } from './listDomainAction'
import axios from 'axios'

export const addToCart = (pinct_price, product_name, users_pin_qty) => (dispatch, getState) => {

    const body = { pinct_price, product_name, users_pin_qty }

    dispatch(
        {
            type: 'ADD_CART_DATA',
            payload: body
        });

}

export const removeCartElement = (product_name) => (dispatch) => {
    dispatch(
        {
            type: 'REMOVE_CART_ELEMENT',
            payload: product_name
        });

}

export const removeCompleteCartElement = () => (dispatch) => {
    dispatch(
        {
            type: 'REMOVE_COMPLETE_CART_ELEMENT',
        });

}

export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: 'USER_LOADING' })

    // Get token from local storage
    const token = getState().authReducer.token

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
