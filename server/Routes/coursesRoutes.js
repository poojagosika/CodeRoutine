import express from "express";
import { tokenVerify } from "../Middleware/tokenVerify.js";
import { createCourse } from "../Controllers/Courses/createCourse.js";
import { getAllCourses } from "../Controllers/Courses/getAllCourses.js";
import { getCourseById } from "../Controllers/Courses/getCourseById.js";
import { updateCourse } from "../Controllers/Courses/updateCourse.js";
import { deleteCourse } from "../Controllers/Courses/deleteCourse.js";
import { createOrUpdateProgress } from "../Controllers/Courses/Progress/createOrUpdateProgress.js";
import { getProgressByUserAndCourse } from "../Controllers/Courses/Progress/getProgressByUserAndCourse.js";
import { getAllProgressByUser } from "../Controllers/Courses/Progress/getAllProgressByUser.js";
import { deleteProgress } from "../Controllers/Courses/Progress/deleteProgress.js";
const coursesRoutes = express.Router();

// Courses Routes
coursesRoutes.post("/", tokenVerify, createCourse);
coursesRoutes.get("/", getAllCourses);
coursesRoutes.get("/:id", getCourseById);
coursesRoutes.put("/:id", tokenVerify, updateCourse);
coursesRoutes.delete("/:id", tokenVerify, deleteCourse);

// Progress Routes
coursesRoutes.post("/progress", tokenVerify, createOrUpdateProgress);
coursesRoutes.get(
  "/progress/:userId/:courseId",
  tokenVerify,
  getProgressByUserAndCourse
);
coursesRoutes.get("/progress/:userId", tokenVerify, getAllProgressByUser);
coursesRoutes.delete(
  "/progress/:userId/:courseId",
  tokenVerify,
  deleteProgress
);
export default coursesRoutes;
