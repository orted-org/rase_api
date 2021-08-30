import RouteHandler from "../RouteHandlerType";
import { UserDAO } from "../../DAO/DAO.User";
import { getSession } from "../../Helpers/Auth/Helper.Auth.SessionTransportation";
import { SessionMAO } from "../../MAO/MAO.Session";

const userDao = new UserDAO();
const Logout: RouteHandler = (req, res, next) => {
  res.clearCookie("_LOC_ID");
  const incomingSession = getSession(req);

  const sessionMao = new SessionMAO();
  sessionMao
    .DeleteSession(incomingSession)
    .then(() => {
      return res.status(200).json({
        status: 200,
        message: "Logged Out",
      });
    })
    .catch((err) => {
      next(err);
    });
};

export default Logout;
