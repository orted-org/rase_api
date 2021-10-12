import { makeError } from "../../Helpers/ErrorHandling/Helper.EH.MakeError";
import RouteHandler from "../RouteHandlerType";
import {professors} from "./../../prof_year.json";
import {ITask} from "./../../Interfaces/Interface.Task"
import {generateNewTaskID} from "./../../Helpers/Helper.Task.Factory"

import {
    UnitValidator,
    ValidationPipeline,
  } from "../../Helpers/Validator/Helper.Validator.Global";

const CreateTaskPost : RouteHandler = (req, res, next) => {
    if(!professors.includes(req.userData.email)) {
        return next(new makeError.Unauthorized());
    }
    
    const newTask : ITask = {
        taskId : generateNewTaskID(),
        taskAttachment : req.body.taskAttachment,
        taskDeadline : req.body.taskDeadline,
        taskDescription : req.body.taskDescription,
        taskSubmissionType : req.body.taskDescription,
        taskTitle : req.body.taskTitle
    };

    

}

async function ValidateCreateTask (taskData : ITask) {
    try {
        
    } catch (err) {
        throw err;
    }
}