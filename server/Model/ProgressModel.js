import mongoose from "mongoose";
const { Schema } = mongoose;

// Score Schema
const scoreSchema = new Schema(
  {
    topicId: { type: Schema.Types.ObjectId, required: true },
    mcqScore: { type: Number, default: 0 }, // Score for MCQs
    exerciseScore: { type: Number, default: 0 }, // Score for exercises
  },
  { _id: false }
);

// Progress Schema
const progressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true }, // Reference to the Course model
  completedTopics: [{ type: Schema.Types.ObjectId, ref: "Course.topics" }], // Array of completed topic IDs
  currentTopic: { type: Schema.Types.ObjectId, ref: "Course.topics" }, // The current topic the user is on
  scores: [scoreSchema], // Array of scores per topic
  startedAt: { type: Date, default: Date.now }, // Timestamp when the user started the course
  updatedAt: { type: Date, default: Date.now }, // Timestamp when the progress was last updated
});

// Adding a pre-save hook to update the updatedAt field automatically
progressSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the model
const Progress = mongoose.model("Progress", progressSchema);
export default Progress;
