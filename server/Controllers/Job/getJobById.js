import Job from "../../Model/JobModel.js";
import Jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    let userId;
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (token) {
      const decoded = Jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded._id;
    }

    // Find the job by ID, excluding contactEmail and user fields
    const job = await Job.findById(req.params.id)
      .select("-contactEmail -user")
      .lean(); // Convert to plain JavaScript object for easier manipulation

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the authenticated user has applied for this job
    const applied = userId
      ? job.applicants.some((applicantId) =>
          applicantId.equals(new mongoose.Types.ObjectId(userId))
        )
      : false;
    // Remove the 'applicants' field before sending the response
    delete job.applicants;
    // Return job details along with applied status
    res.json({
      job,
      applied,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(500).send("Server error");
  }
};
