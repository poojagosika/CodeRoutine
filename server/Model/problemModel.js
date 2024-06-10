import mongoose from "mongoose";
const Schema = mongoose.Schema;

const exampleSchema = new Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
  explanation: { type: String },
});

const problemSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  inputDescription: { type: String, required: true },
  outputDescription: { type: String, required: true },
  constraints: { type: String, required: true },
  examples: [exampleSchema],
  tags: [{ type: String }],
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  author: { type: String, required: true },
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
