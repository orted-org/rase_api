import express, { Application } from "express";
import { checkTeacher } from "../Controllers/Controller.Auth.CheckAllowance";
import { CreateTaskPost } from "../Controllers/Task/Controller.Task.CreateTask";
const router = express.Router();

router.post(
  "/create",
  // only allowing teacher
  checkTeacher as Application,
  CreateTaskPost as Application
);
export default router;
