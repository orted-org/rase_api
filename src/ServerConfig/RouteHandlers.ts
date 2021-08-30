import { Application } from "express";
import AuthRoute from "../Routes/Route.Auth";
import TeamRoute from "../Routes/Route.Team";
import { checkAllowance } from "../Controllers/Controller.Auth.CheckAllowance";
function HandleRoutesFor(server: Application) {
  server.use("/auth", AuthRoute);
  server.use("/team", checkAllowance as Application, TeamRoute);
}

export default HandleRoutesFor;
