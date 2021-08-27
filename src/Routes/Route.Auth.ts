import express, { Application } from "express";
const router = express.Router();
import { LoginPost, LoginGet } from "../Controllers/Auth/Controller.Auth.Login";
import Logout from "../Controllers/Auth/Controller.Auth.Logout";
import { checkAllowance } from "../Controllers/Controller.Auth.CheckAllowance";

//login routes
router.post("/login", LoginPost as Application);
router.get("/login", LoginGet as Application);

//logout routes
router.delete("/logout", checkAllowance as Application, Logout as Application);

export default router;
