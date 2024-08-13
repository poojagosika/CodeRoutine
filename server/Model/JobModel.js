import mongoose from "mongoose";

const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  skills: {
    type: [String], // Explicitly defining the array type as an array of strings
    required: true,
  },
  salary: {
    type: String,
  },
  employmentType: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Contract"],
    required: true,
  },
  requirements: {
    type: [String], // Array of strings
    required: true,
  },
  responsibilities: {
    type: [String], // Array of strings
    required: true,
  },
  benefits: {
    type: [String], // Array of strings
    required: true,
  },
  postedBy: {
    type: String,
    required: true,
  },
  postedOn: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Open", "Closed"],
    default: "Open",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Reference to the User model by its name as a string
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the User model by its name as a string
    },
  ],
  applicationDeadline: {
    type: Date,
  },
  jobLevel: {
    type: String,
    enum: ["Entry-Level", "Mid-Level", "Senior-Level"],
  },
  industry: {
    type: String,
  },
  numberOfOpenings: {
    type: Number,
  },
  applicationInstructions: {
    type: String,
  },
  contactEmail: {
    type: String,
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
