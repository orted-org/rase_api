import { generateNewUUID } from "../../Helpers/Auth/Helper.Auth.Factory";
import { makeError } from "../../Helpers/ErrorHandling/Helper.EH.MakeError";
import {
  UnitValidator,
  ValidationPipeline,
} from "../../Helpers/Validator/Helper.Validator.Global";
import RouteHandler from "../RouteHandlerType";
const CreateTeamPost: RouteHandler = (req, res, next) => {
  // required data to create a team
  const teamId = generateNewUUID();
  const creatorId = req.userData.userId;
  const teamName = req.body.teamName;
  const teamDescription = req.body.teamDescription;
  ValidateCreateTeam(teamName, teamDescription)
    .then(() => {
      // validated input
    })
    .catch((err) => {
      // invalid input
      next(new makeError.BadGateway(err));
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
