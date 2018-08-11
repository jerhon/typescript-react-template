
// Authorization from Auth0
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import auth from "./config-auth.json";

// setup auth
//
// Auth0 uses a PKI to generate authentication tokens.  This means that the public key is exposed
// and we can verify the validity of the tokens by simply using the public key to verify the signature.
//
// Auth0 gives what these settings should be on their configuration webpage.
//
// I will need to find a way to distribute them securely.

const options = { ...auth.auth, secret: jwks.expressJwtSecret(auth.secret) };

const jwtCheck = jwt(options);

export default jwtCheck;
