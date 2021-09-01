import { makeError } from "../Helpers/ErrorHandling/Helper.EH.MakeError";
import RouteHandler from "./RouteHandlerType";
import { SessionMAO } from "../MAO/MAO.Session";

const checkAllowance: RouteHandler = (req, res, next) => {
  const incomingSession = req.cookies._LOC_ID;
  if (incomingSession === undefined) {
    // checking if there is no session cookie
    return next(new makeError.Unauthorized());
  }
  const sessionMao = new SessionMAO();
  sessionMao
    .GetSession(incomingSession)
    .then((session) => {
      req.userData = session;
      req.sessionID = incomingSession;
      next();
    })
    .catch((err) => {
      next(err);
    });
};
const checkTeacher: RouteHandler = (req, res, next) => {
  if (req.userData.role === "student") {
    next(new makeError.Unauthorized("route only accessible to teacher"));
  } else {
    next();
  }
};
export { checkAllowance, checkTeacher };
