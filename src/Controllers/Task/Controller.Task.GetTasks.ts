import { TaskDAO } from "../../DAO/DAO.Task";
import RouteHandler from "../RouteHandlerType";
import { UUIDType, AttachmentType } from "./../../Types/Types.Global";

interface ITaskWithoutAttachment {
    taskId: UUIDType,
    taskTitle: string,
    taskDescription: string,
    taskDeadline: Date,
    taskAttachmentType: AttachmentType
}

const getAllTasks: RouteHandler = async (req, res, next) => {
    const taskDao = new TaskDAO();
    try {
        const data = await taskDao.GetAllTasks();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
}

export { getAllTasks };