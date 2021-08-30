import { UUIDType } from "../Types/Types.Global";

interface ITeam {
    teamId : UUIDType,
    teamName : string,
    description : string,
    creatorId : UUIDType
}
export { ITeam }