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
  TextField,
} from "@mui/material";
import getCuteAvatar from "../../Config/getCuteAvatar";
import ReactTimeAgo from "react-time-ago";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SendIcon from "@mui/icons-material/Send";
import IsLogin from "../../Component/IsLogin";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  addLikeOrRemoveLikeReply,
  editReply,
  deleteReply,
} from "../../features/discuss/discussReplyActions";

const Reply = ({ topicId, commentId, reply }) => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(reply.content);
  const { userData } = ContextStore();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLikeReply = async () => {
    dispatch(
      addLikeOrRemoveLikeReply({
        topicId: topicId,
        commentId: commentId,
        replyId: reply?._id,
      })
    );
  };

  const handleEdit = async () => {
    dispatch(
      editReply({
        topicId: topicId,
        commentId: commentId,
        replyId: reply?._id,
        content: content,
      })
    );
    setIsEdit(false);
  };

  const handleDeleteComment = () => {
    dispatch(
      deleteReply({
        topicId: topicId,
        commentId: commentId,
        replyId: reply._id,
      })
    );
  };
  const handleCloseEdit = () => {
    setIsEdit(true);
    setAnchorEl(null);
  };

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
              <Typography
                variant="body2"
                color="text.secondary"
                component="span"
              >
                {reply.author.userName}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                component="span"
              >
                <ReactTimeAgo
                  date={new Date(reply.createdAt).getTime()}
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

            <Typography
              variant="body2"
              component="span"
              color={"text.primary"}
              mb={1}
            >
              {reply.content}
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              gap={1}
            >
              <ThumbUpIcon
                cursor="pointer"
                onClick={() => handleLikeReply(reply._id)}
                fontSize="small"
                sx={{
                  color: reply?.likes?.includes(userData?._id)
                    ? "#0247FE"
                    : "gray",
                  "&:hover": {
                    color: reply?.likes?.includes(userData?._id)
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
                {reply?.likes?.length > 0 && reply?.likes?.length}
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
                    startIcon={<SendIcon fontSize="small" />}
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
