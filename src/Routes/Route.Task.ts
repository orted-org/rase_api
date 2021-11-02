import express, { Application } from "express";
const router = express.Router();
import Logout from "../Controllers/Auth/Controller.Auth.Logout";
import { checkAllowance } from "../Controllers/Controller.Auth.CheckAllowance";
import {CreateTaskPost} from './../Controllers/Task/Controller.Task.CreateTask';
import {getTaskById} from './../Controllers/Task/Controller.Task.GetTaskById';
import {getAllTasks} from './../Controllers/Task/Controller.Task.GetTasks';

//login routes
router.get("/getTask/:taskId", checkAllowance as Application, getTaskById as Application);
router.post("/addTask", checkAllowance as Application, CreateTaskPost as Application);
router.get('/getTasks', checkAllowance as Application, getAllTasks as Application);
router.get('/getTaskAttachment/:taskId', checkAllowance as Application, );

export default router;
