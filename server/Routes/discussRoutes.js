import express from "express";
import {
  addLikeOrRemoveLike,
  addLikeOrRemoveLikeComment,
  addLikeOrRemoveLikeReply,
  addCommentToTopic,
  addReplyToComment,
  createDiscuss,
  deleteDiscussById,
  getDiscuss,
  getDiscussById,
  updateDiscussById,
} from "../Controllers/discussControllers.js";
import { tokenVerify } from "../Middleware/tokenVerify.js";
const discussRouter = express.Router();

discussRouter.post("/", tokenVerify, createDiscuss);
discussRouter.get("/", getDiscuss);
discussRouter.get("/:id", getDiscussById);
discussRouter.put("/:id", tokenVerify, updateDiscussById);
discussRouter.delete("/:id", tokenVerify, deleteDiscussById);
discussRouter.put("/topics/:id/like", tokenVerify, addLikeOrRemoveLike);
discussRouter.put(
  "/comments/:id/like",
  tokenVerify,
  addLikeOrRemoveLikeComment
);
discussRouter.put("/replies/:id/like", tokenVerify, addLikeOrRemoveLikeReply);
discussRouter.post("/topics/:id/comments", tokenVerify, addCommentToTopic);
discussRouter.post("/comments/:id/replies", tokenVerify, addReplyToComment);

export default discussRouter;
