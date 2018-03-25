import * as React from "react";

import '@blueprintjs/core/lib/css/blueprint.css';

import { Switch, Route, withRouter, Link } from "react-router-dom"
import { Home } from './home' 
import { Settings } from './settings'
import './app.scss'
import { Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Button, Position, Popover, PopoverInteractionKind, Alignment, MenuItem, Menu, Callout, Card } from '@blueprintjs/core'
import { UserPopup } from './userpopup'

interface IAppState {
    largeSidebar: boolean;
}

export class App extends React.Component<any, IAppState> {

    constructor(props:any, context?:any) {
        super(props, context);

        this.state = { largeSidebar: false };
    }

    
    toggleLargeSidebar = () => {
        this.setState((prevstate, props) => {  return { largeSidebar: !prevstate.largeSidebar} });
    }
    

    render() {
        // TODO: change this so that the text appears when the menu on the left is expanded rather than maintaing two versions of the sidebar
        // TODO: Switch sidebar to use Menu

        return (
            <div className="app-layout">
                <div className="app-header">
                    <Navbar className="pt-dark">
                        <NavbarGroup align={Alignment.LEFT} >
                            <Button className="pt-minimal pt-large" icon={this.state.largeSidebar ? "menu-closed" : "menu-open"} alignText={Alignment.LEFT} onClick={this.toggleLargeSidebar} />
                            <NavbarDivider />
                            <NavbarHeading>typescript-react-template</NavbarHeading>
                        </NavbarGroup>
                        <NavbarGroup align={Alignment.RIGHT}> 
                            <NavbarDivider />
                            <Popover inheritDarkTheme={false} popoverClassName="pt-popover-content-sizing" position={Position.BOTTOM_RIGHT} interactionKind={PopoverInteractionKind.HOVER} >
                                <Button className="pt-minimal" icon="user" />
                                <UserPopup />
                            </Popover>
                        </NavbarGroup>
                    </Navbar>
                </div>
                <div className="app-main">
                    <div className={"app-sidebar" + (this.state.largeSidebar ? '' : ' small')} >
                        <Button className="pt-minimal pt-large" text={ this.state.largeSidebar ? "Dashboard" : ""} icon="dashboard" alignText={Alignment.LEFT} />
                        <Button className="pt-minimal pt-large" text={ this.state.largeSidebar ? "Tables" : ""}    icon="th" alignText={Alignment.LEFT} />
                        <Button className="pt-minimal pt-large" text={ this.state.largeSidebar ? "Hierarcy" : ""}    icon="layout-hierarchy" alignText={Alignment.LEFT} />
                        <div className="divider" />
                        <Button className="pt-minimal pt-large" text={ this.state.largeSidebar ? "Settings" : ""} icon="cog" alignText={Alignment.LEFT} />
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
}