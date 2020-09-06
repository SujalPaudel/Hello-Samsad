import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from '../../actions/authAction'
import { useDispatch } from "react-redux";




function AppNavbar() {

    const dispatch = useDispatch()
    const history = useHistory();

    const guestLinks =
        [{ id: 1, name: "Register", route: "register" },
        { id: 2, name: "Login", route: "login" },
        ]
    const authLinks =
        [{ id: 3, name: "Logout", route: "logout" }]

    const foreverLinks =
        [{ id: 4, name: "Cart", route: "cart" }]

    const handleClick = {
        domain: (each) => {
            history.push(`/${each.route}`);
        },
    };

    const { token, isAuthenticated, user } = useSelector((state) => state.authReducer)

    return (
        <div>
            {isAuthenticated || token ?

                authLinks.map((each) => (
                    <div>
                        <button style={{ float: "right" }}>{user?.firstname}</button>
                        <button key={each.id} onClick={() => dispatch(logout()) && history.push(`/`)}>
                            {each.name}
                        </button>

                    </div>
                ))
                :
                guestLinks.map((each) => (
                    <button key={each.id} onClick={() => handleClick.domain(each)}>
                        {each.name}
                    </button>
                ))

            }

            {foreverLinks.map((each) => (
                <div>

                    <button key={each.id} onClick={() => handleClick.domain(each)}>
                        {each.name}
                    </button>

                </div>))
            }

            <hr />
        </div>

    )
}

export default AppNavbar



