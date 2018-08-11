import * as React from "react";

import { Alignment, Button, Navbar, NavbarDivider, NavbarGroup, NavbarHeading, Popover, PopoverInteractionKind, Position, Tooltip, Spinner } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";

import { Route, Switch, withRouter, RouteComponentProps, } from "react-router-dom";

import "./app.scss";
import { Home } from "./home";
import UserPopup from "./users/userpopup";
import AppAuthRouter from "./appauthrouter";
import logo from "../honlSoft_white.svg"

// This is the rare time that it will for the UI to use the model
// This should eventually move back to an actionCreator / reducer that 
// would take care of the auth.

import Auth, { IAuthenticator } from "../model/auth";

interface IAppState {
    largeSidebar: boolean;
}

interface IAppProps {
}

class App extends React.Component<IAppProps & RouteComponentProps<any>, IAppState> {

    constructor(props: any, context?: any) {
        super(props, context);

        this.state = { largeSidebar: false };
    }

    logoutClick() {
        this.props.history.push("/logout");
    }

    public render() {
        return (
            <div className="app-layout">
                <div className="app-header">
                    <Navbar className="pt-dark">
                        <NavbarGroup align={Alignment.LEFT} >
                            <img src={logo} />
                            <div style={{width:10}} />
                            <NavbarHeading>honlSoft Web Dashboard Template</NavbarHeading>
                        </NavbarGroup>
                        <NavbarGroup align={Alignment.RIGHT}>
                            <NavbarDivider />
                            <Popover inheritDarkTheme={false} popoverClassName="pt-popover-content-sizing" position={Position.BOTTOM_RIGHT} interactionKind={PopoverInteractionKind.HOVER}  >
                                <Button className="pt-minimal" icon="user" />
                                <UserPopup />
                            </Popover>
                            <Button className="pt-minimal" icon="log-out" onClick={this.logoutClick.bind(this)} />
                        </NavbarGroup>
                    </Navbar>
                </div>
                <div className="app-main">
                    <div className="app-sidebar" >
                        <Tooltip content="Dashboard" position={Position.RIGHT} hoverOpenDelay={1000} >
                            <Button className="pt-minimal pt-large" icon="dashboard" alignText={Alignment.LEFT} />
                        </Tooltip>
                        <Tooltip content="Tables" position={Position.RIGHT} hoverOpenDelay={1000}>
                            <Button className="pt-minimal pt-large" icon="th" alignText={Alignment.LEFT} />
                        </Tooltip>
                        <Tooltip content="Graph" hoverOpenDelay={1000}>
                            <Button className="pt-minimal pt-large" icon="layout-hierarchy" alignText={Alignment.LEFT} />
                        </Tooltip>
                        <div className="divider" />
                        <Tooltip content="Settings" hoverOpenDelay={1000}>
                            <Button className="pt-minimal pt-large" icon="cog" alignText={Alignment.LEFT} />
                        </Tooltip>
                    </div>
                    <div className="app-content">
                        <Switch>
                            <Route exact path="/" component={Home} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}


export default withRouter(App);