import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Spinner } from "@blueprintjs/core";

import { getCurrentUser, IUser } from "../model/user";
import { IApplicationState } from "../state";
import "./userpopup.css";

import { IUserState } from "../state/users";

export interface IUserProperties {
    user: IUser | null;
    getCurrentUser(): void;
}

class UserPopup extends React.Component<IUserProperties, any> {

    constructor(props: IUserProperties) {
        super(props);
    }

    public componentDidMount() {
        if (!this.props.user) {
            this.props.getCurrentUser();
        }
    }

    public render() {
        let component: JSX.Element;
        if (this.props.user) {
            component = (<div>
                <h3>{this.props.user.name}</h3>
                <p>{this.props.user.email}</p>

                <div className="contentRight" >
                    <div><Link to="/login">Logout</Link></div>
                </div>
            </div>);
        } else {
            component = (<div>
                <Spinner  />
            </div>);
        }

        return component;
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    getCurrentUser,
    user: state.users.current,
} as IUserProperties);

export default connect(mapStateToProps)(UserPopup);
