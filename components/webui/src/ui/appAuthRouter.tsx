import { IAuthenticator } from "../model/auth";
import React from "react";
import { Switch, Route, RouteComponentProps, withRouter } from "react-router-dom";

interface IAppAuthProps {

  authProvider: IAuthenticator;
  errorPath: string ;
  callbackPath: string ;
  homePath: string ;
  logoutPath: string;

  renderApp: () =>  any ;
  renderError: () =>  any ;
}

// Not sure how to test this one out...
class AppAuthRouter extends React.Component<IAppAuthProps & RouteComponentProps<any>> {

  constructor(props: any, context?: any) {
    super(props, context);
  }

  private renderHome() {

    if (!this.props.authProvider.isAuthenticated()) {
      this.props.authProvider.login();
      return null;
    }

    return (this.props.renderApp() || <div>No app page defined</div>);
  }

  private renderError() {
    return (this.props.renderError() || <div>Unexpected error rendering page.</div>);
  }

  private renderAuthCallback() {
    
    this.props.authProvider
      .callbackAsync()
        .then((result) => this.props.history.push(this.props.homePath))
        .catch((err) => this.props.history.push(this.props.errorPath));
    
    return (null);
  }

  private renderLogout() {
    this.props.authProvider.clearCredentials();
    this.props.authProvider.login();

    return (<div>You are now being logged out of the application.</div>);
  }

  public render() {
    // TODO: ADD 404
    return (
      <Switch>
        <Route exact path={this.props.errorPath} render={this.renderError.bind(this)} />
        <Route path={this.props.logoutPath} render={this.renderLogout.bind(this)} />
        <Route path={this.props.callbackPath} render={this.renderAuthCallback.bind(this)} />
        <Route path={this.props.homePath} render={this.renderHome.bind(this)} />
      </Switch>
    );
  }

  static defaultProps = {
    homePath: "/",
    errorPath: "/error",
    callbackPath: "/callback"
  }
}

export default withRouter(AppAuthRouter);