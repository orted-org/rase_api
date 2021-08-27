import { OAuthPayload } from "../../Interfaces/Interfaces.Auth";
import { UserRoleType } from "../../Types/Types.Auth";
import { makeError } from "../ErrorHandling/Helper.EH.MakeError";
import { admin } from "../Helper.AuthInit";
function getUserDataFromAuth(idToken: string) {
  return new Promise<OAuthPayload>((resolve, reject) => {
    admin
      .auth()
      .verifyIdToken(idToken, true)
      .then((data) => {
        if (data.email_verified) {
          const userDataFromOAuth: OAuthPayload = {
            email: data.email as any | "",
            subId: data.sub,
            profilePictureUrl: data.picture as any | "",
            service: data.firebase.sign_in_provider,
          };
          if (userDataFromOAuth.email.length === 0) {
            return reject(
              new makeError.UnprocessableEntity("OAuth did not provide email")
            );
          }
          return resolve(userDataFromOAuth);
        } else
          return reject(
            new makeError.UnprocessableEntity("Email Not Verified")
          );
      })
      .catch((err) => {
        return reject(new makeError.Unauthorized("Invalid Id Token"));
      });
  });
}

export { getUserDataFromAuth };
