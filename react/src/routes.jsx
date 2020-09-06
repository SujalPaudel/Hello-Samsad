import Home from "./views/Home";
import Domain from "./views/Domain";
import OneItem from "./views/OneItem";
import Register from "./views/auth/Register";
import LogIn from "./views/auth/LogIn";
import NewBatch from "./views/OneItem/newBatch";
import CartItem from "./views/Cart";
import CheckOut from "./views/CheckOut";

const routes = [
    {
        path: "/",
        exact: true,
        name: "Home",
        component: Home,
    },
    {
        path: "/item/:id",
        exact: true,
        name: "Item",
        component: OneItem,
    },
    {
        path: "/domain/:domain",
        name: "Domain",
        component: Domain,
    },
    {
        path: "/register",
        exact: true,
        name: "Register",
        component: Register,
    },
    {
        path: "/login",
        exact: true,
        name: "Login",
        component: LogIn,
    },
    {
        path: "/item/:id/newBatch",
        exact: true,
        name: "NewBatch",
        component: NewBatch,
    },
    {
        path: "/cart",
        exact: true,
        name: "Cart",
        component: CartItem,
    },
    {
        path: "/checkout",
        exact: true,
        name: "Checkout",
        component: CheckOut,
    },

];

export default routes;
