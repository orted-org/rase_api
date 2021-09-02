import { generateNewUUID } from "../../Helpers/Auth/Helper.Auth.Factory";
import { makeError } from "../../Helpers/ErrorHandling/Helper.EH.MakeError";
import { SaveFile } from "../../Helpers/FileHandling/Helper.FileHandler";
import {
  UnitValidator,
  ValidationPipeline,
} from "../../Helpers/Validator/Helper.Validator.Global";
import { TaskSubmissionType } from "../../Types/Types.Global";
import RouteHandler from "../RouteHandlerType";
const CreateTaskPost: RouteHandler = (req, res, next) => {
  // required data to create a task
  const taskId = generateNewUUID();
  const taskTitle = req.body.taskTitle;
  const taskDescription = req.body.taskDescription;
  const taskDeadline = req.body.taskDeadline;

  const taskSubmissionType: TaskSubmissionType = req.body.taskSubmissionType;
  ValidateCreateTask(
    taskTitle,
    taskDescription,
    taskDeadline,
    taskSubmissionType
  )
    .then(async () => {
      let taskAttachmentRef: string | null = null;
      if (taskSubmissionType === "file") {
        // do file saving here

        // this will return the file name with extension
        // if task id = 1a2b3c, and file is a pdf, it will return
        // 1a2b3c.pdf, without any path
        taskAttachmentRef = await SaveFile(taskId, req, res);
      }
    })
    .catch((err) => {
      // invalid input
      next(new makeError.BadRequest(err));
    });
};

async function ValidateCreateTask(
  taskTitle: string,
  taskDescription: string,
  taskDeadline: string,
  taskSubmissionType: TaskSubmissionType
) {
  try {
    await ValidationPipeline(
      [
        UnitValidator.ValidateUndefined,
        UnitValidator.ValidateIsNotNull,
        UnitValidator.ValidateZeroLength,
      ],
      taskTitle,
      "task title"
    );
    await ValidationPipeline(
      [
        UnitValidator.ValidateUndefined,
        UnitValidator.ValidateIsNotNull,
        UnitValidator.ValidateZeroLength,
      ],
      taskDescription,
      "task description"
    );
    await ValidationPipeline(
      [UnitValidator.ValidateIsFutureDate],
      taskDeadline,
      "task deadline"
    );
    switch (taskSubmissionType) {
      case "file":
        break;
      case "link":
        break;
      case "text":
        break;
      default:
        throw new Error("invalid deadline");
    }
    return true;
  } catch (err) {
    throw err;
  }
}
export { ValidateCreateTask, CreateTaskPost };
