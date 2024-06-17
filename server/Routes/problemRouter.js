import express from "express";
import {
  addProblem,
  getAllProblem,
  getProblemById,
  updateProblem,
  deleteProblem,
} from "../Controllers/problemController.js";
import { isAdmin } from "../Middleware/isAdmin.js";
import { tokenVerify } from "../Middleware/tokenVerify.js";
const problemRouter = express.Router();

problemRouter.post("/", tokenVerify, isAdmin, addProblem);
problemRouter.get("/", getAllProblem);
problemRouter.get("/:id", getProblemById);
problemRouter.put("/update/:id", tokenVerify, isAdmin, updateProblem);
problemRouter.delete("/delete/:id", tokenVerify, isAdmin, deleteProblem);

export default problemRouter;
