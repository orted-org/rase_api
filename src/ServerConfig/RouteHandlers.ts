import { Application } from "express";
import { checkAllowance } from "../Controllers/Controller.Auth.CheckAllowance";
import AuthRoute from "../Routes/Route.Auth";
import TeamRoute from "../Routes/Route.Team";
import TaskRoute from "../Routes/Route.Task";
import FileRoute from "../Routes/Route.File";
function HandleRoutesFor(server: Application) {
  server.use("/auth", AuthRoute);
  server.use("/team", checkAllowance as Application, TeamRoute);
  server.use("/task", checkAllowance as Application, TaskRoute);
  server.use("/file", checkAllowance as Application, FileRoute);
}

export default HandleRoutesFor;
