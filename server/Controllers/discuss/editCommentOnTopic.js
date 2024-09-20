import mongoose from "mongoose";
import { Comment } from "../../Model/discussModel.js";

export const editCommentOnTopic = async (req, res) => {
  try {
    const { id: commentId } = req.params;
    const { content } = req.body;
    const userId = req.id; // Ensure req.id is set by authentication middleware

    // Validate the commentId
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid comment ID" });
    }

    // Validate content
    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Content cannot be empty" });
    }

    // Find the comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the user is the author of the comment
    if (comment.author.toString() !== userId) {
      return res
        .status(401)
        .json({ message: "You are not authorized to perform this action" });
    }

    // Update the comment content
    comment.content = content;
    const updatedComment = await comment.save();

    // Populate the author field
    const populatedComment = await updatedComment.populate({
      path: "author",
      select: "_id userName", // Only select _id and userName fields of the author
    });

    // Respond with the updated and populated comment
    res.status(200).json({
      message: "Comment updated successfully",
      comment: populatedComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
