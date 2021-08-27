import { NextFunction, Request, Response } from "express";
import { IUser } from "../Interfaces/Interface.User";

interface IncomingRequest extends Request {
  userData: IUser;
  sessionID: string;
}
type RouteHandler = (
  req: IncomingRequest,
  res: Response,
  next: NextFunction
) => void;

export default RouteHandler;
