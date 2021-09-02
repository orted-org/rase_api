import express, { Application } from "express";
import { GetFileGet } from "../Controllers/Files/Controller.Files.GetFile";
const router = express.Router();

router.get("/", GetFileGet as Application);
export default router;
