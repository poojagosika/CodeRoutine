import Job from "../../Model/JobModel.js";
import User from "../../Model/userModel.js";
import Jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    let userId;
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (token) {
      try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded._id;
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          // Token is expired, continue with userId as undefined
          console.warn("Token expired");
        } else {
          throw error; // If it's another kind of error, rethrow it
        }
      }
    }

    let savedJobs = [];
    let appliedJobs = [];

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      const user = await User.findById(userId).select("savedJobs appliedJobs");
      savedJobs = user?.savedJobs.map((jobId) => jobId.toString()) || [];
      appliedJobs = user?.appliedJobs.map((jobId) => jobId.toString()) || [];
    }

    // Fetch all jobs, selecting only the specified fields
    const jobs = await Job.find()
      .select(
        "title company jobLevel description employmentType salary location skills postedOn applicationDeadline"
      )
      .lean(); // Convert to plain JavaScript objects

    // Add `saved` and `applied` fields to each job
    const jobsWithStatus = jobs.map((job) => ({
      ...job,
      saved: savedJobs.includes(job._id.toString()),
      applied: appliedJobs.includes(job._id.toString()),
    }));

    // Send the response
    res.json(jobsWithStatus.reverse());
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
