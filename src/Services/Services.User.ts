import User from "../Class/Class.User";
import UserDetail from "../Class/Class.UserDetails";
import { SESSION_DURATION } from "../Helpers/Auth/Helper.Auth.DurationHandler";
import { inMemSet } from "../Helpers/InMemDB/Helper.IMD";
import UserModel from "../Models/Model.User";

class UserService {
  userModel: UserModel;
  constructor(userModel: UserModel) {
    this.userModel = userModel;
  }
  updateFullName(
    sessionID: string,
    userId: string,
    incomingFirstName: string,
    incomingLastName: string
  ) {
    return new Promise<User>((resolve, reject) => {
      this.userModel
        .updateNameInDB(userId, incomingFirstName, incomingLastName)
        .then((userData) => {
          // updating the in memory db for the name change
          inMemSet(
            sessionID,
            JSON.stringify(userData),
            SESSION_DURATION.secFormat
          )
            .then((res) => {
              return resolve(userData);
            })
            .catch((err) => {
              // internal server error
              return reject(err);
            });
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }
}

export default UserService;
