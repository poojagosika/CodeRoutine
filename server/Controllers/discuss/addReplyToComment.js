import mongoose from "mongoose";
import { Comment, Reply } from "../../Model/discussModel.js";

export const addReplyToComment = async (req, res) => {
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
      return res.status(400).json({ message: "Reply content cannot be empty" });
    }

    // Optional: Add a character limit (e.g., 1000 characters)
    if (content.length > 1000) {
      return res.status(400).json({
        message:
          "Reply content exceeds the maximum allowed length of 1000 characters",
      });
    }

    // Find the comment and update it atomically by pushing the new reply
    const newReply = new Reply({
      content,
      author: userId,
    });

    // Start a session for transaction (optional but recommended)
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const savedReply = await newReply.save({ session });

      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { $push: { replies: savedReply._id } },
        { new: true, session }
      ).populate({
        path: "replies",
        populate: {
          path: "author",
          select: "_id userName", // Adjust fields as necessary
        },
      });

      if (!updatedComment) {
        // If the comment no longer exists, abort the transaction
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: "Comment not found" });
      }

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      // Populate the author field of the reply
      await savedReply.populate({
        path: "author",
        select: "_id userName", // Only select _id and userName fields of the author
      });

      res.status(201).json({
        message: "Reply added successfully",
        reply: savedReply,
      });
    } catch (err) {
      // If any error occurs, abort the transaction
      await session.abortTransaction();
      session.endSession();
      throw err; // This will be caught by the outer catch block
    }
  } catch (error) {
    console.error("Error adding reply to comment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
