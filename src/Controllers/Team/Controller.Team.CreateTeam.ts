import { generateNewUUID } from "../../Helpers/Auth/Helper.Auth.Factory";
import { sendSession } from "../../Helpers/Auth/Helper.Auth.SessionTransportation";
import { makeError } from "../../Helpers/ErrorHandling/Helper.EH.MakeError";
import {
  UnitValidator,
  ValidationPipeline,
} from "../../Helpers/Validator/Helper.Validator.Global";
import { ITeam } from "../../Interfaces/Interface.Team";
import { SessionMAO } from "../../MAO/MAO.Session";
import { createTeam } from "../../Services/Team/Service.Team";
import RouteHandler from "../RouteHandlerType";
const CreateTeamPost: RouteHandler = (req, res, next) => {
  // required data to create a team
  const teamId = generateNewUUID();
  const creatorId = req.userData.userId;
  const teamName = req.body.teamName;
  const teamDescription = req.body.teamDescription;
  ValidateCreateTeam(teamName, teamDescription)
    .then(async () => {
      try {
        // validated input

        //creating the team
        const teamData : ITeam =  await createTeam({
          teamId : teamId,
          teamName : teamName,
          teamDescription : teamDescription,
          creatorId : creatorId
        })
        
        req.userData.teamId = teamData.teamId;
        //changing data in MAO
        await new SessionMAO().SetSession(req.sessionID, req.userData);

        sendSession(res, req.sessionID);

        res.status(201).json({
          status :201, 
          message : "Team Created Successfully"
        })

      } catch (err) {
        //internal server error or db error
        next(err);
      }
    })
    .catch((err) => {
      // invalid input
      next(new makeError.BadRequest(err));
    });
};

async function ValidateCreateTeam(teamName: string, teamDescription: string) {
  try {
    await ValidationPipeline(
      [
        UnitValidator.ValidateUndefined,
        UnitValidator.ValidateIsNotNull,
        UnitValidator.ValidateZeroLength,
      ],
      teamName,
      "team name"
    );
    await ValidationPipeline(
      [
        UnitValidator.ValidateUndefined,
        UnitValidator.ValidateIsNotNull,
        UnitValidator.ValidateZeroLength,
      ],
      teamDescription,
      "team description"
    );
    return true;
  } catch (err) {
    throw err;
  }
}
export { ValidateCreateTeam, CreateTeamPost };
