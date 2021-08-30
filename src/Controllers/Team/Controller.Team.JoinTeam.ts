import { generateNewUUID } from "../../Helpers/Auth/Helper.Auth.Factory";
import { makeError } from "../../Helpers/ErrorHandling/Helper.EH.MakeError";
import {
  UnitValidator,
  ValidationPipeline,
} from "../../Helpers/Validator/Helper.Validator.Global";
import RouteHandler from "../RouteHandlerType";
const JoinTeamPost: RouteHandler = (req, res, next) => {
  const userId = req.userData.userId;
  const teamId = req.body.teamId;
  ValidateJoinTeam(teamId)
    .then(() => {
      // validated input
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
