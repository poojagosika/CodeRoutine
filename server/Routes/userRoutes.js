import express from "express";
import {
  getUserByUserName,
  googleLogin,
  userLogin,
  userRegister,
  userUpdateProfile,
} from "../Controllers/userController.js";
import { tokenVerify } from "../Middleware/tokenVerify.js";
import { personalInformationUpdate } from "../Controllers/Profile/personalInformationController.js";
import {
  addExperience,
  deleteExperience,
  updateExperience,
} from "../Controllers/Profile/experienceControllers.js";
import {
  addEducation,
  deleteEducation,
  updateEducation,
} from "../Controllers/Profile/educationController.js";
import {
  addTraining,
  deleteTraining,
  updateTraining,
} from "../Controllers/Profile/trainingController.js";
import {
  addProject,
  deleteProject,
  updateProject,
} from "../Controllers/Profile/projectController.js";
import { addOrUpdateSocialLinks } from "../Controllers/Profile/socialLinksController.js";
import {
  addSkill,
  deleteSkill,
  updateSkill,
} from "../Controllers/Profile/skillsController.js";
const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/googleLogin", googleLogin);
userRouter.put("/updateProfile", tokenVerify, userUpdateProfile);
userRouter.get("/:userName", getUserByUserName);
userRouter.put(
  "/profile/personalInformation",
  tokenVerify,
  personalInformationUpdate
);

// experience
userRouter.post("/profile/addExperience", tokenVerify, addExperience);
userRouter.put(
  "/profile/updateExperience/:experienceId",
  tokenVerify,
  updateExperience
);
userRouter.delete(
  "/profile/deleteExperience/:experienceId",
  tokenVerify,
  deleteExperience
);

//education
userRouter.post("/profile/addEducation", tokenVerify, addEducation);
userRouter.put(
  "/profile/updateEducation/:educationId",
  tokenVerify,
  updateEducation
);
userRouter.delete(
  "/profile/deleteEducation/:educationId",
  tokenVerify,
  deleteEducation
);

// training
userRouter.post("/profile/addTraining", tokenVerify, addTraining);
userRouter.put(
  "/profile/updateTraining/:trainingId",
  tokenVerify,
  updateTraining
);
userRouter.delete(
  "/profile/deleteTraining/:trainingId",
  tokenVerify,
  deleteTraining
);

// project
userRouter.post("/profile/addProject", tokenVerify, addProject);
userRouter.put("/profile/updateProject/:projectId", tokenVerify, updateProject);
userRouter.delete(
  "/profile/deleteProject/:projectId",
  tokenVerify,
  deleteProject
);

// social links

userRouter.put(
  "/profile/addOrUpdateSocialLinks",
  tokenVerify,
  addOrUpdateSocialLinks
);

// skill
userRouter.post("/profile/addSkill", tokenVerify, addSkill);
userRouter.put("/profile/updateSkill/:skillId", tokenVerify, updateSkill);
userRouter.delete("/profile/deleteSkill/:skillId", tokenVerify, deleteSkill);
export default userRouter;
