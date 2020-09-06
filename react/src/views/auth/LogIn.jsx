import React, { useState } from "react";
import { useSelector } from "react-redux";
import { login } from '../../actions/authAction'
import { useDispatch } from "react-redux";
import { clearErrors } from '../../actions/listDomainAction'


function Login() {

    let ramlal = null
    const dispatch = useDispatch()

    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");

    const HandleSubmit = (evt) => {


        evt.preventDefault();
        const newUser = {
            email,
            password
        };

        dispatch(login(newUser))
    }

    const { errorReducer } = useSelector((state) => state)

    if (errorReducer.id === "LOGIN_FAIL") {
        ramlal = errorReducer.msg
    }



    return (
        <div>
            {ramlal ? <div>{ramlal} <button onClick={() => dispatch(clearErrors())}>Ok</button></div> : null}
            <form onSubmit={HandleSubmit}>
                <label>
                    Email:
                <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>

                <label>
                    Password:
                <input
                        type="password"
                        value={password}
                        onChange={e => setpassword(e.target.value)}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Login