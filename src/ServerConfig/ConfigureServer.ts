require("dotenv").config();
import express, { Application } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import ENV from "../Helpers/Config/env";
import path from "path/posix";
const cors = require("cors") as any;
function ConfigureServer(): Application {
  const app = express();

  //Security against xss
  const xss = require("xss-clean") as any;
  app.use(xss());

  // configuring general security and csp
  if (!ENV.primaryInfo.isDevMode) app.use(helmet());

  // cors for react front end
  app.use(cors({ credentials: true, origin: ENV.connectivity.reactUri }));

  // setting static for string attachments and submissions
  app.use(express.static(path.join(__dirname, '/../../files/attachments')));
  app.use(express.static(path.join(__dirname, '/../../files/submissions')));

  // hiding server details
  app.use((req, res, next) => {
    res.setHeader("X-Powered-By", "Java Spring");
    next();
  });

  //for nginx proxy setup
  app.enable("trust proxy");

  // parsing body
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  //HTTP Logging
  console.log(
    ENV.primaryInfo.isDevMode
      ? "Configured for Dev Mode"
      : "Configured for Production Mode"
  );

  if (ENV.primaryInfo.isDevMode) app.use(morgan("dev"));
  else app.use(morgan("tiny"));

  return app;
}

export default ConfigureServer;