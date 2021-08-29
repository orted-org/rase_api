import { client } from "../Helpers/Helper.DBInit";
import { USER_TABLE, USER_ROLE_TYPE } from "./DAO.DBInfo";


const _createUserRoleType = `DO $$ BEGIN
CREATE TYPE ${USER_ROLE_TYPE.name} AS ENUM ('${USER_ROLE_TYPE.enum.student}', '${USER_ROLE_TYPE.enum.teacher}');
EXCEPTION
WHEN duplicate_object THEN null;
END $$`;

const _createUserTable = `CREATE TABLE IF NOT EXISTS ${USER_TABLE.name} 
(
    ${USER_TABLE.attr.userId} UUID PRIMARY KEY,
    ${USER_TABLE.attr.fullName} TEXT NOT NULL,
    ${USER_TABLE.attr.profilePicture} TEXT,
    ${USER_TABLE.attr.subId} TEXT UNIQUE NOT NULL,
    ${USER_TABLE.attr.email} TEXT UNIQUE NOT NULL,
    ${USER_TABLE.attr.role} user_role_type NOT NULL DEFAULT '${USER_ROLE_TYPE.enum.student}'
)`;

interface IMigrateDAO {
    CreateUserRoleType : () => Promise<void>;
    CreateUserTable : () => Promise<void>;
    MigrateDAOFinal : () => Promise<void>;
}

class MigrateDAO implements IMigrateDAO {
    CreateUserRoleType(){
        return new Promise<void>((resolve, reject)=>{
            client.query(_createUserRoleType).then(res=>{
                resolve();
            })
            .catch(err=>{
                reject(err);
            })
        })
    }
    CreateUserTable(){
        return new Promise<void>((resolve, reject)=>{
            client.query(_createUserTable).then(res=>{
                resolve();
            })
            .catch(err=>{
                reject(err);
            })
        })
    }
    MigrateDAOFinal(){
        return new Promise<void>(async(resolve, reject)=>{
            try {
                await this.CreateUserRoleType();
                await this.CreateUserTable();
                resolve();
            } catch (err) {
                reject(err);
            }
        })
    }
}

export { MigrateDAO }