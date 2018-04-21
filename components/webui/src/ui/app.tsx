import * as React from "react";

import { Alignment, Button, Callout, Card, Menu, MenuItem, Navbar, NavbarDivider, NavbarGroup,  NavbarHeading, Popover, PopoverInteractionKind, Position, Label, Tooltip } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";

import { connect } from "react-redux";
import { Link, Route, Switch, withRouter } from "react-router-dom";

import "./app.scss";
import { Home } from "./home";
import { Settings } from "./settings";
import UserPopup from "./users/userpopup";

import { getCurrentUser } from "../state/users";

interface IAppState {
    largeSidebar: boolean;
}

interface IAppProps {
    getCurrentUser: void;
}

export class App extends React.Component<any, IAppState> {

    constructor(props: any, context?: any) {
        super(props, context);

        this.state = { largeSidebar: false };
    }

    public render() {
        // TODO: change this so that the text appears when the menu on the left is expanded rather than maintaing two versions of the sidebar
        // TODO: Switch sidebar to use Menu

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
                            <Button className="pt-minimal pt-large" icon="dashboard" alignText={Alignment.LEFT}  />
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

    private toggleLargeSidebar = () => {
        this.setState((prevstate, props) => ({ largeSidebar: !prevstate.largeSidebar}));
    }
}
