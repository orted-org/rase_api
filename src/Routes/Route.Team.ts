import express, { Application } from "express";
import { CreateTeamPost } from "../Controllers/Team/Controller.Team.CreateTeam";
import { JoinTeamPost } from "../Controllers/Team/Controller.Team.JoinTeam";
const router = express.Router();

router.post("/create", CreateTeamPost as Application);
router.post("/join", JoinTeamPost as Application);
export default router;
