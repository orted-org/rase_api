import RouteHandler from "../RouteHandlerType";
import {
  getSession,
  sendSession,
} from "../../Helpers/Auth/Helper.Auth.SessionTransportation";
// import { getUserDataFromAuth } from "../../Helpers/Auth/Helper.Auth.Firebase";
import { OAuthPayload } from "../../Interfaces/Interfaces.Auth";
import { makeError } from "../../Helpers/ErrorHandling/Helper.EH.MakeError";

import { performLogin } from "../../Services/Auth/Services.Auth";
import { UserDAO } from "../../DAO/DAO.User";
import { verifyGoogleIdTokenAndGetUserData } from "../../Helpers/Auth/Helper.Auth.GoogleAuthLib";
import { ValidateUser } from "../../Services/Auth/Service.Auth.ValidateUser";
import { SessionMAO } from "../../MAO/MAO.Session";
const userDao = new UserDAO();

// controller to perform login when received ID token from OAuth
const LoginPost: RouteHandler = (req, res, next) => {
  //checking via session if already logged in
  const incomingSession = getSession(req);
  const sessionMao = new SessionMAO();
  sessionMao
    .GetSession(incomingSession)
    .then((session) => {
      //already logged in
      res.status(200).json(session);
    })
    .catch(async (err: any) => {
      //this means not logged in

      // getting the idToken from the request of the body
      const idToken = req.body.idToken;

      // if ID not present
      if (idToken === undefined) return next(new makeError.BadRequest());

      try {
        //getting data from OAuth
        const tempData: OAuthPayload = await verifyGoogleIdTokenAndGetUserData(
          idToken
        );

        //validating user
        await ValidateUser(tempData);

        try {
          // Performing Login of the user and getting userData and session
          const data = await performLogin(tempData, userDao);

          // if not wait listed sending the session
          const session = data.session;
          sendSession(res, session);

          // sending the response
          res.status(200).json(data.userData);
        } catch (err) {
          //this will be internal server error
          throw err;
        }
      } catch (err) {
        next(err);
      }
    });
};
const LoginGet: RouteHandler = (req, res, next) => {
  const incomingSession = getSession(req);
  const sessionMao = new SessionMAO();
  sessionMao
    .GetSession(incomingSession)
    .then((session) => {
      //already logged in
      res.status(200).json(session);
    })
    .catch((err) => {
      // not logged in
      next(new makeError.Unauthorized());
    });
};
export { LoginPost, LoginGet };
