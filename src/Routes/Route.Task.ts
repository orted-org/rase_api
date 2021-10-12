import express, { Application } from "express";
const router = express.Router();
import Logout from "../Controllers/Auth/Controller.Auth.Logout";
import { checkAllowance } from "../Controllers/Controller.Auth.CheckAllowance";

//login routes
router.post("/addTask", checkAllowance as Application, );

export default router;
