import * as React from "react";

import { Alignment, Button, Navbar, NavbarDivider, NavbarGroup, NavbarHeading, Popover, PopoverInteractionKind, Position, Tooltip, Spinner } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";

import { Route, Switch, withRouter, RouteComponentProps, } from "react-router-dom";

import "./app.scss";
import { Home } from "./home";
import UserPopup from "./users/userpopup";

// This is the rare time that it will for the UI to use the model
// This should eventually move back to an actionCreator / reducer that 
// would take care of the auth.

import Auth from "../model/auth";

interface IAppState {
    largeSidebar: boolean;
}

interface IAppProps { }

// TODO: move this into an AppAuth component

class App extends React.Component<IAppProps & RouteComponentProps<any>, IAppState> {

    _auth: Auth;


    constructor(props: any, context?: any) {
        super(props, context);

        this.state = { largeSidebar: false };

        this._auth = new Auth({
            navigateHome: () => { this.props.history.push("/"); },
            navigateError: () => { this.props.history.push("/error") }
        });
    }

    public renderHome() {

        // TODO: move this to a separate component
        if (!this._auth.isAuthenticated()) {
            this._auth.login();
            return null;
        }

        return (
            <div className="app-layout">
                <div className="app-header">
                    <Navbar className="pt-dark">
                        <NavbarGroup align={Alignment.LEFT} >
                            <NavbarHeading>typescript-react-template</NavbarHeading>
                        </NavbarGroup>
                        <NavbarGroup align={Alignment.RIGHT}>
                            <NavbarDivider />
                            <Popover inheritDarkTheme={false} popoverClassName="pt-popover-content-sizing" position={Position.BOTTOM_RIGHT} interactionKind={PopoverInteractionKind.HOVER}  >
                                <Button className="pt-minimal" icon="user" />
                                <UserPopup />
                            </Popover>
                        </NavbarGroup>
                    </Navbar>
                </div>
                <div className="app-main">
                    <div className="app-sidebar" >
                        <Tooltip content="Dashboard" position={Position.RIGHT} hoverOpenDelay={500} >
                            <Button className="pt-minimal pt-large" icon="dashboard" alignText={Alignment.LEFT} />
                        </Tooltip>
                        <Tooltip content="Tables" position={Position.RIGHT} hoverOpenDelay={500}>
                            <Button className="pt-minimal pt-large" icon="th" alignText={Alignment.LEFT} />
                        </Tooltip>
                        <Tooltip content="Graph" hoverOpenDelay={500}>
                            <Button className="pt-minimal pt-large" icon="layout-hierarchy" alignText={Alignment.LEFT} />
                        </Tooltip>
                        <div className="divider" />
                        <Tooltip content="Settings" hoverOpenDelay={500}>
                            <Button className="pt-minimal pt-large" icon="cog" alignText={Alignment.LEFT} />
                        </Tooltip>
                    </div>
                    <div id="app-content">
                        <Switch>
                            <Route exact path="/" component={Home} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }

    public renderError() {

        return (<div>Unexpected error rendering page.</div>);
    }

    public renderAuthCallback() {
        this._auth.handleAuthentication();

        return (<Spinner />);
    }

    public render() {
        // TODO: change this so that the text appears when the menu on the left is expanded rather than maintains two versions of the sidebar
        // TODO: Switch sidebar to use Menu

        // TODO: ADD 404
        return (
            <Switch>

                <Route exact path="/error" render={this.renderError.bind(this)} />
                <Route path="/callback" render={this.renderAuthCallback.bind(this)} />
                <Route path="/" render={this.renderHome.bind(this)} />
            </Switch>
        );
    }

    private toggleLargeSidebar = () => {
        this.setState((prevstate, props) => ({ largeSidebar: !prevstate.largeSidebar }));
    }
}


export default withRouter(App);