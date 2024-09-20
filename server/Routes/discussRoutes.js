import express from "express";
import {
  addLikeOrRemoveLike,
  addLikeOrRemoveLikeComment,
  addLikeOrRemoveLikeReply,
  addReplyToComment,
  deleteDiscussById,
  getDiscuss,
  getDiscussById,
  updateDiscussById,
  deleteComment,
  editReply,
  deleteReply,
} from "../Controllers/discussControllers.js";
import { tokenVerify } from "../Middleware/tokenVerify.js";
import { createDiscuss } from "../Controllers/discuss/createDiscuss.js";
import { addCommentOnTopic } from "../Controllers/discuss/addCommentOnTopic.js";
import { editCommentOnTopic } from "../Controllers/discuss/editCommentOnTopic.js";
const discussRouter = express.Router();

discussRouter.post("/", tokenVerify, createDiscuss);
discussRouter.get("/", getDiscuss);
discussRouter.get("/:id", getDiscussById);
discussRouter.put("/:id", tokenVerify, updateDiscussById);
discussRouter.delete("/:id", tokenVerify, deleteDiscussById);
discussRouter.put("/topics/:id/like", tokenVerify, addLikeOrRemoveLike);

// comments
discussRouter.post("/topics/:id/comments", tokenVerify, addCommentOnTopic);
discussRouter.put(
  "/comments/:id/like",
  tokenVerify,
  addLikeOrRemoveLikeComment
);
discussRouter.put("/comments/:id/edit", tokenVerify, editCommentOnTopic);
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
