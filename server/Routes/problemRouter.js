import express from "express";
import { addPoblem, getPoblem } from "../Controllers/problemController.js";
const problemRouter = express.Router();

problemRouter.post("/", addPoblem);
problemRouter.get("/", getPoblem);

export default problemRouter;
