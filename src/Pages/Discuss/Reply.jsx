import React, { useEffect, useState } from "react";
import { ContextStore } from "../../Context/ContextStore";
import {
  Avatar,
  Box,
  Typography,
  ListItem,
  ListItemAvatar,
  Skeleton,
  ListItemText,
  Menu,
  MenuItem,
  Button,
  TextField
} from "@mui/material";
import getCuteAvatar from "../../Config/getCuteAvatar";
import ReactTimeAgo from "react-time-ago";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { addLikeOrRemoveLikeReply, deleteReply, editReply } from "../../Services/AuthService";
import IsLogin from "../../Component/IsLogin";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import ReplyIcon from "@mui/icons-material/Reply";

const Reply = (props) => {
  const [reply, setReply] = useState(props.reply);
  const [isLiked, setIsLiked] = useState(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(props.reply.content);

  const { userData } = ContextStore();
  const userId = userData?._id;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLikeReply = async (replyId) => {
    if (!userData) {
      setLoginDialogOpen(true);
      return;
    }
    try {
      const response = await addLikeOrRemoveLikeReply(replyId);
      const userLikes = reply.likes.includes(userId);
      if (response && response.data) {
        if (!userLikes) {
          setReply((prevReply) => ({
            ...prevReply,
            likes: [...(reply.likes || []), userId],
          }));
          setIsLiked(true);
        } else {
          setReply((prevReply) => ({
            ...prevReply,
            likes: prevReply.likes.filter((like) => like !== userId),
          }));
          setIsLiked(false);
        }
      } else {
        console.error("Invalid response data:", response);
      }
    } catch (error) {
      console.error("Error liking reply:", error);
    }
  };

  const handleEdit = async () => {
    try {
      console.log(reply._id, content)
      const response = await editReply(reply._id, { content });
      if (response && response.data) {
        setReply((prevReply) => ({
          ...prevReply,
          content,
        }));
        setIsEdit(false);
      } else {
        console.error("Invalid response data:", response);
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const response = await deleteReply(props.commentId, reply._id);
      if (response && response.status === 200) {
        props.setComment((prevTopic) => ({
          ...prevTopic,
          replies: prevTopic.replies.filter((reply) => reply._id !== reply._id),
        }));
        setAnchorEl(null);
      } else {
        console.error("Invalid response data:", response);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleCloseEdit = () => {
    setIsEdit(true);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (reply) {
      setIsLiked(reply.likes.includes(userData?._id));
    }
  }, [reply, userData]);

  return (
    <ListItem
      display="flex"
      gap={2}
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{
        pl: 8,
        borderBottom: "1px solid #e0e0e0",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
      component="div"
      divider
    >
      {reply ? (
        <Box display="flex" gap={1} width="100%">
          <ListItemAvatar>
            <Avatar
              alt={reply.author.userName}
              src={getCuteAvatar(reply.author.userName)}
              sx={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.1)",
                },
              }}
            />
          </ListItemAvatar>
          <ListItemText
            display="flex"
            flexDirection="column"
            sx={{ width: "100%" }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              gap={1}
            >
              <Typography variant="body2" color="text.secondary" component="span">
                {reply.author.userName}
              </Typography>
              <Typography variant="body2" color="text.secondary" component="span">
                <ReactTimeAgo date={new Date(reply.createdAt).getTime()} locale="en-US" />
              </Typography>

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
                  <EditIcon style={{ color: "green" }} fontSize="small" />
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleDeleteComment();
                  }}
                  style={{ cursor: "pointer", gap: 5 }}
                >
                  <DeleteOutlineIcon style={{ color: "red" }} fontSize="small" />
                  Delete
                </MenuItem>
              </Menu>
            </Box>

            <Typography variant="body2" component="span" color={"text.primary"} mb={1}>
              {reply.content}
            </Typography>

            <Box display="flex" alignItems="center" justifyContent="flex-start" gap={1}>
              <ThumbUpIcon
                cursor="pointer"
                onClick={() => handleLikeReply(reply._id)}
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
              <Typography variant="body2" color="text.secondary" component="span">
                {reply.likes.length > 0 && reply.likes.length}
              </Typography>
            </Box>
            {isEdit && (
              <Box mt={1}>
                <TextField
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Edit your reply..."
                  fullWidth
                  multiline
                  rows={2}
                />
                <Box mt={1} display="flex" justifyContent="flex-end" gap={1}>
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
                    onClick={handleEdit}
                    disabled={reply.content === content}
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<ReplyIcon fontSize="small" />}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            )}
          </ListItemText>
        </Box>
      ) : (
        <ListItem>
          <ListItemAvatar>
            <Skeleton variant="circular" width={40} height={40} />
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton variant="text" width="20%" />}
            secondary={<Skeleton variant="text" width="20%" />}
          />
        </ListItem>
      )}
      <IsLogin
        setLoginDialogOpen={setLoginDialogOpen}
        loginDialogOpen={loginDialogOpen}
        message={" If you want to like, then please login."}
      />
    </ListItem>
  );
};

export default Reply;
