import express from "express";
import {
  getUserByUserName,
  userLogin,
  userRegister,
  userUpdateProfile,
} from "../Controllers/userController.js";
import { tokenVerify } from "../Middleware/tokenVerify.js";
const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.put("/updateProfile", tokenVerify, userUpdateProfile);
userRouter.get("/:userName", getUserByUserName);

export default userRouter;
