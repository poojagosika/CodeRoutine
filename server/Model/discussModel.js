import mongoose from "mongoose";
import user from "./userModel.js";
const { Schema } = mongoose;

// Recursive Reply Schema for nested replies
const ReplySchema = new Schema(
  {
    content: { type: String, required: true, trim: true },
    author: { type: Schema.Types.ObjectId, ref: user, required: true },
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: Schema.Types.ObjectId, ref: user }], // Array of users who liked
    replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }], // Array of sub-replies
  },
  { timestamps: true }
);

// Schema for comments on topics
const CommentSchema = new Schema(
  {
    content: { type: String, required: true, trim: true },
    author: { type: Schema.Types.ObjectId, ref: user, required: true },
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: Schema.Types.ObjectId, ref: user }], // Array of users who liked
    replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }], // Array of replies
  },
  { timestamps: true }
);

// Schema for discussion topics
const TopicSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    author: { type: Schema.Types.ObjectId, ref: user, required: true },
    createdAt: { type: Date, default: Date.now },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }], // Array of comments
    tags: [{ type: String, trim: true }],
    likes: [{ type: Schema.Types.ObjectId, ref: user }], // Array of users who liked
  },
  { timestamps: true }
);

TopicSchema.index({ author: 1, createdAt: -1 });
TopicSchema.index({ tags: 1 });

// Method to add a like to a topic
TopicSchema.methods.addLike = function (userId) {
  if (!this.likes.includes(userId)) {
    this.likes.push(userId);
    return this.save();
  }
  return Promise.resolve(this);
};

// Method to remove a like from a topic
TopicSchema.methods.removeLike = function (userId) {
  const index = this.likes.indexOf(userId);
  if (index > -1) {
    this.likes.splice(index, 1);
    return this.save();
  }
  return Promise.resolve(this);
};

// Add similar methods for comments and replies
CommentSchema.methods.addLike = function (userId) {
  if (!this.likes.includes(userId)) {
    this.likes.push(userId);
    return this.save();
  }
  return Promise.resolve(this);
};

CommentSchema.methods.removeLike = function (userId) {
  const index = this.likes.indexOf(userId);
  if (index > -1) {
    this.likes.splice(index, 1);
    return this.save();
  }
  return Promise.resolve(this);
};

ReplySchema.methods.addLike = function (userId) {
  if (!this.likes.includes(userId)) {
    this.likes.push(userId);
    return this.save();
  }
  return Promise.resolve(this);
};

ReplySchema.methods.removeLike = function (userId) {
  const index = this.likes.indexOf(userId);
  if (index > -1) {
    this.likes.splice(index, 1);
    return this.save();
  }
  return Promise.resolve(this);
};

ReplySchema.methods.addReply = function (reply) {
  this.replies.push(reply);
  return this.save();
};

const Topic = mongoose.model("Topic", TopicSchema);
const Comment = mongoose.model("Comment", CommentSchema);
const Reply = mongoose.model("Reply", ReplySchema);

export { Topic, Comment, Reply };
