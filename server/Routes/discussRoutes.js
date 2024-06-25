import express from "express";
import {
  createDiscuss,
  deleteDiscussById,
  getDiscuss,
  getDiscussById,
  updateDiscussById,
} from "../Controllers/discussControllers.js";
import { tokenVerify } from "../Middleware/tokenVerify.js";
import { checkAuthor } from "../Middleware/checkAuthor.js";
const discussRouter = express.Router();

discussRouter.post("/", tokenVerify, createDiscuss);
discussRouter.get("/", getDiscuss);
discussRouter.get("/:id", getDiscussById);
discussRouter.put("/:id", tokenVerify, updateDiscussById);
discussRouter.delete("/:id", tokenVerify, deleteDiscussById);

export default discussRouter;
