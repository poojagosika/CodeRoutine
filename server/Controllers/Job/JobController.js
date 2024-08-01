import Job from "../../Model/JobModel.js";
import mongoose from "mongoose";

// Create a new job
export const createJob = async (req, res) => {
  const {
    title,
    company,
    description,
    location,
    skills,
    salary,
    employmentType,
    requirements,
    responsibilities,
    benefits,
    postedBy,
    applicationDeadline,
    jobLevel,
    industry,
    numberOfOpenings,
    applicationInstructions,
    contactEmail,
  } = req.body;

  try {
    const newJob = new Job({
      title,
      company,
      description,
      location,
      skills,
      salary,
      employmentType,
      requirements,
      responsibilities,
      benefits,
      postedBy,
      applicationDeadline,
      jobLevel,
      industry,
      numberOfOpenings,
      applicationInstructions,
      contactEmail,
      user: req.id,
    });

    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("user", ["name", "email"]);
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("user", [
      "name",
      "email",
    ]);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(500).send("Server error");
  }
};

// Update job by ID
export const updateJob = async (req, res) => {
  const {
    title,
    company,
    description,
    location,
    skills,
    salary,
    employmentType,
    requirements,
    responsibilities,
    benefits,
    applicationDeadline,
    jobLevel,
    industry,
    numberOfOpenings,
    applicationInstructions,
    contactEmail,
    status,
  } = req.body;

  // Build job object
  const jobFields = {};
  if (title) jobFields.title = title;
  if (company) jobFields.company = company;
  if (description) jobFields.description = description;
  if (location) jobFields.location = location;
  if (skills) jobFields.skills = skills;
  if (salary) jobFields.salary = salary;
  if (employmentType) jobFields.employmentType = employmentType;
  if (requirements) jobFields.requirements = requirements;
  if (responsibilities) jobFields.responsibilities = responsibilities;
  if (benefits) jobFields.benefits = benefits;
  if (applicationDeadline) jobFields.applicationDeadline = applicationDeadline;
  if (jobLevel) jobFields.jobLevel = jobLevel;
  if (industry) jobFields.industry = industry;
  if (numberOfOpenings) jobFields.numberOfOpenings = numberOfOpenings;
  if (applicationInstructions)
    jobFields.applicationInstructions = applicationInstructions;
  if (contactEmail) jobFields.contactEmail = contactEmail;
  if (status) jobFields.status = status;

  try {
    let job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    // Make sure user owns the job
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    job = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: jobFields },
      { new: true }
    );

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete job by ID
export const deleteJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const userId = req.id; // Assuming req.id contains the authenticated user's ID
    // Validate the jobId
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }
    // Find the job by ID
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    // Check
    if (job.user.toString() !== userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Find and delete the Job
    await Job.findByIdAndDelete(jobId);
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(500).send("Server error");
  }
};
