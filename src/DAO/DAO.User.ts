import DBError from "../Helpers/ErrorHandling/Helper.EH.DBError";
import { makeError } from "../Helpers/ErrorHandling/Helper.EH.MakeError";
import { client } from "../Helpers/Helper.DBInit";
import { IUser } from "../Interfaces/Interface.User";
import { SubIdType } from "../Types/Types.Global";
import { USER_TABLE } from "./DAO.DBInfo";
interface ICreateUserParams extends IUser {}
interface IUserDAO {
  CreateUser: (userData: ICreateUserParams) => Promise<IUser>;
  GetUserBySubId: (subId: SubIdType) => Promise<IUser | null>;
}
const _createUser = `
                    INSERT INTO ${USER_TABLE.name}
                    (
                        ${USER_TABLE.attr.userId},
                        ${USER_TABLE.attr.subId},
                        ${USER_TABLE.attr.fullName},
                        ${USER_TABLE.attr.email},
                        ${USER_TABLE.attr.profilePicture},
                        ${USER_TABLE.attr.role}
                    )
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING 
                        ${USER_TABLE.attr.userId},
                        ${USER_TABLE.attr.subId},
                        ${USER_TABLE.attr.fullName},
                        ${USER_TABLE.attr.email},
                        ${USER_TABLE.attr.profilePicture},
                        ${USER_TABLE.attr.role}
                    `;
const _getUserBySubId = `
                        SELECT 
                            ${USER_TABLE.attr.userId},
                            ${USER_TABLE.attr.subId},
                            ${USER_TABLE.attr.fullName},
                            ${USER_TABLE.attr.email},
                            ${USER_TABLE.attr.profilePicture},
                            ${USER_TABLE.attr.role}
                        FROM ${USER_TABLE.name} 
                        WHERE 
                            ${USER_TABLE.attr.subId} = $1
                        `;
class UserDAO implements IUserDAO {
  CreateUser(userData: ICreateUserParams) {
    return new Promise<IUser>((resolve, reject) => {
      client
        .query(_createUser, [
          userData.userId,
          userData.subId,
          userData.fullName,
          userData.email,
          userData.profilePicture,
          userData.role,
        ])
        .then((data) => {
          if (data.rows.length === 0) {
            //something went wrong
            return reject(new makeError.InternalServerError());
          }
          return resolve({
            userId: data.rows[0][USER_TABLE.attr.userId],
            subId: data.rows[0][USER_TABLE.attr.subId],
            fullName: data.rows[0][USER_TABLE.attr.fullName],
            email: data.rows[0][USER_TABLE.attr.email],
            profilePicture: data.rows[0][USER_TABLE.attr.profilePicture],
            role: data.rows[0][USER_TABLE.attr.role],
          });
        })
        .catch((err) => {
          return reject(DBError(err));
        });
    });
  }
  GetUserBySubId(subId: SubIdType) {
    return new Promise<IUser | null>((resolve, reject) => {
      client
        .query(_getUserBySubId, [subId])
        .then((data) => {
          if (data.rows.length === 0) {
            return resolve(null);
          }
          return resolve({
            userId: data.rows[0][USER_TABLE.attr.userId],
            subId: data.rows[0][USER_TABLE.attr.subId],
            fullName: data.rows[0][USER_TABLE.attr.fullName],
            email: data.rows[0][USER_TABLE.attr.email],
            profilePicture: data.rows[0][USER_TABLE.attr.profilePicture],
            role: data.rows[0][USER_TABLE.attr.role],
          });
        })
        .catch((err) => {
          return reject(DBError(err));
        });
    });
  }
}
export { UserDAO };
