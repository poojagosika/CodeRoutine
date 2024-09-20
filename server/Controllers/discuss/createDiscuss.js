import { Topic } from "../../Model/discussModel.js";

export const createDiscuss = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const author = req.id; // Ensure req.id is set by authentication middleware

    // Simple validation
    if (!title || !content || !tags) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new topic with comments and likes initialized as empty arrays
    const newTopic = await Topic.create({
      title,
      content,
      author,
      tags,
      comments: [],
      likes: [],
    });

    // Populate author details (_id and userName)
    const populatedTopic = await newTopic.populate({
      path: "author",
      select: "_id userName", // Only select _id and userName fields of the author
    });

    return res
      .status(201)
      .json({ populatedTopic, message: "Topic created successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
