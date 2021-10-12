import { professors } from "../../prof_year.json";
import { makeError } from "../../Helpers/ErrorHandling/Helper.EH.MakeError";
import { inMemSet } from "../../Helpers/InMemDB/Helper.IMD";
import { ISession, OAuthPayload } from "../../Interfaces/Interfaces.Auth";
import {
  generateNewUserID,
  generateSessionID,
} from "../../Helpers/Auth/Helper.Auth.Factory";
import { SESSION_DURATION } from "../../Helpers/Auth/Helper.Auth.DurationHandler";
import { UserDAO } from "../../DAO/DAO.User";
import { IUser } from "../../Interfaces/Interface.User";
import { UserRoleType } from "../../Types/Types.Global";

interface UserDataWithSession {
  session: ISession;
  sessionId: string;
}

function performLogin(dataFromOAuth: OAuthPayload, userDao: UserDAO) {
  return new Promise<UserDataWithSession>(async (resolve, reject) => {
    try {
      const session = await handleUserAccount(dataFromOAuth, userDao);

      // generating session for the user
      const sessionId = generateSessionID();

      return resolve({ session, sessionId });
    } catch (err) {
      return reject(err);
    }
  });
}

function handleUserAccount(dataFromOAuth: OAuthPayload, userDao: UserDAO) {
  return new Promise<ISession>(async (resolve, reject) => {
    // checking if the user with following subId exists in our DB
    try {
      const user = await userDao.GetUserWithTeamIdBySubId(dataFromOAuth.subId);
      if (user === null) {
        // the user does not exists and we need to create user
        createNewUser(dataFromOAuth, userDao)
          .then((dataOfNewUser) => {
            //returning back the data of new user
            return resolve({ ...dataOfNewUser, teamId: null });
          })
          .catch((err) => {
            // internal server error or DB error
            return reject(err);
          });
      } else {
        // the user already exists and no need to create user
        return resolve(user);
      }
    } catch (err) {
      return reject(err);
    }
  });
}

function createNewUser(dataFromOAuth: OAuthPayload, userDao: UserDAO) {
  return new Promise<IUser>((resolve, reject) => {
    //creating user object with the data from OAuth
    const newUserDetails: IUser = {
      userId: generateNewUserID(),
      fullName: dataFromOAuth.fullName,
      email: dataFromOAuth.email,
      profilePicture: dataFromOAuth.profilePicture,
      subId: dataFromOAuth.subId,
      role: gettingRoleOfUser(dataFromOAuth),
    };

    //storing the user in db
    userDao
      .CreateUser(newUserDetails)
      .then((data) => {
        return resolve(data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

//logic to get the role of user
function gettingRoleOfUser(dataFromOAuth: OAuthPayload): UserRoleType {
  if (professors.includes(dataFromOAuth.email)) {
    return "teacher";
  } else return "student";
}

export { performLogin };
