import express from "express";
import {
  addLikeOrRemoveLike,
  addLikeOrRemoveLikeComment,
  addLikeOrRemoveLikeReply,
  addCommentToTopic,
  addReplyToComment,
  deleteDiscussById,
  getDiscuss,
  getDiscussById,
  updateDiscussById,
  editComment,
  deleteComment,
  editReply,
  deleteReply,
} from "../Controllers/discussControllers.js";
import { tokenVerify } from "../Middleware/tokenVerify.js";
import { createDiscuss } from "../Controllers/discuss/createDiscuss.js";
const discussRouter = express.Router();

discussRouter.post("/", tokenVerify, createDiscuss);
discussRouter.get("/", getDiscuss);
discussRouter.get("/:id", getDiscussById);
discussRouter.put("/:id", tokenVerify, updateDiscussById);
discussRouter.delete("/:id", tokenVerify, deleteDiscussById);
discussRouter.put("/topics/:id/like", tokenVerify, addLikeOrRemoveLike);

// comments
discussRouter.post("/topics/:id/comments", tokenVerify, addCommentToTopic);
discussRouter.put(
  "/comments/:id/like",
  tokenVerify,
  addLikeOrRemoveLikeComment
);
discussRouter.put("/comments/:id/edit", tokenVerify, editComment);
discussRouter.delete(
  "/comments/:topicId/:commentId/delete",
  tokenVerify,
  deleteComment
);

// Reply
discussRouter.post("/comments/:id/replies", tokenVerify, addReplyToComment);
discussRouter.put("/replies/:id/like", tokenVerify, addLikeOrRemoveLikeReply);
discussRouter.put("/replies/:id/edit", tokenVerify, editReply);
discussRouter.delete(
  "/replies/:commentId/:replyId/delete",
  tokenVerify,
  deleteReply
);

export default discussRouter;
