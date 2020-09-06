import { returnErrors } from './listDomainAction'
import axios from 'axios'

export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: 'USER_LOADING' })


    // Get token from local storage
    const { token } = getState().authReducer

    //if token, send it to the profile

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


export const register = ({ email, firstName, lastName, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // Request Body
    const body = JSON.stringify({ email, firstName, lastName, password })


    axios.post('/register', body, config)
        .then(res => dispatch({
            type: 'REGISTER_SUCCESS',
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({ type: 'REGISTER_FAIL' })
        })
}


export const login = ({ email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // Request Body
    const body = JSON.stringify({ email, password })

    axios.post('/login', body, config)
        .then(res => dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data
        }))
        .catch(err => {
            console.log(err.response.data)
            dispatch(returnErrors(err.response.data.error, err.response.status, 'LOGIN_FAIL'));
            dispatch({ type: 'LOGIN_FAIL' })
        })
}

export const logout = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

