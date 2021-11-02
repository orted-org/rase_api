import path from "path";
import { TaskDAO } from "../../DAO/DAO.Task";
import _path from "../../Helpers/Helper.rootPath";
import RouteHandler from "../RouteHandlerType";


const getTaskAttachment : RouteHandler = (req, res, next) => {
    const taskId = req.params.taskId;
    const taskDao = new TaskDAO();
    taskDao.GetTaskById(taskId)
        .then(task => {
            res.sendFile(path.join(_path, `../files/tasks/{task.taskAttachment}`));
        })
        .catch((err) => {
            next (err);
        })
}

export {getTaskAttachment};