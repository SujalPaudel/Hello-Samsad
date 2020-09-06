import React, { useState } from "react";
import { useSelector } from "react-redux";
import { register } from '../../actions/authAction'
import { useDispatch } from "react-redux";
import { clearErrors } from '../../actions/listDomainAction'




function Register() {

    let errorMsg = null
    const dispatch = useDispatch()

    const [email, setEmail] = useState("");
    const [firstName, setfirst_name] = useState("");
    const [lastName, setlast_name] = useState("");
    const [password, setpassword] = useState("");



    const HandleSubmit = (evt) => {


        evt.preventDefault();
        const newUser = {
            email,
            firstName,
            lastName,
            password,
        };

        dispatch(register(newUser))
    }

    const { errorReducer } = useSelector((state) => state)

    if (errorReducer.id === "REGISTER_FAIL") {
        errorMsg = errorReducer.msg.error
    }



    return (
        <div>
            {errorMsg ? <div>{errorMsg} <button onClick={() => dispatch(clearErrors())}>Ok</button></div> : null}
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
                    First Name:
                <input
                        type="text"
                        value={firstName}
                        onChange={e => setfirst_name(e.target.value)}
                    />
                </label>
                <label>
                    Last Name:
                <input
                        type="text"
                        value={lastName}
                        onChange={e => setlast_name(e.target.value)}
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

export default Register