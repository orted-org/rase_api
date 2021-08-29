import { makeError } from "../../Helpers/ErrorHandling/Helper.EH.MakeError";
import { currentYear, professors, domain } from "../../prof_year.json"
import { OAuthPayload } from "../../Interfaces/Interfaces.Auth"
const ValidateUser = (dataFromOAuth : OAuthPayload) : Promise<boolean> => {
    return new Promise<boolean> ((resolve, reject)=>{
        try {
            //validing the user 

            const email  = dataFromOAuth.email;

            //user is professor;
            if(professors.includes(email)) return resolve(true);
            const emailSplit = email.split('@');

            if(emailSplit[1] !== domain) return reject(makeError(422, "Email not verified"));
            //domain mathches

            const regNo = emailSplit[0].split('_')[1];

            if(regNo!=undefined && regNo.substr(2, 2) as unknown as number == currentYear){
                //user is from given year
                return resolve(true);
            }
            else return reject(makeError(422, "Email not verified"));
 
        } catch (err) {
            reject(err);
        }
    })
}

export { ValidateUser };