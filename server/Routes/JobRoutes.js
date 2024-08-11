import express from "express";
import { tokenVerify } from "../Middleware/tokenVerify.js";
import {
  createJob,
  deleteJob,
  updateJob,
} from "../Controllers/Job/JobController.js";
import { getJobById } from "../Controllers/Job/getJobById.js";
import { applyForJob } from "../Controllers/Job/applyForJob.js";
import { getAllJobs } from "../Controllers/Job/getAllJobs.js";
import { savedJob } from "../Controllers/Job/savedJob.js";
const JobRouter = express.Router();

JobRouter.post("/", tokenVerify, createJob);
JobRouter.get("/", getAllJobs);
JobRouter.get("/:id", getJobById);
JobRouter.put("/:id", tokenVerify, updateJob);
JobRouter.delete("/:id", tokenVerify, deleteJob);
JobRouter.put("/apply/:id", tokenVerify, applyForJob);
JobRouter.put("/saved/:id", tokenVerify, savedJob);

export default JobRouter;
