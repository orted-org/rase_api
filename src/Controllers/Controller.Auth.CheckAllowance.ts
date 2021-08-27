import { makeError } from "../Helpers/ErrorHandling/Helper.EH.MakeError";
import RouteHandler from "./RouteHandlerType";
import { UserDAO } from "../DAO/DAO.User";
import { checkIfAlreadyLogin } from "../Services/Services.Auth";
const userDao = new UserDAO();

const checkAllowance: RouteHandler = (req, res, next) => {
  const incomingSession = req.cookies._LOC_ID;
  if (incomingSession === undefined) {
    // checking if there is no session cookie
    return next(new makeError.Unauthorized());
  }
  checkIfAlreadyLogin(incomingSession, userDao)
    .then((userData) => {
      req.userData = userData;
      req.sessionID = incomingSession;
      next();
    })
    .catch((err) => {
      next(err);
    });
};

export { checkAllowance };
