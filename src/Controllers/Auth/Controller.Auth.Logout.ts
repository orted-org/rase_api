import { makeError } from "../../Helpers/ErrorHandling/Helper.EH.MakeError";
import RouteHandler from "../RouteHandlerType";
import { UserDAO } from "../../DAO/DAO.User";
import { performLogout } from "../../Services/Services.Auth";

const userDao = new UserDAO();
const Logout: RouteHandler = (req, res, next) => {
  res.clearCookie("_LOC_ID");
  if (req.cookies === undefined) {
    // checking if there is no cookie
    return next(new makeError.Unauthorized());
  } else if (
    // checking if there is no refresh token
    req.cookies._LOC_ID === undefined ||
    req.cookies._LOC_ID === "" ||
    req.cookies._LOC_ID === null
  ) {
    return next(new makeError.Unauthorized());
  }

  // sending the incoming refresh token for logout
  return performLogout(req.cookies._LOC_ID, userDao)
    .then(() => {
      //json because this request is made from internal js
      return res.status(200).json({
        status: 200,
        message: "Logged Out",
      });
    })
    .catch((err: any) => {
      //this will be internal server
      next(err);
    });
};

export default Logout;
