import Job from "../../Model/JobModel.js";
import User from "../../Model/userModel.js";
import mongoose from "mongoose";

// Save or unsave a job
export const savedJob = async (req, res) => {
  try {
    const userId = req.id; // Assuming req.id contains the authenticated user's ID
    const { id: jobId } = req.params;

    // Validate the jobId
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Find the user and update their savedJobs array
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the job is already saved
    const isJobSaved = user.savedJobs.includes(jobId);

    if (isJobSaved) {
      // If the job is already saved, remove it (unsave)
      user.savedJobs = user.savedJobs.filter(
        (savedJobId) => !savedJobId.equals(jobId)
      );
      await user.save();
      return res.status(200).json({ message: "Job unsaved successfully" });
    } else {
      // If the job is not saved, add it to savedJobs
      user.savedJobs.push(jobId);
      await user.save();
      return res.status(200).json({ message: "Job saved successfully" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
