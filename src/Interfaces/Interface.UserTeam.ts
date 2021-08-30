import { UUIDType } from "../Types/Types.Global";

export interface IUserTeam { 
    userId : UUIDType,
    teamId : UUIDType
}
export interface ITeamMemberData {
    userId : UUIDType,
    fullName : string,
    email : string
}
export interface ITeamData { 
    teamId : UUIDType,
    teamName : string,
    creatorId : UUIDType,
    creatorName :  string,
    creatorEmail : string,
    teamMembers : ITeamMemberData[]
}