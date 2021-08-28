import { OAuth2Client } from "google-auth-library";
import { OAuthPayload } from "../../Interfaces/Interfaces.Auth";
import { makeError } from "../ErrorHandling/Helper.EH.MakeError";
// this function checks the integrity of the googleIdToken and outputs the user data
function verifyGoogleIdTokenAndGetUserData(googleIdToken : string) : Promise<OAuthPayload> {
  return new Promise((resolve, reject) => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    return client
      .verifyIdToken({
        idToken: googleIdToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .then((ticket) => {
        // the integrity of the google id token has been confirmed and obtained data in payload
        const payload = ticket.getPayload();
        // returning the user data obtained in the payload
        const userDataFromOAuth : OAuthPayload = {
            fullName : payload?.name as string | "",
            email : payload?.email as string | "",
            profilePicture : payload?.picture as string | "",
            subId : payload?.sub as string | ""
        }
        
        return resolve(userDataFromOAuth);
      })
      .catch((err) => {
        // integrity check failed or the user has logged out

        // sending the error as unauthorized with status code 401
        return reject(new makeError.Unauthorized());
      });
  });
}

export { verifyGoogleIdTokenAndGetUserData };
