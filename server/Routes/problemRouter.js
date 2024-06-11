import express from "express";
import { addProblem, getAllProblem } from "../Controllers/problemController.js";
const problemRouter = express.Router();

problemRouter.post("/", addProblem);
problemRouter.get("/", getAllProblem);

export default problemRouter;
