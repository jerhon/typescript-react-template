import * as popper from "popper.js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as reactpopper from "react-popper";

import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createStore } from "redux";


import AppAuthRouter from "./ui/appAuthRouter"

import App from "./ui/app";

const a = popper.default.length;
const b = reactpopper.Popper.length;

import { store } from "./state";
import { getDefaultAuthenticator } from "./model/auth";

let authenticator = getDefaultAuthenticator();

function renderApp() {
    return (<App />);
}
function renderError() {
    return (<div>Unexpected error has occurred.</div>);
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter >
            <AppAuthRouter 
                renderApp={renderApp} 
                renderError={renderError} 
                authProvider={authenticator} 

                homePath="/"
                errorPath="/error" 
                callbackPath="/callback"
                logoutPath="/logout"
                />
        </BrowserRouter>
    </Provider>,
    document.getElementById("app"),
);
