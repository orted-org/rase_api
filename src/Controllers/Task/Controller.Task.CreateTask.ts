import { makeError } from "../../Helpers/ErrorHandling/Helper.EH.MakeError";
import RouteHandler from "../RouteHandlerType";
import { professors } from "../../prof_year.json";
import { ITask } from "../../Interfaces/Interface.Task"
import { generateNewTaskID } from "../../Helpers/Helper.Task.Factory"
import {TaskDAO} from "../../DAO/DAO.Task";
import {UploadFile} from "../../Helpers/FileHandling/Helper.FH.fileUpload";
import path from "path";

import {
    UnitValidator,
    ValidationPipeline,
} from "../../Helpers/Validator/Helper.Validator.Global";
import { isPromise } from "util/types";


const CreateTaskPost: RouteHandler = async (req, res, next) => {
    if (!professors.includes(req.userData.email)) {
        return next(new makeError.Unauthorized());
    }

    let taskAttachment : string = "";

    if(req.body.taskAttachmentType === "file") {
        try {
            taskAttachment = await UploadFile(req, res);
        } catch (err) {
            next (err);
        }
    } else {
        taskAttachment = req.body.taskAttachment;
    }

    const newTask: ITask = {
        taskId: generateNewTaskID(),
        taskDeadline: req.body.taskDeadline,
        taskAttachment : taskAttachment,
        taskDescription: req.body.taskDescription,
        taskAttachmentType: req.body.taskAttachmentType,
        taskTitle: req.body.taskTitle
    };

    ValidateCreateTask(newTask)
        .then(() => {
            const taskDao = new TaskDAO();
            taskDao.CreateTask(newTask)
                .then(() => {
                    res.header('foo',JSON.stringify(newTask));
                    res.status(201).sendFile(path.join(__dirname, newTask.taskAttachment));
                })
                .catch((err) => {
                    throw err;
                });
        })
        .catch((err) => {
            next(err);
        });
}

async function ValidateCreateTask(taskData: ITask) {
    try {
        for (const prop in taskData) {
            if(prop === "taskId")
                continue;
            await ValidationPipeline([
                UnitValidator.ValidateIsNotNaN,
                UnitValidator.ValidateIsNotNull,
                UnitValidator.ValidateUndefined,
                UnitValidator.ValidateZeroLength
            ],
                prop,
                prop
            );
        }
    } catch (err) {
        throw err;
    }
}

export {CreateTaskPost}