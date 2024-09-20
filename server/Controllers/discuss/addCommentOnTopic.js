import mongoose from "mongoose";
import { Comment, Topic } from "../../Model/discussModel.js";

export const addCommentOnTopic = async (req, res) => {
  try {
    const { id: topicId } = req.params;
    const { content } = req.body;
    const userId = req.id; // Ensure req.id is set by authentication middleware

    // Validate the topicId
    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({ message: "Invalid topic ID" });
    }

    // Find the topic
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // Create a new comment
    const newComment = new Comment({
      content,
      author: userId, // Associate the comment with the author (user)
    });

    // Save the comment
    const savedComment = await newComment.save();

    // Add the comment to the topic
    topic.comments.push(savedComment._id);
    await topic.save();

    // Populate the author field of the comment
    const populatedComment = await savedComment.populate({
      path: "author",
      select: "_id userName", // Only select _id and userName fields of the author
    });

    res.status(201).json({
      message: "Comment added successfully",
      comment: populatedComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
