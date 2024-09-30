import { Topic, Comment, Reply } from "../Model/discussModel.js";
import mongoose from "mongoose";

export const getDiscuss = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      author,
      tags,
      sortBy = "createdAt",
      order = "desc",
      searchTerm = "",
    } = req.query;

    // Ensure page and limit are positive integers
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    // Building the query object
    let query = {};
    if (author) query.author = author;
    if (tags) query.tags = { $in: tags.split(",") };
    if (searchTerm) query.title = { $regex: searchTerm, $options: "i" };

    // Sorting
    let sort = {};
    if (sortBy === "likes") {
      sort = { likes: { $size: order === "desc" ? -1 : 1 } };
    } else {
      sort = { [sortBy]: order === "desc" ? -1 : 1 };
    }

    // Fetching topics with pagination, filtering, and sorting
    const topics = await Topic.find(query)
      .populate("author", "userName")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Topic.countDocuments(query);

    return res
      .status(200)
      .json({ topics, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to fetch topics", error: error.message });
  }
};

export const getDiscussById = async (req, res) => {
  try {
    const { id: topicId } = req.params;

    // Validate the topicId
    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({ message: "Invalid topic ID" });
    }

    // Find the topic by ID and populate related fields
    const topic = await Topic.findById(topicId)
      .populate("author", "userName")
      .populate({
        path: "comments",
        populate: [
          {
            path: "author",
            select: "userName",
          },
          {
            path: "replies",
            populate: {
              path: "author",
              select: "userName",
            },
          },
        ],
      });

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.json(topic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateDiscussById = async (req, res) => {
  try {
    const { id: topicId } = req.params;
    const updatedData = req.body;

    // Validate the topicId
    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({ message: "Invalid topic ID" });
    }

    // Validate the updatedData
    const validFields = ["title", "content", "tags"];
    for (const key in updatedData) {
      if (!validFields.includes(key)) {
        return res.status(400).json({ message: `Invalid field: ${key}` });
      }
    }

    // Find and update the topic
    const topic = await Topic.findByIdAndUpdate(topicId, updatedData, {
      new: true,
    })
      .populate("author", "userName")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "userName",
        },
      })
      .populate({
        path: "comments.replies",
        populate: {
          path: "author",
          select: "userName",
        },
      });

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.json({ topic, message: "Topic updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteDiscussById = async (req, res) => {
  try {
    const { id: topicId } = req.params;

    // Validate the topicId
    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({ message: "Invalid topic ID" });
    }

    // Find and delete the topic
    const topic = await Topic.findByIdAndDelete(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.json({ message: "Topic deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addLikeOrRemoveLike = async (req, res) => {
  try {
    const { id: topicId } = req.params;
    const userId = req.id; // Assuming req.id contains the authenticated user's ID

    // Validate the topicId
    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({ message: "Invalid topic ID" });
    }

    // Find the topic
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // Check if the user has already liked the topic
    if (topic.likes.includes(userId)) {
      await topic.removeLike(userId);
      res.json({
        message: "Topic unliked successfully",
        likes: topic.likes.length,
      });
    } else {
      // Add the user's ID to the likes array
      await topic.addLike(userId);
      res.json({
        message: "Topic liked successfully",
        likes: topic.likes.length,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const addLikeOrRemoveLikeComment = async (req, res) => {
  try {
    const { id: commentId } = req.params;
    const userId = req.id; // Assuming req.id contains the authenticated user's ID

    // Validate the commentId
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid comment ID" });
    }

    // Find the comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the user has already liked the comment
    if (comment.likes.includes(userId)) {
      await comment.removeLike(userId);
      res.json({
        message: "Comment unliked successfully",
        likes: comment.likes.length,
      });
    } else {
      // Add the user's ID to the likes array
      await comment.addLike(userId);
      res.json({
        message: "Comment liked successfully",
        likes: comment.likes.length,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const deleteComment = async (req, res) => {
  try {
    const { topicId, commentId } = req.params;
    const userId = req.id;

    // Validate the TopicId
    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({ message: "Invalid Topic ID" });
    }

    // Validate the commentId
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid Comment ID" });
    }

    // Find the Topic
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // Find the comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the user is the author of the comment
    if (comment.author.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
    }

    // Remove the comment reference from related entities
    await Promise.all([
      // Remove the comment from the parent topic's comments array
      Topic.updateOne({ _id: topicId }, { $pull: { comments: commentId } }),
      // Remove replies to this comment if any
      ...comment.replies.map((replyId) => Reply.findByIdAndDelete(replyId)),
    ]);

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    // Respond with a success message
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const addLikeOrRemoveLikeReply = async (req, res) => {
  try {
    const { id: replyId } = req.params;
    const userId = req.id; // Assuming req.id contains the authenticated user's ID

    // Validate the replyId
    if (!mongoose.Types.ObjectId.isValid(replyId)) {
      return res.status(400).json({ message: "Invalid reply ID" });
    }

    // Find the reply
    const reply = await Reply.findById(replyId);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    // Check if the user has already liked the reply
    if (reply.likes.includes(userId)) {
      await reply.removeLike(userId);
      res.json({
        message: "Reply unliked successfully",
        likes: reply.likes.length,
      });
    } else {
      // Add the user's ID to the likes array
      await reply.addLike(userId);
      res.json({
        message: "Reply liked successfully",
        likes: reply.likes.length,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const editReply = async (req, res) => {
  try {
    const { id: replyId } = req.params;
    const { content } = req.body;
    const userId = req.id;

    // Validate the replyId
    if (!mongoose.Types.ObjectId.isValid(replyId)) {
      return res.status(400).json({ message: "Invalid reply ID" });
    }

    // Validate content
    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Content cannot be empty" });
    }

    // Find the reply
    const reply = await Reply.findById(replyId);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    // Check if the user is the author of the reply
    if (reply.author.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
    }

    // Update the reply
    reply.content = content;
    await reply.save();

    // Respond with the updated reply
    res.status(200).json({
      message: "Reply updated successfully",
      reply,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteReply = async (req, res) => {
  try {
    const { commentId, replyId } = req.params;
    const userId = req.id;

    // Validate the commentId
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid comment ID" });
    }

    // Validate the replyId
    if (!mongoose.Types.ObjectId.isValid(replyId)) {
      return res.status(400).json({ message: "Invalid reply ID" });
    }

    // Find the reply
    const reply = await Reply.findById(replyId);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    // Check if the user is the author of the reply
    if (reply.author.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
    }

    // Remove the comment reference from related entities
    await Promise.all([
      // Remove the comment from the parent topic's comments array
      Comment.updateOne({ _id: commentId }, { $pull: { replies: replyId } }),
      // Remove replies to this comment if any
      ...reply.replies.map((replyId) => Reply.findByIdAndDelete(replyId)),
    ]);

    // Delete the comment
    await Reply.findByIdAndDelete(replyId);

    // Respond with a success message
    res.status(200).json({
      message: "Reply deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
