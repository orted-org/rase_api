import { sendSession } from "../../Helpers/Auth/Helper.Auth.SessionTransportation";
import { makeError } from "../../Helpers/ErrorHandling/Helper.EH.MakeError";
import {
  UnitValidator,
  ValidationPipeline,
} from "../../Helpers/Validator/Helper.Validator.Global";
import { IUserTeam } from "../../Interfaces/Interface.UserTeam";
import { SessionMAO } from "../../MAO/MAO.Session";
import { joinTeam } from "../../Services/Team/Service.Team";
import RouteHandler from "../RouteHandlerType";
const JoinTeamPost: RouteHandler = (req, res, next) => {
  const userId = req.userData.userId;
  const teamId = req.body.teamId;
  ValidateJoinTeam(teamId)
    .then(async () => {
      try {
        //validated input
        const userTeamData: IUserTeam = await joinTeam({
          userId: userId,
          teamId: teamId,
        });
        req.userData.teamId = userTeamData.teamId;
        //changing data in MAO
        await new SessionMAO().SetSession(req.sessionID, req.userData);

        sendSession(res, req.sessionID);

        res.status(201).json({
          status: 201,
          message: "Team Joined successfully",
        });
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => {
      // invalid input
      next(new makeError.BadRequest(err));
    });
};

async function ValidateJoinTeam(teamId: string) {
  try {
    await ValidationPipeline(
      [
        UnitValidator.ValidateUndefined,
        UnitValidator.ValidateIsNotNull,
        UnitValidator.ValidateZeroLength,
        UnitValidator.validateIsUUID,
      ],
      teamId,
      "team id"
    );

    return true;
  } catch (err) {
    throw err;
  }
}
export { ValidateJoinTeam, JoinTeamPost };
