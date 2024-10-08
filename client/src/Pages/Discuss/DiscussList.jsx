import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReactTimeAgo from "react-time-ago";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import getCuteAvatar from "../../Config/getCuteAvatar";
import { ContextStore } from "../../Context/ContextStore";
import IsLogin from "../../Component/IsLogin";
import { useDispatch } from "react-redux";
import { addLikeOrRemoveLike } from "../../features/discuss/discussAction";
const DiscussList = (props) => {
  const navagate = useNavigate();
  const { userData } = ContextStore();
  const [discussion, setDiscussion] = useState(props?.discussion);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false); // New state
  const [likeorComment, setisLikeorComment] = useState(null);
  const userLikes = discussion?.likes.includes(userData?._id);

  const dispatch = useDispatch();
  const handleLike = async () => {
    dispatch(addLikeOrRemoveLike(discussion?._id));
  };

  return (
    <ListItem
      button
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
          alt={discussion?.author?.userName}
          src={getCuteAvatar(discussion?.author?.userName)}
          onClick={() => navagate(`/profile/${discussion?.author?.userName}`)}
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
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            onClick={() => navagate(`${discussion._id}`)}
            variant="body2"
            color="textPrimary"
            sx={{
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            component="span"
          >
            {discussion?.title}
          </Typography>
        }
        secondary={
          <Typography
            component="div" // Changed from default <p> to <div>
          >
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  marginRight: 1,
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={() =>
                  navagate(`/profile/${discussion?.author?.userName}`)
                }
                component="span"
              >
                {discussion?.author?.userName}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
              >
                Created at:{" "}
                <ReactTimeAgo
                  date={new Date(discussion?.createdAt).getTime()}
                  locale="en-US"
                />
              </Typography>
            </Box>
          </Typography>
        }
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <ThumbUpIcon
          fontSize="small"
          color="action"
          aria-label="like"
          onClick={handleLike}
          style={{ cursor: "pointer" }}
          sx={{
            color: userLikes ? "#0247FE" : "gray",
            "&:hover": {
              color: userLikes ? "gray" : "#0247FE",
            },
          }}
        />
        <Typography
          variant="body2"
          color="gray"
          style={{ cursor: "pointer" }}
          component="span"
        >
          {discussion?.likes?.length > 0 && discussion?.likes?.length}
        </Typography>
      </Box>
      <IsLogin
        setLoginDialogOpen={setLoginDialogOpen}
        loginDialogOpen={loginDialogOpen}
        message={likeorComment}
      />
    </ListItem>
  );
};

export default DiscussList;
