import { makeError } from "../../Helpers/ErrorHandling/Helper.EH.MakeError";
import { OAuthPayload } from "../../Interfaces/Interfaces.Auth"
const ValidateUser = (dataFromOAuth : OAuthPayload) : Promise<boolean> => {
    return new Promise<boolean> ((resolve, reject)=>{
        try {
            //validing the user 
            resolve(true);

            //restricting other users
            // reject(makeError(422, "Invalid User"));
            
        } catch (err) {
            reject(err);
        }
    })
}

export { ValidateUser };