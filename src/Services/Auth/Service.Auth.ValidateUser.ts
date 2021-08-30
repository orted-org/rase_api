import { makeError } from "../../Helpers/ErrorHandling/Helper.EH.MakeError";
import { currentYear, professors, domain } from "../../prof_year.json";
import { OAuthPayload } from "../../Interfaces/Interfaces.Auth";
//validating the user
const ValidateUser = (dataFromOAuth: OAuthPayload): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    try {
      const email = dataFromOAuth.email;

      if (professors.includes(email)) {
        //user is professor;
        return resolve(true);
      }
      // user is not a professor
      const emailSplit = email.split("@");
      if (emailSplit[1] !== domain) {
        // the email does not have required domain
        return reject(new makeError.UnprocessableEntity("email not allowed"));
      }

      //checking for the year
      const regNo = getRegistrationId(emailSplit[0]);

      if (Number((regNo + "").substr(2, 2)) == currentYear) {
        //user is from given year
        return resolve(true);
      } else
        return reject(new makeError.UnprocessableEntity("email not allowed"));
    } catch (err) {
      return reject(err);
    }
  });
};
function getRegistrationId(str: string): number {
  let regId = -1;
  const num = str.match(/\d+/g);
  if (num) {
    for (let i = 0; i < num.length; i++) {
      if (Number(num[i]) < regId) regId = Number(num[i]);
    }
  }
  return regId;
}
export { ValidateUser };
