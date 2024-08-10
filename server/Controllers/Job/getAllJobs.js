import Job from "../../Model/JobModel.js";

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    // Fetch all jobs, selecting only the specified fields
    const jobs = await Job.find().select(
      "title company jobLevel salary location responsibilities skills postedOn applicationDeadline"
    );

    // Send the response
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
