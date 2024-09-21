import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem", // Reference to the Problem model
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    enum: ["cpp", "python", "java", "javascript"], // Example languages
    required: true,
  },
  result: {
    type: String,
    enum: ["pass", "fail", "runtime_error", "compilation_error"],
    required: true,
  },
  executionTime: {
    type: Number, // In milliseconds
    required: false,
  },
  memoryUsed: {
    type: Number, // In KB or MB
    required: false,
  },
  submissionTime: {
    type: Date,
    default: Date.now,
  },
});

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
