import { TeamDAO } from "../../DAO/DAO.Team";
import { UserTeamsDAO } from "../../DAO/DAO.UserTeams";
import { ITeam } from "../../Interfaces/Interface.Team";
import { IUserTeam } from "../../Interfaces/Interface.UserTeam";

/*
creating the team
changing session data in cache
changing session in res.cookie
*/

function createTeam(teamData : ITeam) : Promise<ITeam> {
    return new Promise<ITeam> (async(resolve, reject)=>{
        try {
            const data : ITeam = await new TeamDAO().CreateTeam(teamData);
            resolve(data);
        } catch (err) {
            reject(err);
        }
    })
}

function joinTeam(userTeamData : IUserTeam) : Promise<IUserTeam>{
    return new Promise<IUserTeam> (async(resolve, reject)=>{
        try {
            const data : IUserTeam = await new UserTeamsDAO().InsertUserTeamRow(userTeamData);
            resolve(data);
        } catch (err) {
            reject(err);
        }
    })
}

export { createTeam, joinTeam }