import mongoose from "mongoose";
const SubmissionSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
  code: { type: String, required: true },
  result: { type: String, required: true },
});

submissionModel = mongoose.model("Submission", SubmissionSchema);
export default submissionModel;
