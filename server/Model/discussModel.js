import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Schema for replies to comments
const ReplySchema = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
});

// Schema for comments on topics
const CommentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  replies: [ReplySchema], // Array of replies
});

// Schema for discussion topics
const TopicSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  comments: [CommentSchema], // Array of comments
  tags: [{ type: String }],
  likes: { type: Number, default: 0 },
});

const Topic = mongoose.model("Topic", TopicSchema);

export default Topic;
