import { Application } from "express";
import AuthRoute from "../Routes/Route.Auth";

function HandleRoutesFor(server: Application) {
  server.use("/auth", AuthRoute);
}

export default HandleRoutesFor;
