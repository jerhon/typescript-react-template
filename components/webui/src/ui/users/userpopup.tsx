import { Spinner } from "@blueprintjs/core";
import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./userpopup.scss";

import { IApplicationState, IAction } from "../../state";
import { getCurrentUser, IUser, IUserState } from "../../state/users"

export interface IUserProperties {
    user: IUser | null;
}

export interface IUserMethods {
    getCurrentUser(): void;
}

class UserPopup extends React.Component<IUserProperties & IUserMethods, any> {

    constructor(props: IUserProperties & IUserMethods) {
        super(props);
    }

    public componentDidMount() {
        console.log('mounted!');
        if (!this.props.user) {
            console.log('user!', this.props.getCurrentUser);
            this.props.getCurrentUser();
        }
    }

    public render() {
        let component: JSX.Element;
        if (this.props.user) {
            component = (<div className="userPopup">
                <h3>{this.props.user.name}</h3>
                <p>{this.props.user.email}</p>

                <div className="contentRight" >
                    <div><Link to="/login">Logout</Link></div>
                </div>
            </div>);
        } else {
            component = (<div className="userPopup">
                <Spinner  />
            </div>);
        }

        return component;
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    user: state.users.current,
} as IUserProperties);

function mapDispatchToProps(dispatch : Dispatch<IAction>) : IUserMethods {
    return bindActionCreators({ getCurrentUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPopup);
