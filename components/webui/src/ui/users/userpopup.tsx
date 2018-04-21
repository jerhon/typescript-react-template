import { Spinner } from "@blueprintjs/core";
import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./userpopup.scss";

import { IApplicationState, IAction } from "../../state";
import { getCurrentUser, IUser, IUserState } from "../../state/users"

export interface IUserMethods {
    getCurrentUser(): void;
}

class UserPopup extends React.Component<IUserState & IUserMethods, any> {

    constructor(props: IUserState & IUserMethods) {
        super(props);
    }

    public componentDidMount() {
        console.log('mounted!');
        if (!this.props.current) {
            console.log('user!', this.props.getCurrentUser);
            this.props.getCurrentUser();
        }
    }

    public render() {
        let component: JSX.Element | null = null;
        if (!this.props.loading) {
            if (this.props.current) {
                component = (<div className="userPopup">
                    <h3>{this.props.current.name}</h3>
                    <p>{this.props.current.email}</p>

                    <div className="contentRight" >
                        <div><Link to="/login">Logout</Link></div>
                    </div>
                </div>);
            }
            if (this.props.error) {
                component = (<div className="userPopup">
                    <h3>Unable to load current user.</h3>
                </div>)
            }
        } else {
            component = (<div className="userPopup">
                <Spinner  />
            </div>);
        }

        return component || (<div>Undefined state!</div>);
    }
}

const mapStateToProps = (state: IApplicationState) => ({ ...state.users
} as IUserState);

function mapDispatchToProps(dispatch : Dispatch<IAction>) : IUserMethods {
    return bindActionCreators({ getCurrentUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPopup);
