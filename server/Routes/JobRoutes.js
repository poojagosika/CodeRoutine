import express from "express";
import { tokenVerify } from "../Middleware/tokenVerify.js";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "../Controllers/Job/JobController.js";
const JobRouter = express.Router();

JobRouter.post("/", tokenVerify, createJob);
JobRouter.get("/", getAllJobs);
JobRouter.get("/:id", getJobById);
JobRouter.put("/:id", tokenVerify, updateJob);
JobRouter.delete("/:id", tokenVerify, deleteJob);

export default JobRouter;
