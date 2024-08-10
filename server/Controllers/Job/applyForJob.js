import Job from "../../Model/JobModel.js";
import user from "../../Model/userModel.js";
// Apply for a job
export const applyForJob = async (req, res) => {
  try {
    const userId = req.id;
    const { id: jobId } = req.params;

    // Find the job by ID
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the job is still open
    if (job.status === "Closed") {
      return res
        .status(400)
        .json({ message: "This job is no longer open for applications." });
    }

    // Check if the user has already applied
    const alreadyApplied = job.applicants.some((applicantId) =>
      applicantId.equals(userId)
    );

    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job." });
    }

    // Add the user to the applicants array
    job.applicants.push(userId);
    await job.save();

    // Optionally, you can add this job to the user's applied jobs if you have such a feature
    const userJobsApply = await user.findById(userId);
    if (userJobsApply) {
      userJobsApply.appliedJobs.push(jobId); // assuming `appliedJobs` is an array in your User model
      await userJobsApply.save();
    }

    res.json({ message: "Successfully applied for the job." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
