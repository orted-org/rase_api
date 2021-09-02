import { makeError } from "../../Helpers/ErrorHandling/Helper.EH.MakeError";
import {
  UnitValidator,
  ValidationPipeline,
} from "../../Helpers/Validator/Helper.Validator.Global";
import RouteHandler from "../RouteHandlerType";
const CreateTaskPost: RouteHandler = (req, res, next) => {
  // required data to create a task
  const isTask = req.query.type == "task";
  const incomingId = req.query.id as string;

  ValidateGetFile(incomingId)
    .then(async () => {
      //check from db if the user is allowed to have the file

    })
    .catch((err) => {
      // invalid request
      next(new makeError.BadRequest(err));
    });
};

async function ValidateGetFile(incomingId: string) {
  try {
    await ValidationPipeline(
      [
        UnitValidator.ValidateUndefined,
        UnitValidator.ValidateIsNotNull,
        UnitValidator.ValidateZeroLength,
        UnitValidator.ValidateIsUUID,
      ],
      incomingId,
      "incoming id"
    );

    return true;
  } catch (err) {
    throw err;
  }
}
export { ValidateGetFile, CreateTaskPost };
