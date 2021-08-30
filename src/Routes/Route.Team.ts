import express, { Application } from "express";
import { CreateTeamPost } from "../Controllers/Team/Controller.Team.CreateTeam";
const router = express.Router();

router.post("/create", CreateTeamPost as Application);

export default router;
