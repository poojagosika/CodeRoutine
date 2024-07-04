import mongoose from "mongoose";
const { Schema } = mongoose;

// User Profile Details Schema
const userProfileDetailsSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  collegeName: { type: String },
  companyName: { type: String },
  website: { type: String },
  socialAddresses: {
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String },
  },
  languages: [{ type: String }],
  skills: {
    advanced: [{ type: String }],
    intermediate: [{ type: String }],
    fundamental: [{ type: String }],
  },
  problemsSolved: {
    total: { type: Number, default: 0 },
    easy: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    hard: { type: Number, default: 0 },
  },
  status: { type: String, default: "active" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// User Schema
const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  profile: userProfileDetailsSchema, // Embed the userProfileDetailsSchema here
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const user = mongoose.model("user", userSchema);
export default user;
