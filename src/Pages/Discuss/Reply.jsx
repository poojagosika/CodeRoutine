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
} from "@mui/material";
import getCuteAvatar from "../../Config/getCuteAvatar";
import ReactTimeAgo from "react-time-ago";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { addLikeOrRemoveLikeReply } from "../../Services/AuthService";
import IsLogin from "../../Component/IsLogin";

const Reply = (props) => {
  const [reply, setReply] = useState(props?.reply);
  const [isLiked, setIsLiked] = useState(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const { userData } = ContextStore();
  const userId = userData?._id;

  const handleLikeReply = async (replyId) => {
    if (!userData) {
      setLoginDialogOpen(true);
      return;
    }
    try {
      const response = await addLikeOrRemoveLikeReply(replyId);
      const userLikes = reply?.likes.includes(userId);
      if (response && response.data) {
        if (!userLikes) {
          setReply((prevReply) => ({
            ...prevReply,
            likes: [...(reply?.likes || []), userId],
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

  useEffect(() => {
    if (reply) {
      setIsLiked(reply?.likes?.includes(userData?._id));
    }
  }, [reply, userData]);

  return (
    <ListItem
      key={reply._id}
      alignItems="flex-start"
      style={{ paddingLeft: 80 }}
    >
      {reply ? (
        <Box display="flex" gap={1} mt={1} mb={1} width="100%">
          <Avatar
            alt={reply?.author?.userName}
            src={getCuteAvatar(reply?.author?.userName)}
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
          <Box display="flex" flexDirection="column" sx={{ width: "100%" }}>
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
                {reply?.author?.userName}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                component="span"
              >
                <ReactTimeAgo
                  date={new Date(reply?.createdAt).getTime()}
                  locale="en-US"
                />
              </Typography>
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
                {reply?.likes?.length > 0 && reply?.likes?.length}
              </Typography>
            </Box>
          </Box>
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
