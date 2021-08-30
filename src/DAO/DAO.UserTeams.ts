import { UUIDType } from "../Types/Types.Global";
import { TEAM_TABLE, USER_TABLE, USER_TEAMS_TABLE } from "./DAO.DBInfo";
import { IUserTeam, ITeamData, ITeamMemberData } from "../Interfaces/Interface.UserTeam";
import DBError from "../Helpers/ErrorHandling/Helper.EH.DBError";
import { client } from "../Helpers/Helper.DBInit";
import { makeError } from "../Helpers/ErrorHandling/Helper.EH.MakeError";
interface IUserTeamsDAO {
    InsertUserTeamRow : ( userTeamData : IUserTeam ) => Promise<IUserTeam>;
    GetAllTeamsWithUsers : () => Promise<ITeamData[]>
}

const _insertUserTeamRow = `
                            INSERT INTO ${USER_TEAMS_TABLE.name}
                            (
                                ${USER_TEAMS_TABLE.attr.userId},
                                ${USER_TEAMS_TABLE.attr.teamId}
                            )
                            VALUES ($1, $2)
                            RETURNING 
                                ${USER_TEAMS_TABLE.attr.userId},
                                ${USER_TEAMS_TABLE.attr.teamId}
                            `;
const _getAllTeamsWithUsers = `
                            SELECT 
                                ${TEAM_TABLE.attr.teamId},
                                ${TEAM_TABLE.attr.teamName},
                                creator_id,
                                creator_name,
                                creator_email,
                                json_agg(json_build_object('user_id', ${USER_TABLE.attr.userId},'full_name', ${USER_TABLE.attr.fullName}, 'email', ${USER_TABLE.attr.email})) AS team_members
                            FROM ${USER_TEAMS_TABLE.name} 
                            NATURAL JOIN
                                (
                                    SELECT 
                                        ${TEAM_TABLE.attr.teamId}, 
                                        ${TEAM_TABLE.attr.teamName}, 
                                        ${TEAM_TABLE.attr.creatorId}, 
                                        full_name AS creator_name,
                                        email AS creator_email
                                    FROM ${TEAM_TABLE.name}, ${USER_TABLE.name}
                                    WHERE ${TEAM_TABLE.attr.creatorId} = ${USER_TABLE.attr.userId}
                                )
                            AS temp_tab1 
                            NATURAL JOIN 
                                ${USER_TABLE.name}
                            WHERE 
                                ${TEAM_TABLE.attr.creatorId} != ${USER_TABLE.attr.userId}
                            GROUP BY 
                                ${TEAM_TABLE.attr.teamId}, 
                                ${TEAM_TABLE.attr.teamName}, 
                                ${TEAM_TABLE.attr.creatorId}, 
                                creator_name,
                                creator_email
                            `;
class UserTeamsDAO implements IUserTeamsDAO {
    InsertUserTeamRow( userTeamData : IUserTeam ) : Promise<IUserTeam>{
        return new Promise<IUserTeam> (async(resolve, reject)=>{
            try {
                let data = await client.query(_insertUserTeamRow, [userTeamData.userId, userTeamData.teamId]);
                if (data.rows.length === 0) {
                    //something went wrong
                    return reject(new makeError.InternalServerError());
                }
                return resolve({
                    userId : data.rows[0][USER_TABLE.attr.userId],
                    teamId : data.rows[0][TEAM_TABLE.attr.teamId],
                });
            } catch (err) {
                return reject(DBError(err));
            }
        })
    }
    GetAllTeamsWithUsers() : Promise<ITeamData[]>{
        return new Promise<ITeamData[]>(async(resolve,reject)=>{
            try {
                let data = await client.query(_getAllTeamsWithUsers);
                let res : ITeamData[] = [];
                for(let i =0 ;i <data.rows.length;i++){
                    let tempTeamMembers : ITeamMemberData[] = []
                    for(let j=0;j < data.rows[i]["team_members"].length;j++){
                        tempTeamMembers.push({
                            userId : data.rows[i]["team_members"][j][USER_TABLE.attr.userId],
                            fullName : data.rows[i]["team_members"][j][USER_TABLE.attr.fullName],
                            email : data.rows[i]["team_members"][j][USER_TABLE.attr.email]
                        });
                    }
                    let tempTeamData : ITeamData = {
                        teamId : data.rows[i][TEAM_TABLE.attr.teamId],
                        teamName : data.rows[i][TEAM_TABLE.attr.teamName],
                        creatorId : data.rows[i][TEAM_TABLE.attr.creatorId],
                        creatorName : data.rows[i]["creator_name"],
                        creatorEmail : data.rows[i]["creator_email"],
                        teamMembers : tempTeamMembers
                    };
                    res.push(tempTeamData);
                }
                return resolve(res);
            } catch (err) {
                return reject(DBError(err));
            }
        })
    }
}
export { UserTeamsDAO };