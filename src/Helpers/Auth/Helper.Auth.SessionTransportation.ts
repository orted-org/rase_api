import { SESSION_DURATION } from "./Helper.Auth.DurationHandler";
import ENV from "../Config/env";
import { makeError } from "../ErrorHandling/Helper.EH.MakeError";
import { Request, Response } from "express";

function sendSession(res: Response, sessionId: string) {
  if (ENV.primaryInfo.isWeb) {
    res.cookie("_LOC_ID", sessionId, {
      maxAge: SESSION_DURATION.msFormat,
      httpOnly: true,
      sameSite: "strict",
    });
  } else {
    res.setHeader("Authentication", sessionId);
  }
}
function getSession(req: Request): string {
  let sessionId = "";
  if (ENV.primaryInfo.isWeb) {
    if (!(req.cookies._LOC_ID === undefined || req.cookies._LOC_ID === null)) {
      sessionId = req.cookies._LOC_ID;
    }
  } else {
    try {
      const headers = req.headers.authorization || "";
      const temp = headers.split("Bearer ")[1] as string;
      sessionId = temp;
    } catch (error) {
      throw new makeError.Unauthorized();
    }
  }
  return sessionId;
}
export { sendSession, getSession };
