import { NextFunction, Request, Response } from "express";
import { ISession } from "../Interfaces/Interfaces.Auth";

interface IncomingRequest extends Request {
  userData: ISession;
  sessionID: string;
}

type RouteHandler = (
  req: IncomingRequest,
  res: Response,
  next: NextFunction
) => void;

export default RouteHandler;
