import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import * as popper from 'popper.js'
import * as reactpopper from 'react-popper'

import { App } from "./components/app";

let a = popper.default.length
let b = reactpopper.Popper.length

ReactDOM.render(
    <BrowserRouter >
        <App />
    </BrowserRouter>,
    document.getElementById("app")
);