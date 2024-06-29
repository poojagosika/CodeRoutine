import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  List,
  Avatar,
  TextField,
  Stack,
  Skeleton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/ChatBubble";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  addCommentToTopic,
  deleteDiscussById,
  getDiscussById,
  addLikeOrRemoveLike,
  updateDiscussByI,
} from "../../Services/AuthService";
import getCuteAvatar from "../../Config/getCuteAvatar";
import DiscussEdit from "./DiscussEdit";
import { ContextStore } from "../../Context/ContextStore";
import Comment from "./Comment";
import IsLogin from "../../Component/IsLogin";

const DiscussDetails = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [update, setUpdate] = useState({});
  const [newComment, setNewComment] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false); // New state
  const [isLiked, setIsLiked] = useState(null);
  const [likeorComment, setisLikeorComment] = useState(null);

  const navigate = useNavigate();
  const { userData } = ContextStore();

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await getDiscussById(id);
        setTopic(response.data);
        setUpdate(response.data);
      } catch (error) {
        console.error("Error fetching topic:", error);
      }
    };

    fetchTopic();
  }, [id]);

  useEffect(() => {
    if (topic) {
      setIsLiked(topic?.likes?.includes(userData?._id));
    }
  }, [topic, userData]);

  const handleDelete = async () => {
    try {
      await deleteDiscussById(id);
      navigate("/discuss");
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      if (!userData) {
        // Check if user is logged in
        setisLikeorComment("If you want write comment,then please Login");
        setLoginDialogOpen(true); // Open login dialog
        return; // Exit function to prevent further execution
      }

      const response = await addCommentToTopic(id, {
        content: newComment,
      });
      if (response && response.data) {
        const newCommentData = {
          ...response.data.comment,
          author: {
            _id: userData?._id,
            userName: userData?.userName,
          },
        };
        const updatedComments = [...(topic?.comments || []), newCommentData];
        setTopic((prevTopic) => ({
          ...prevTopic,
          comments: updatedComments,
        }));
      }
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      // Handle error scenarios here
    }
  };

  const handleLike = async () => {
    if (!userData) {
      // Check if user is logged in
      setisLikeorComment("If you want to like,then please Login");
      setLoginDialogOpen(true); // Open login dialog
      return;
    }

    const userId = userData?._id;
    try {
      const response = await addLikeOrRemoveLike(id);
      const userLikes = topic?.likes.includes(userId);
      if (response && response.data) {
        if (!userLikes) {
          setTopic((prevTopic) => ({
            ...prevTopic,
            likes: [...(topic?.likes || []), userId],
          }));
          setIsLiked(true);
        } else {
          setTopic((prevTopic) => ({
            ...prevTopic,
            likes: prevTopic.likes.filter((like) => like !== userId),
          }));
          setIsLiked(false);
        }
      } else {
        console.error("Invalid response data:", response);
      }
    } catch (error) {
      console.error("Error liking/unliking topic:", error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleContentChange = (value) => {
    setUpdate({
      ...update,
      content: value,
    });
  };

  const handleUpdatePost = async () => {
    try {
      const response = await updateDiscussByI(id, {
        title: update.title,
        content: update.content,
        tags: update.tags,
      });
      setTopic(response.data.topic);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <Container style={{ marginTop: 30, padding: 5 }}>
      {!topic ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={50} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" height={40} />
          <Skeleton variant="text" height={40} />
          <Skeleton variant="rectangular" height={150} />
        </Stack>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            {topic.title}
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            gap={1}
          >
            <Avatar
              alt={topic?.author?.userName}
              src={getCuteAvatar(topic?.author?.userName)}
            />
            <Typography variant="subtitle1">
              {topic?.author?.userName}
            </Typography>
            <ThumbUpIcon
              cursor="pointer"
              onClick={handleLike}
              style={{ color: isLiked ? "#0247FE" : "gray" }}
            />
            {topic?.likes?.length > 0 && topic?.likes?.length}
            {userData?._id === topic?.author?._id && (
              <>
                <EditIcon
                  onClick={handleOpenDialog}
                  style={{ color: "green" }}
                />
                <DeleteOutlineIcon
                  onClick={handleDelete}
                  style={{ color: "red" }}
                />
              </>
            )}
          </Box>

          <Typography gutterBottom variant="h6">
            <div dangerouslySetInnerHTML={{ __html: topic.content }} />
          </Typography>

          <Box mt={3}>
            <Typography
              variant="body2"
              display={"flex"}
              gap={1}
              alignItems={"center"}
            >
              <CommentIcon color="primary" /> Comments:{" "}
              {topic?.comments?.length}
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              mt={2}
              mb={2}
            >
              <TextField
                value={newComment}
                fullWidth
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Type comment here..."
                multiline
                rows={2}
              />
              <Button
                onClick={handleAddComment}
                variant="contained"
                color="primary"
                style={{ marginTop: 10 }}
              >
                Post
              </Button>
            </Box>

            {topic?.comments?.length === 0 ? (
              <Typography variant="body2">No comments yet</Typography>
            ) : (
              <List>
                {topic?.comments
                  ?.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                  ))
                  .reverse()}
              </List>
            )}
          </Box>

          <DiscussEdit
            openDialog={openDialog}
            update={update}
            setUpdate={setUpdate}
            handleCloseDialog={handleCloseDialog}
            handleContentChange={handleContentChange}
            handleUpdatePost={handleUpdatePost}
          />

          <IsLogin
            setLoginDialogOpen={setLoginDialogOpen}
            loginDialogOpen={loginDialogOpen}
            message={likeorComment}
          />
        </>
      )}
    </Container>
  );
};

export default DiscussDetails;
