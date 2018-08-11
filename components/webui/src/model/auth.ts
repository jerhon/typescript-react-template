import auth0 from "auth0-js";
import config from "../config-auth.json"


// Design decisions:
//
// I purposely left this code out of redux.  This is mainly to ensure the code for authentication is tightly defined
// and the rest of the infrastructure of the application does not have access to it.  (IE: reducers don't 
// get secrets passed along, etc)
//
// I also wanted this code to have the potential to work for other javascript / UI frameworks in the future.

/**
 * An interface to handle basic authentication.  These methods will redirect the
 * webpage to a SSO experience, so it is important that the appropriate routes have been set up.
 */
export interface IAuthenticator {

  /**
   * Returns true if the page has already been authenticated.
   */
  isAuthenticated() : boolean;

  /**
   * Redirects the page to the login provider, a callback will be issued when completed.
   */
  login() : void;

  /**
   * Clears any cached local credentials.
   */
  clearCredentials() : void;

  /**
   * Gets the token that should be used in order to authenticate API requests.
   */
  getToken() : string | null;

  /**
   * A method to call back when authentication is complete and the authentication provider calls to the 
   * callback URL.  This will store the authentication token and material locally so that future calls to
   * isAuthenticated() will return true.  Returns false if for some reason the auth0 authentication material
   * doesn't match what is expected.
   */
  callbackAsync() : Promise<boolean>;
}

/**
 * Provides a bridge to the Auth0 authentication interface.
 */
export default class Auth0Authenticator implements IAuthenticator {
  
  constructor() { }

  /** This is the auth0 helper.  */
  auth0 = new auth0.WebAuth(config.auth);

  login() {
    this.auth0.authorize();
  }

  callbackAsync() : Promise<boolean> {
    return new Promise((promiseResolve, promiseErr) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult) {
          if (this.setSession(authResult)) {
            promiseResolve(true);
          }
          promiseResolve(false);
        } else if (err) {
          console.error('Unexpected error with authentication from auth0: ', err);
          promiseErr(err);
        }
      });
    });
  }

  setSession(authResult : auth0.Auth0DecodedHash) {
    if (authResult.expiresIn && authResult.idToken && authResult.accessToken) {
      // Set the time that the Access Token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

      localStorage.removeItem("auth_access_token");
      localStorage.removeItem("auth_id_token");
      localStorage.removeItem("auth_expires_at");

      console.log(authResult.accessToken);
      localStorage.setItem("auth_access_token", authResult.accessToken);
      localStorage.setItem("auth_id_token", authResult.idToken);
      localStorage.setItem("auth_expires_at", expiresAt);

      return true;
    }
    return false;
  }

  getToken() {
    const token = localStorage.getItem("auth_access_token");
    console.log("token: ", token);
    return token;
  }

  clearCredentials() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem("auth_access_token");
    localStorage.removeItem("auth_id_token");
    localStorage.removeItem("auth_expires_at");
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

const authenticator = new Auth0Authenticator();
export function getDefaultAuthenticator() {
  return authenticator;
}
export function getAccessToken() {
  return getDefaultAuthenticator().getToken();
}