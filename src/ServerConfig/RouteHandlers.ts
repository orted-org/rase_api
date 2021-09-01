import { Application } from "express";
import AuthRoute from "../Routes/Route.Auth";
import TeamRoute from "../Routes/Route.Team";
import TaskRoute from "../Routes/Route.Task";
import { checkAllowance } from "../Controllers/Controller.Auth.CheckAllowance";
function HandleRoutesFor(server: Application) {
  server.use("/auth", AuthRoute);
  server.use("/team", checkAllowance as Application, TeamRoute);
  server.use("/task", checkAllowance as Application, TaskRoute);
}

export default HandleRoutesFor;
