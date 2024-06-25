import { Topic } from "../Model/discussModel.js";
import mongoose from "mongoose";

export const createDiscuss = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const author = req.id;
    const newTopic = await Topic.create({ title, content, author, tags });
    return res.status(201).json({ newTopic, message: "Topic created" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getDiscuss = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      author,
      tags,
      sortBy = "createdAt",
      order = "desc",
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

    // Sorting
    const sortOrder = order === "desc" ? 1 : -1;
    const sortFields = ["createdAt", "title", "author"]; // Add more valid fields as needed
    if (!sortFields.includes(sortBy)) sortBy = "createdAt";
    const sort = { [sortBy]: sortOrder };

    // Fetching topics with pagination, filtering, and sorting
    const topics = await Topic.find(query)
      .populate("author", "userName") // Assuming User model has a 'userName' field
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
      })
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Topic.countDocuments(query);

    return res
      .status(200)
      .json({ topics, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error(error); // Log the error for debugging
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
