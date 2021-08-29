import DBError from "../Helpers/ErrorHandling/Helper.EH.DBError";
import { client } from "../Helpers/Helper.DBInit";
import { USER_TABLE, USER_ROLE_TYPE, TEAM_TABLE, USER_TEAMS_TABLE } from "./DAO.DBInfo";


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

const _createTeamTable = `CREATE TABLE IF NOT EXISTS ${TEAM_TABLE.name}
(
    ${TEAM_TABLE.attr.teamId} UUID PRIMARY KEY,
    ${TEAM_TABLE.attr.teamName} TEXT NOT NULL,
    ${TEAM_TABLE.attr.description} TEXT,
    ${TEAM_TABLE.attr.creatorId} UUID UNIQUE NOT NULL,
    FOREIGN KEY(${TEAM_TABLE.attr.creatorId}) REFERENCES ${USER_TABLE.name}(${USER_TABLE.attr.userId}) ON DELETE CASCADE
)`;

const _createUserTeamsTable = `CREATE TABLE IF NOT EXISTS ${USER_TEAMS_TABLE.name}
(
    ${USER_TEAMS_TABLE.attr.userId} UUID UNIQUE NOT NULL,
    ${USER_TEAMS_TABLE.attr.teamId} UUID NOT NULL,
    FOREIGN KEY(${USER_TEAMS_TABLE.attr.userId}) REFERENCES ${USER_TABLE.name}(${USER_TABLE.attr.userId}) ON DELETE CASCADE ,
    FOREIGN KEY(${USER_TEAMS_TABLE.attr.teamId}) REFERENCES ${TEAM_TABLE.name}(${TEAM_TABLE.attr.teamId}) ON DELETE CASCADE
);
                            `

interface IMigrateDAO {
    CreateUserRoleType : () => Promise<void>;
    CreateUserTable : () => Promise<void>;
    CreateTeamTable : () => Promise<void>;
    CreateUserTeamsTable : () => Promise<void>;
    MigrateDAOFinal : () => Promise<void>;
}

class MigrateDAO implements IMigrateDAO {
    CreateUserRoleType(){
        return new Promise<void>((resolve, reject)=>{
            client.query(_createUserRoleType).then(res=>{
                resolve();
            })
            .catch(err=>{
                reject(DBError(err));
            })
        })
    }
    CreateUserTable(){
        return new Promise<void>((resolve, reject)=>{
            client.query(_createUserTable).then(res=>{
                resolve();
            })
            .catch(err=>{
                reject(DBError(err));
            })
        })
    }
    CreateTeamTable(){
        return new Promise<void>((resolve, reject)=>{
            client.query(_createTeamTable).then(res=>{
                resolve();
            })
            .catch(err=>{
                reject(DBError(err));
            })
        })
    }
    CreateUserTeamsTable(){
        return new Promise<void>((resolve, reject)=>{
            client.query(_createUserTeamsTable).then(res=>{
                resolve();
            })
            .catch(err=>{
                reject(DBError(err));
            })
        })
    }
    MigrateDAOFinal(){
        return new Promise<void>(async(resolve, reject)=>{
            try {
                await this.CreateUserRoleType();
                await this.CreateUserTable();
                await this.CreateTeamTable();
                await this.CreateUserTeamsTable();
                resolve();
            } catch (err) {
                reject(DBError(err));
            }
        })
    }
}

export { MigrateDAO }