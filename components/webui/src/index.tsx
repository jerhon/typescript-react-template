import * as popper from "popper.js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as reactpopper from "react-popper";

import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createStore } from "redux";


import { App } from "./components/app";

const a = popper.default.length;
const b = reactpopper.Popper.length;

import { store } from "./state/store";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter >
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("app"),
);
