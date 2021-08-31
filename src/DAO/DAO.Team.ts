import { TEAM_TABLE } from "./DAO.DBInfo";
import { ITeam } from "../Interfaces/Interface.Team"
import { UUIDType } from "../Types/Types.Global";
import DBError from "../Helpers/ErrorHandling/Helper.EH.DBError";
import { client } from "../Helpers/Helper.DBInit";
import { makeError } from "../Helpers/ErrorHandling/Helper.EH.MakeError";

interface ICreateTeamParams extends ITeam {}
interface ITeamDAO {
    CreateTeam : ( teamData : ICreateTeamParams ) => Promise<ITeam>;
    GetTeamById : ( teamId : UUIDType ) => Promise<ITeam | null>;
    UpdateTeamById : (teamId : UUIDType, newName : string,  newDesription : string) => Promise<ITeam | null>;
    DeleteTeamById : (teamId : UUIDType, creatorId : UUIDType) => Promise<ITeam | null>;
}

const _createTeam = `
                    INSERT INTO ${TEAM_TABLE.name}
                    (
                        ${TEAM_TABLE.attr.teamId},
                        ${TEAM_TABLE.attr.teamName},
                        ${TEAM_TABLE.attr.teamDescription},
                        ${TEAM_TABLE.attr.creatorId}
                    )
                    VALUES ($1, $2, $3, $4)
                    RETURNING 
                        ${TEAM_TABLE.attr.teamId},
                        ${TEAM_TABLE.attr.teamName},
                        ${TEAM_TABLE.attr.teamDescription},
                        ${TEAM_TABLE.attr.creatorId}
                    `;
const _getTeamById = `
                    SELECT 
                        ${TEAM_TABLE.attr.teamId},
                        ${TEAM_TABLE.attr.teamName},
                        ${TEAM_TABLE.attr.teamDescription},
                        ${TEAM_TABLE.attr.creatorId}
                    FROM ${TEAM_TABLE.name} 
                    WHERE 
                        ${TEAM_TABLE.attr.teamId} = $1
                    `;
const _updateTeamById = `
                    UPDATE ${TEAM_TABLE.name}
                    SET
                        ${TEAM_TABLE.attr.teamName} = $1,
                        ${TEAM_TABLE.attr.teamDescription} = $2
                    WHERE
                        ${TEAM_TABLE.attr.teamId} = $3
                    RETURNING 
                        ${TEAM_TABLE.attr.teamId},
                        ${TEAM_TABLE.attr.teamName},
                        ${TEAM_TABLE.attr.teamDescription},
                        ${TEAM_TABLE.attr.creatorId}
                    `;
const _deleteTeamById = `
                    DELETE FROM ${TEAM_TABLE.name}
                    WHERE 
                        ${TEAM_TABLE.attr.teamId} = $1 AND ${TEAM_TABLE.attr.creatorId} = $2
                    RETURNING 
                        ${TEAM_TABLE.attr.teamId},
                        ${TEAM_TABLE.attr.teamName},
                        ${TEAM_TABLE.attr.teamDescription},
                        ${TEAM_TABLE.attr.creatorId}
                    `
class TeamDAO implements ITeamDAO {
    CreateTeam( teamData : ICreateTeamParams ) : Promise<ITeam>{
        return new Promise<ITeam> (async (resolve, reject)=>{
            try {
                const data = await client.query(_createTeam, [
                    teamData.teamId,
                    teamData.teamName,
                    teamData.teamDescription,
                    teamData.creatorId
                ]);
                if (data.rows.length === 0) {
                    //something went wrong
                    return reject(new makeError.InternalServerError());
                }
                return resolve({
                    teamId : data.rows[0][TEAM_TABLE.attr.teamId],
                    teamName : data.rows[0][TEAM_TABLE.attr.teamName],
                    teamDescription : data.rows[0][TEAM_TABLE.attr.teamDescription],
                    creatorId : data.rows[0][TEAM_TABLE.attr.creatorId]
                });
            } catch (err) {
                return reject(DBError(err));
            }
        })  
    }
    GetTeamById( teamId : UUIDType ) : Promise<ITeam | null>{
        return new Promise<ITeam | null > (async (resolve, reject)=>{
            try {
                const data = await client.query(_getTeamById, [teamId]);
                if (data.rows.length === 0) {
                    //no such team found
                    return resolve(null);
                }
                return resolve({
                    teamId : data.rows[0][TEAM_TABLE.attr.teamId],
                    teamName : data.rows[0][TEAM_TABLE.attr.teamName],
                    teamDescription : data.rows[0][TEAM_TABLE.attr.teamDescription],
                    creatorId : data.rows[0][TEAM_TABLE.attr.creatorId]
                });
            } catch (err) {
                return reject(DBError(err));
            }
        })  
    }
    UpdateTeamById(teamId : UUIDType, newName : string,  newDesription : string) : Promise<ITeam | null>{
        return new Promise<ITeam | null > (async (resolve, reject)=>{
            try {
                const data = await client.query(_updateTeamById, [newName, newDesription, teamId]);
                if (data.rows.length === 0) {
                    //no such team found
                    return resolve(null);
                }
                return resolve({
                    teamId : data.rows[0][TEAM_TABLE.attr.teamId],
                    teamName : data.rows[0][TEAM_TABLE.attr.teamName],
                    teamDescription : data.rows[0][TEAM_TABLE.attr.teamDescription],
                    creatorId : data.rows[0][TEAM_TABLE.attr.creatorId]
                });
            } catch (err) {
                return reject(DBError(err));
            }
        })
    }
    DeleteTeamById(teamId : UUIDType, creatorId : UUIDType) : Promise<ITeam | null>{
        return new Promise<ITeam | null > (async (resolve, reject)=>{
            try {
                const data = await client.query(_deleteTeamById, [teamId, creatorId]);
                if (data.rows.length === 0) {
                    return reject(new makeError.Unauthorized("Only Team creator can delete"));
                }
                return resolve({
                    teamId : data.rows[0][TEAM_TABLE.attr.teamId],
                    teamName : data.rows[0][TEAM_TABLE.attr.teamName],
                    teamDescription : data.rows[0][TEAM_TABLE.attr.teamDescription],
                    creatorId : data.rows[0][TEAM_TABLE.attr.creatorId]
                });
            } catch (err) {
                return reject(DBError(err));
            }
        })
    }
}           

export { TeamDAO };