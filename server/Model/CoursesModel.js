import mongoose from "mongoose";
const { Schema } = mongoose;

// MCQ Schema
const mcqSchema = new Schema(
  {
    questionId: { type: Schema.Types.ObjectId, auto: true },
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
  },
  { _id: false }
);

// Exercise Schema
const exerciseSchema = new Schema(
  {
    exerciseId: { type: Schema.Types.ObjectId, auto: true },
    question: { type: String, required: true },
    instructions: { type: String },
    codeSnippet: { type: String },
    solution: { type: String, required: true },
  },
  { _id: false }
);

// Topic Schema
const topicSchema = new Schema(
  {
    topicId: { type: Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    mcqs: [mcqSchema],
    exercises: [exerciseSchema],
  },
  { _id: false }
);

// Course Schema
const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  topics: [topicSchema],
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Assuming the User model is used for admin as well
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Adding a pre-save hook to update the updatedAt field automatically
courseSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the model
const Course = mongoose.model("Course", courseSchema);
export default Course;
