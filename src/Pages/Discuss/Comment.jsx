import {
  Avatar,
  Button,
  List,
  TextField,
  Typography,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import getCuteAvatar from "../../Config/getCuteAvatar";
import ReactTimeAgo from "react-time-ago";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CloseIcon from "@mui/icons-material/Close";

import {
  addLikeOrRemoveLikeComment,
  addReplyToComment,
} from "../../Services/AuthService";
import { ContextStore } from "../../Context/ContextStore";
import Reply from "./Reply";
import ReplyIcon from "@mui/icons-material/Reply";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IsLogin from "../../Component/IsLogin";
import CommentLoading from "./Loading/CommentLoading";
import { useNavigate } from "react-router-dom";

const Comment = (props) => {
  const [comment, setComment] = React.useState(props?.comment);
  const [replyContent, setReplyContent] = React.useState("");
  const [isLiked, setIsLiked] = React.useState(null);
  const [isReplying, setIsReplying] = React.useState(false);
  const [showReplies, setShowReplies] = React.useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false); // New state
  const [isMessageDialog, setisMessageDialog] = useState(null);

  const { userData } = ContextStore();
  const userId = userData?._id;
  const navigate = useNavigate();

  const handleLikeComment = async (commentId) => {
    if (!userData) {
      setLoginDialogOpen(true);
      setisMessageDialog("If you want to like,then please Login");
      return;
    }

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

  //console.log(comment);
  useEffect(() => {
    if (comment) {
      setIsLiked(comment?.likes?.includes(userData?._id));
    }
  }, [comment, userData]);
  const handleReplyClick = () => {
    if (!userData) {
      setLoginDialogOpen(true);
      setisMessageDialog("If you want to reply,then please Login");
      return;
    }

    setIsReplying(!isReplying);
    setReplyContent(""); // Clear content on toggle
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
      setIsReplying(false);
      setShowReplies(true);
    } catch (error) {
      console.error("Error replying to comment:", error);
    }
  };

  const handleCancel = () => {
    setIsReplying(false);
    setReplyContent("");
  };

  const handleReplies = () => {
    setShowReplies(!showReplies);
  };
  return (
    <>
      {comment ? (
        <ListItem display="flex" gap={2}
        alignItems="flex-start"
        sx={{
            justifyContent:"flex-start",
            borderBottom: "1px solid #e0e0e0",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
          component="a"
          divider
        >
          <ListItemAvatar>
            <Avatar
              alt={comment?.author?.userName}
              src={getCuteAvatar(comment?.author?.userName)}
              aria-label="author"
              sx={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.1)",
                },
              }}
              onClick={() => navigate(`/profile/${comment?.author?.userName}`)}
            />
          </ListItemAvatar>
          <ListItemText display="flex" sx={{ width: "100%", flexDirection:"column" }}
            primary={<Box
              display="flex"
              alignItems="center"
              sx={{justifyContent:"flex-start"}}
              gap={1}
            >
              <Typography variant="body2" color="text.secondary" component="span"
                onClick={() => navigate(`/profile/${comment?.author?.userName}`)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                {comment?.author?.userName}
              </Typography >
              <Typography variant="body2" color="text.secondary" component="span">
                <ReactTimeAgo
                  date={new Date(comment?.createdAt).getTime()}
                  locale="en-US"
                />
              </Typography >

            </Box>}
            secondary={

              <>
                <Typography variant="body2" component="div" color={"text.primary"} >
                  {comment.content}
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{justifyContent:"flex-start"}}
                  gap={1}>
                  <ThumbUpIcon
                    cursor="pointer"
                    onClick={() => handleLikeComment(comment?._id)}
                    fontSize="small"
                    sx={{
                      color: isLiked ? "#0247FE" : "gray",
                      "&:hover": {
                        color: isLiked ? "gray" : "#0247FE",
                      },
                    }}
                    color="action"
                    aria-label="like"
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="span"
                  >
                    {comment?.likes?.length > 0 && comment?.likes?.length}
                  </Typography>
                  <Button onClick={handleReplyClick}
                    sx={{
                      color: isReplying ? "#0247FE" : "gray",
                      cursor: "pointer",
                      "&:hover": {
                        color: isReplying ? "gray" : "#0247FE",
                      },
                    }}
                    startIcon={<ReplyIcon fontSize="small" />}
                  >
                    <Typography
                      variant="body2"
                      component="span"
                    >
                      Reply
                    </Typography>
                  </Button>
                  {comment.replies.length > 0 && (
                    <Button
                      onClick={handleReplies}
                      sx={{
                        color: showReplies ? "#0247FE" : "gray",
                        cursor: "pointer",
                        "&:hover": {
                          color: showReplies ? "gray" : "#0247FE",
                        },
                      }}
                      startIcon={showReplies ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    >
                      {showReplies
                        ? `Hide ${comment?.replies?.length} ${comment?.replies?.length > 1 ? "Replies" : "Reply"
                        }`
                        : `Show ${comment?.replies?.length} ${comment?.replies?.length > 1 ? "Replies" : "Reply"
                        }`}
                    </Button>
                  )}
                </Box>
                {isReplying && (
                  <Box mt={1}>
                    <TextField
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Reply to this comment..."
                      fullWidth
                      multiline
                      rows={2}
                    />
                    <Box mt={1} display="flex" justifyContent="flex-end" gap={1}>
                      <Button
                        onClick={handleCancel}
                        variant="outlined"
                        color="secondary"
                        size="small"
                        startIcon={<CloseIcon fontSize="small" />}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => handleReplyToComment(comment?._id)}
                        disabled={!replyContent.trim()}
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<ReplyIcon fontSize="small" />}
                      >
                        Post
                      </Button>
                    </Box>
                  </Box>
                )}
              </>
            }
          />
        </ListItem >
      ) : (
        <CommentLoading />
      )}
      {
        showReplies && (
          <List>
            {comment.replies
              .map((reply) => <Reply key={reply._id} reply={reply} />)
              .reverse()}
          </List>
        )
      }
      <IsLogin
        setLoginDialogOpen={setLoginDialogOpen}
        loginDialogOpen={loginDialogOpen}
        message={isMessageDialog}
      />
    </>
  );
};

export default Comment;
