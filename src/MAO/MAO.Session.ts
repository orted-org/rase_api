import { makeError } from "../Helpers/ErrorHandling/Helper.EH.MakeError";
import { ISession } from "../Interfaces/Interfaces.Auth";
import { inMemDel, inMemGet, inMemSet } from "../Helpers/InMemDB/Helper.IMD";
import { SESSION_DURATION } from "../Helpers/Auth/Helper.Auth.DurationHandler";

interface ISessionMAO {
  SetSession(sessionId: string, sessionData: ISession): Promise<null>;
  GetSession(sessionId: string): Promise<ISession>;
  DeleteSession(sessionId: string): Promise<null>;
}
class SessionMAO implements ISessionMAO {
  SetSession(sessionId: string, sessionData: ISession) {
    return new Promise<null>((resolve, reject) => {
      inMemSet(
        sessionId,
        JSON.stringify(sessionData),
        SESSION_DURATION.secFormat
      )
        .then((res) => {
          return resolve(null);
        })
        .catch((err) => {
          return reject(new makeError.InternalServerError());
        });
    });
  }
  GetSession(sessionId: string) {
    return new Promise<ISession>((resolve, reject) => {
      inMemGet(sessionId).then((data) => {
        if (data) {
          return resolve(JSON.parse(data as string) as ISession);
        } else {
          return reject(new makeError.Unauthorized());
        }
      });
    });
  }
  DeleteSession(sessionId: string) {
    return new Promise<null>((resolve, reject) => {
      inMemDel(sessionId)
        .then((res) => {
          return resolve(null);
        })
        .catch((err) => {
          return reject(new makeError.InternalServerError());
        });
    });
  }
}

export { SessionMAO };
