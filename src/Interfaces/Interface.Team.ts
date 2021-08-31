import { UUIDType } from "../Types/Types.Global";

interface ITeam {
    teamId : UUIDType,
    teamName : string,
    teamDescription : string,
    creatorId : UUIDType
}
export { ITeam }