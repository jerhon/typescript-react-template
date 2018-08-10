import auth0 from "auth0-js";
import history from "../history"
import config from "../config-auth.json"

interface IAuthNavigation {
  navigateHome() : void;
  navigateError() : void;
}


// TODO: refactor and test this out
export default class Auth {
  
  constructor(readonly _navigator: IAuthNavigation) { }

  // TODO: change localhost to be something local
  auth0 = new auth0.WebAuth(config.auth);

  login() {
    this.auth0.authorize();
  }

  navigateHome() {
    this._navigator.navigateHome();
  }

  navigateError() {
    this._navigator.navigateError();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.navigateHome();
      } else if (err) {
        alert(err);
        console.error('Unexpected error with authentication from auth0: ', err);
        this.navigateError();
      }
    });
  }

  setSession(authResult : auth0.Auth0DecodedHash) {
    if (authResult.expiresIn && authResult.idToken && authResult.accessToken) {
      // Set the time that the Access Token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem("auth_access_token", authResult.accessToken);
      localStorage.setItem("auth_id_token", authResult.idToken);
      localStorage.setItem("auth_expires_at", expiresAt);

      // navigate to the home route
      this.navigateHome();
    }
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem("auth_access_token");
    localStorage.removeItem("auth_id_token");
    localStorage.removeItem("auth_expires_at");
    
    // navigate to the home route
    this.navigateHome();
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token"s expiry time
    let expiresAtString = localStorage.getItem("auth_expires_at") 
    if (expiresAtString) 
    {
      let expiresAt = JSON.parse(expiresAtString);
      return new Date().getTime() < expiresAt;
    }
    return false;
  }

}