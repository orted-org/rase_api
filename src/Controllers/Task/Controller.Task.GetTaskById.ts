import RouteHandler from "../RouteHandlerType";
import {TaskDAO} from "./../../DAO/DAO.Task";

const getTaskById : RouteHandler = async (req, res, next) => {
    const taskId = req.params.taskId;
    const taskDao = new TaskDAO();
    try {
        const task = await taskDao.GetTaskById(taskId);
        res.status(200).json(task);
    } catch (err) {
        next(err);
    }
}

export {getTaskById}