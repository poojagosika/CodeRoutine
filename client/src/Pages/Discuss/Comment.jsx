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
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import getCuteAvatar from "../../Config/getCuteAvatar";
import ReactTimeAgo from "react-time-ago";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SendIcon from "@mui/icons-material/Send";

import { ContextStore } from "../../Context/ContextStore";
import Reply from "./Reply";
import ReplyIcon from "@mui/icons-material/Reply";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IsLogin from "../../Component/IsLogin";
import CommentLoading from "./Loading/CommentLoading";
import { useNavigate } from "react-router-dom";

import {
  addLikeOrRemoveLikeComment,
  deleteComment,
  editComment,
} from "../../features/discuss/discussCommentAction";
import { useDispatch } from "react-redux";
import { addReplyToComment } from "../../features/discuss/discussReplyaction";

const Comment = (props) => {
  const [comment, setComment] = React.useState(props?.comment);
  const [replyContent, setReplyContent] = React.useState("");
  const [isLiked, setIsLiked] = React.useState(null);
  const [isReplying, setIsReplying] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [showReplies, setShowReplies] = React.useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false); // New state
  const [isMessageDialog, setisMessageDialog] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [content, setContent] = React.useState(props?.comment?.content);

  const { userData } = ContextStore();
  const userId = userData?._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseEdit = () => {
    setIsEdit(true);
    setAnchorEl(null);
    setIsReplying(false);
  };
  useEffect(() => {
    setComment(props.comment);
  }, [props.comment]);

  const handleLikeComment = (commentId) => {
    dispatch(
      addLikeOrRemoveLikeComment({
        topicId: props?.topicId,
        commentId: commentId,
        content: replyContent,
      })
    );
    setIsReplying(false);
    setReplyContent("");
  };

  const handleReplyClick = () => {
    if (!userData) {
      setLoginDialogOpen(true);
      setisMessageDialog("If you want to reply,then please Login");
      return;
    }
    setIsEdit(false);
    setIsReplying(!isReplying);
    setReplyContent(""); // Clear content on toggle
  };

  const handleReplyToComment = () => {
    dispatch(
      addReplyToComment({
        topicId: props.topicId,
        commentId: props.comment._id,
        content: replyContent,
      })
    );

    setIsReplying(false);
    setReplyContent("");
  };

  const handleEdit = () => {
    dispatch(
      editComment({
        id: props.comment?._id,
        content: content,
        topicId: props.topicId,
      })
    );
    setIsEdit(false);
  };

  const handleDeleteComment = () => {
    dispatch(
      deleteComment({ topicId: props.topicId, commentId: props.comment._id })
    ); // Ensures proper error handling from createAsyncThunk
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
        <ListItem
          display="flex"
          gap={2}
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
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
          <ListItemText
            display="flex"
            flexDirection="column"
            sx={{ width: "100%" }}
            primary={
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                gap={1}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="span"
                  onClick={() =>
                    navigate(`/profile/${comment?.author?.userName}`)
                  }
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  {comment?.author?.userName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="span"
                >
                  <ReactTimeAgo
                    date={
                      comment?.createdAt
                        ? new Date(comment?.createdAt).getTime()
                        : Date.now()
                    }
                    locale="en-US"
                  />
                </Typography>
                {userData ? (
                  <>
                    <MoreVertIcon
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                      fontSize="small"
                      sx={{ color: "blue" }}
                    />
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          handleCloseEdit();
                        }}
                        style={{ cursor: "pointer", gap: 5 }}
                      >
                        <EditIcon
                          sx={{
                            color: "green",
                            "&:hover": {
                              color: "blue",
                            },
                          }}
                          color="action"
                          fontSize="small"
                        />
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          handleDeleteComment();
                        }}
                        style={{ cursor: "pointer", gap: 5 }}
                      >
                        <DeleteOutlineIcon
                          sx={{
                            color: "red",
                            "&:hover": {
                              color: "orange",
                            },
                          }}
                          color="action"
                          fontSize="small"
                        />
                        Delete
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  ""
                )}
              </Box>
            }
            secondary={
              <>
                <Typography
                  variant="body2"
                  component="span"
                  color={"text.primary"}
                >
                  {comment.content}
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap={1}
                >
                  <ThumbUpIcon
                    cursor="pointer"
                    onClick={() => handleLikeComment(comment?._id)}
                    fontSize="small"
                    sx={{
                      color: props?.comment?.likes?.includes(userData?._id)
                        ? "#0247FE"
                        : "gray",
                      "&:hover": {
                        color: props?.comment?.likes?.includes(userData?._id)
                          ? "gray"
                          : "#0247FE",
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
                    {props?.comment?.likes?.length > 0 &&
                      props?.comment?.likes?.length}
                  </Typography>
                  <Button
                    onClick={handleReplyClick}
                    sx={{
                      color: isReplying ? "#0247FE" : "gray",
                      cursor: "pointer",
                      "&:hover": {
                        color: isReplying ? "gray" : "#0247FE",
                      },
                    }}
                    startIcon={<ReplyIcon fontSize="small" />}
                  >
                    <Typography variant="body2" component="span">
                      Reply
                    </Typography>
                  </Button>
                  {comment?.replies?.length > 0 && (
                    <Button
                      onClick={handleReplies}
                      sx={{
                        color: showReplies ? "#0247FE" : "gray",
                        cursor: "pointer",
                        "&:hover": {
                          color: showReplies ? "gray" : "#0247FE",
                        },
                      }}
                      startIcon={
                        showReplies ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )
                      }
                    >
                      {showReplies
                        ? `Hide ${comment?.replies?.length} ${
                            comment?.replies?.length > 1 ? "Replies" : "Reply"
                          }`
                        : `Show ${comment?.replies?.length} ${
                            comment?.replies?.length > 1 ? "Replies" : "Reply"
                          }`}
                    </Button>
                  )}
                </Box>
                {isEdit && (
                  <Box mt={1}>
                    <TextField
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Reply to this comment..."
                      fullWidth
                      multiline
                      rows={2}
                    />
                    <Box
                      mt={1}
                      display="flex"
                      justifyContent="flex-end"
                      gap={1}
                    >
                      <Button
                        onClick={() => setIsEdit(false)}
                        variant="outlined"
                        color="secondary"
                        size="small"
                        startIcon={<CloseIcon fontSize="small" />}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => handleEdit(props.comment?._id)}
                        disabled={props.comment?.content === content}
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<SendIcon fontSize="small" />}
                      >
                        Save
                      </Button>
                    </Box>
                  </Box>
                )}

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
                    <Box
                      mt={1}
                      display="flex"
                      justifyContent="flex-end"
                      gap={1}
                    >
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
                        startIcon={<SendIcon fontSize="small" />}
                      >
                        Post
                      </Button>
                    </Box>
                  </Box>
                )}
              </>
            }
          />
        </ListItem>
      ) : (
        <CommentLoading />
      )}
      {showReplies && (
        <List>
          {props?.comment?.replies
            .map((reply) => (
              <Reply
                key={reply?._id || index}
                reply={reply}
                topicId={props?.topicId}
                commentId={props.comment?._id}
              />
            ))
            .reverse()}
        </List>
      )}
      <IsLogin
        setLoginDialogOpen={setLoginDialogOpen}
        loginDialogOpen={loginDialogOpen}
        message={isMessageDialog}
      />
    </>
  );
};

export default Comment;
