import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import getCuteAvatar from "../../Config/getCuteAvatar";
import ReactTimeAgo from "react-time-ago";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  addLikeOrRemoveLikeComment,
  addReplyToComment,
} from "../../Services/AuthService";
import { ContextStore } from "../../Context/ContextStore";
import Reply from "./Reply";

const Comment = (props) => {
  const [comment, setComment] = React.useState(props?.comment);
  const [replyContent, setReplyContent] = React.useState();
  const [isLiked, setIsLiked] = React.useState(null);
  const { userData } = ContextStore();
  const userId = userData?._id;

  const handleLikeComment = async (commentId) => {
    try {
      const response = await addLikeOrRemoveLikeComment(commentId);
      const userLikes = comment?.likes.includes(userId);
      if (response && response.data) {
        if (!userLikes) {
          setComment((prevTopic) => ({
            ...prevTopic,
            likes: [...(comment?.likes || []), userId], // Update likes with the new data
          }));
          setIsLiked(true);
        } else {
          setComment((prevTopic) => ({
            ...prevTopic,
            likes: prevTopic.likes.filter((like) => like !== userId), // Remove userId from likes array
          }));
          setIsLiked(false);
        }
      } else {
        console.error("Invalid response data:", response);
      }
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  const handleReplyToComment = async (commentId) => {
    try {
      const response = await addReplyToComment(commentId, {
        content: replyContent,
      });
      if (response && response.data) {
        const newCommentData = {
          ...response.data.reply,
          author: {
            _id: userData?._id,
            userName: userData?.userName,
          },
        };
        // Create a new array with the new comment added
        const updatedComments = [...(comment?.replies || []), newCommentData];
        // Update the topic state with the new comments array
        setComment((prevTopic) => ({
          ...prevTopic,
          replies: updatedComments,
        }));
      }
      setReplyContent("");
    } catch (error) {
      console.error("Error replying to comment:", error);
    }
  };
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          alt={comment?.author?.userName}
          src={getCuteAvatar(comment?.author?.userName)}
        />
      </ListItemAvatar>
      <ListItemText
        primary={comment?.author?.userName}
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2" color="textPrimary">
              {comment.content}
            </Typography>
            <br />
            <ReactTimeAgo
              date={new Date(comment?.createdAt).getTime()}
              locale="en-US"
            />
            <br />

            <Typography display={"flex"} alignItems={"center"} gap={1}>
              <ThumbUpIcon
                cursor="pointer"
                onClick={() => handleLikeComment(comment?._id)}
                style={{ color: isLiked ? "#0247FE" : "gray" }}
              />
              {/* {isLiked}  if it is true there then change icone color */}
              {comment?.likes?.length}
            </Typography>
            <Button onClick={() => handleReplyToComment(comment?._id)}>
              Reply
            </Button>
            <TextField
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
            />
          </React.Fragment>
        }
      />
      {comment.replies.length > 0 && (
        <List>
          {comment.replies
            .map((reply) => <Reply key={reply._id} reply={reply} />)
            .reverse()}
        </List>
      )}
    </ListItem>
  );
};

export default Comment;
