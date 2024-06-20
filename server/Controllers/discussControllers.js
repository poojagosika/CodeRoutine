import Topic from "../Model/discussModel.js";

export const createDiscuss = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    const newTopic = await Topic.create({ title, content, author, tags });
    return res.status(201).json({ newTopic, message: "Topic created" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getDiscuss = async (req, res) => {
  try {
    const topics = await Topic.find();
    return res.status(200).json({ topics });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getDiscussById = async (req, res) => {
  try {
    const topicId = req.params.id;
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.json(topic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateDiscussById = async (req, res) => {
  try {
    const topicId = req.params.id;
    const updatedData = req.body;
    const topic = await Topic.findByIdAndUpdate(topicId, updatedData, {
      new: true,
    });
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.json({ topic, message: "Topic updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const deleteDiscussById = async (req, res) => {
  try {
    const topicId = req.params.id;
    const topic = await Topic.findByIdAndDelete(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.json({ message: "Topic deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
