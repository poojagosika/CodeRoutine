import express from "express";
import { isAdmin } from "../Middleware/isAdmin.js";
import { tokenVerify } from "../Middleware/tokenVerify.js";
import { submitCode } from "../Controllers/Problem/submitCode.js";
import { getSubmissionHistory } from "../Controllers/Problem/getSubmissionHistory.js";
import { createProblem } from "../Controllers/Problem/createProblem.js";
import { getProblems } from "../Controllers/Problem/getProblems.js";
import { getProblemById } from "../Controllers/Problem/getProblemById.js";
import { updateProblem } from "../Controllers/Problem/updateProblem.js";
import { deleteProblem } from "../Controllers/Problem/deleteProblem.js";
const problemRouter = express.Router();

problemRouter.post("/", tokenVerify, isAdmin, createProblem);
problemRouter.get("/", getProblems);
problemRouter.get("/:id", getProblemById);
problemRouter.put("/update/:id", tokenVerify, isAdmin, updateProblem);
problemRouter.delete("/delete/:id", tokenVerify, isAdmin, deleteProblem);
problemRouter.post("/:problemId", tokenVerify, submitCode);
problemRouter.get("/:problemId", tokenVerify, getSubmissionHistory);

export default problemRouter;
