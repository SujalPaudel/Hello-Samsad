import { returnErrors } from './listDomainAction'
import { removeCompleteCartElement } from '../actions/cartAction'
import axios from 'axios'

export const checkOut = () => (dispatch, getState) => {

    dispatch({ type: 'CHECKING_OUT' })

    // Get token from local storage
    const { isAuthenticated, user } = getState().authReducer

    const { item } = getState().cartData

    isAuthenticated ? console.log(getState().authReducer.user.email) : console.log(null)

    if (isAuthenticated) {
        const user_email = user.email
        const body = { user_email, item }

        dispatch(
            {
                type: 'DUMP_CHECKOUT_DB',
                payload: body
            });

    }

    else {
        let email = window.prompt("Email: ", "")
        let password = window.prompt("Password: ", "")

        const body = { email, password }

        const cart_dump = {
            user_email: "samip@gmail.com",
            item: [
                {
                    pinct_price: 300,
                    product_name: "Head Massage",
                    users_pin_qty: 5
                },
                {
                    pinct_price: 200,
                    product_name: "Ram Tel",
                    users_pin_qty: 3
                }
            ]
        }

        function getEmail() {
            axios.post('/login', body)
                .then(res => dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: res.data
                }))
                .then((res) => {
                    if (res.type === "LOGIN_SUCCESS") {
                        axios.post('/order', cart_dump)
                            .then(dispatch(removeCompleteCartElement()))
                    }
                })
                .catch(err => {
                    console.log(err.response.data)
                    dispatch(returnErrors(err.response.data.error, err.response.status, 'LOGIN_FAIL'));
                    dispatch({ type: 'LOGIN_FAIL' })
                })

        }
        getEmail()
    }

}










