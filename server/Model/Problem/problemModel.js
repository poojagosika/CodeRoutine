import mongoose from "mongoose";

// Define a schema for test cases
const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: false,
  },
});

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  inputFormat: {
    type: String,
    required: true,
  },
  outputFormat: {
    type: String,
    required: true,
  },
  constraints: {
    type: String,
    required: true,
  },
  sampleTestCases: {
    type: [testCaseSchema],
    required: true,
  },
  hiddenTestCases: {
    type: [testCaseSchema],
    required: true,
  },
  timeLimit: {
    type: Number,
    required: true,
  },
  memoryLimit: {
    type: Number,
    required: true,
  },
  codeTemplate: {
    type: String, // The predefined code template the user will complete
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
