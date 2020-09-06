import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";

import store from "./reduxStore";

import ScrollToTop from "./components/utils/ScrollToTop";

import AppNavbar from "./components/utils/AppNavbar"

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ScrollToTop>
                <AppNavbar />
                <App />
            </ScrollToTop>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

serviceWorker.register({
    onUpdate: (registration) => {
        window.alert("update is installed");
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
        window.location.reload();
    },
});
