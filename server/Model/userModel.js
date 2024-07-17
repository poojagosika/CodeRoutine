import mongoose from "mongoose";
const { Schema } = mongoose;

// User Profile Details Schema
const personalInformationSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    headline: {
      type: String,
      trim: true,
      maxlength: 220,
    },
    currentPosition: {
      type: String,
      trim: true,
    },
    education: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["👦🏻 Male", "👧🏻 Female", "💫 Other"],
      default: "👦🏻 Male",
    },
    country: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt timestamps
  }
);

const experienceSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract", "Trainee"],
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    LocationType: {
      type: String,
      enum: ["On-site", "Hybrid", "Remote"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: function () {
        return !this.isChecked;
      },
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt timestamps
  }
);

const educationSchema = new Schema(
  {
    institution: {
      type: String,
      required: true,
      trim: true,
    },
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    grade: {
      type: String,
      trim: true,
    },
    activities: {
      type: String,
      trim: true,
    },
    cgpa: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt timestamps
  }
);

// Define the Training Schema
const trainingSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Define the Project Schema
const projectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    projectLink: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Define the Social Links Schema
const socialLinksSchema = new Schema(
  {
    linkedin: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    x: {
      type: String,
      default: "",
    },
    blog: {
      type: String,
      default: "",
    },
    portfolio: {
      type: String,
      default: "",
    },
    additional: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);
// skill
const skillSchema = new Schema(
  {
    skill: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      required: true,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt timestamps
  }
);

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
  profile: personalInformationSchema,
  experience: [experienceSchema],
  education: [educationSchema],
  training: [trainingSchema],
  project: [projectSchema],
  socialLinks: socialLinksSchema,
  skills: [skillSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const user = mongoose.model("user", userSchema);
export default user;
