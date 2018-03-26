import * as React from "react";
import { Link } from "react-router-dom";
import "./userpopup.css";

interface IUser {
    name: string;
    userId: string;
}

export class UserPopup extends React.Component<any, IUser> {

    constructor(props: any) {

        super(props);

        this.state = {
            name: "John Doe",
            userId: "user@company.com",
        };
    }

    public render() {
        return (
            <div>
                <h3>{this.state.name}</h3>
                <p>{this.state.userId}</p>

                <div className="contentRight" >
                    <div><Link to="/login">Logout</Link></div>
                </div>
            </div>
        );
    }
}
