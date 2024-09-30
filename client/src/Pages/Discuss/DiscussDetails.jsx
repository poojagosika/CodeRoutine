import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Avatar,
  TextField,
  List,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/ChatBubble";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SendIcon from "@mui/icons-material/Send";
import getCuteAvatar from "../../Config/getCuteAvatar";
import DiscussEdit from "./DiscussEdit";
import { ContextStore } from "../../Context/ContextStore";
import Comment from "./Comment";
import IsLogin from "../../Component/IsLogin";
import TopicLoadig from "./Loading/TopicLoadig";
import { useDispatch, useSelector } from "react-redux";
import {
  addLikeOrRemoveLike,
  deleteDiscussById,
  getDiscussById,
} from "../../features/discuss/discussAction";
import { addCommentToTopic } from "../../features/discuss/discussCommentAction";

const DiscussDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiscussById(id));
  }, [id]);

  const topic = useSelector((state) => state?.discussions?.discussions).find(
    (item) => item._id === id
  );
  const [update, setUpdate] = useState({});
  const [newComment, setNewComment] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false); // New state
  const [likeorComment, setisLikeorComment] = useState(null);

  const navigate = useNavigate();
  const { userData } = ContextStore();
  const userLikes = topic?.likes.includes(userData?._id);

  React.useEffect(() => {
    document.title = "CodeRoutine | Discuss Details";
  }, []);

 

  const handleDelete = () => {
    dispatch(deleteDiscussById(id));
    navigate("/discuss");
  };

  const handleAddComment = () => {
    dispatch(addCommentToTopic({ id, content: newComment }));
    setNewComment("");
  };

  const handleLike = async () => {
    dispatch(addLikeOrRemoveLike(topic?._id));
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

  return (
    <Container maxWidth="lg" sx={{ mt: 5, minHeight: "100vh" }}>
      {!topic ? (
        <TopicLoadig />
      ) : (
        <>
          <Typography variant="h5" mb={2}>
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
              onClick={() => navigate(`/profile/${topic?.author?.userName}`)}
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
            <Typography
              variant="body2"
              color="gray"
              onClick={() => navigate(`/profile/${topic?.author?.userName}`)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              {topic?.author?.userName}
            </Typography>
            <ThumbUpIcon
              cursor="pointer"
              onClick={handleLike}
              fontSize="small"
              sx={{
                color: userLikes ? "#0247FE" : "gray",
                "&:hover": {
                  color: userLikes ? "gray" : "#0247FE",
                },
              }}
              color="action"
              aria-label="like"
            />
            <Typography variant="body2" color="gray">
              {topic?.likes?.length > 0 && topic?.likes?.length}
            </Typography>
            {userData?._id === topic?.author?._id && (
              <>
                <EditIcon
                  onClick={handleOpenDialog}
                  fontSize="small"
                  aria-label="edit"
                  cursor="pointer"
                  sx={{
                    color: "green",
                    "&:hover": {
                      color: "blue",
                    },
                  }}
                  color="action"
                />
                <DeleteOutlineIcon
                  onClick={handleDelete}
                  fontSize="small"
                  aria-label="delete"
                  cursor="pointer"
                  sx={{
                    color: "red",
                    "&:hover": {
                      color: "orange",
                    },
                  }}
                  color="action"
                />
              </>
            )}
          </Box>

          <Typography variant="body2" color="gray" mt={2} component={"div"}>
            <div dangerouslySetInnerHTML={{ __html: topic.content }} />
          </Typography>

          <Box mt={2} gap={1}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              gap={1}
            >
              <CommentIcon
                fontSize="small"
                color="action"
                aria-label="comment"
                cursor="pointer"
                sx={{
                  color: "blue",
                }}
              />
              <Typography variant="body2" color="gray">
                Comments: {topic?.comments?.length}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="flex-end"
              flexDirection="column"
              gap={1}
              mt={1}
            >
              <TextField
                value={newComment}
                fullWidth
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Type comment here..."
                multiline
                rows={2}
                variant="outlined"
                aria-label="comment"
              />
              <Button
                onClick={handleAddComment}
                variant="contained"
                color="primary"
                size="small"
                aria-label="add comment"
                sx={{
                  color: "white",
                }}
                disabled={!newComment.trim()}
                startIcon={<SendIcon fontSize="small" />}
              >
                Post
              </Button>
            </Box>
          </Box>

          {topic?.comments?.length === 0 ? (
            <Typography variant="body2" color="gray">
              No comments yet ! 😢
            </Typography>
          ) : (
            <List>
              {topic?.comments
                ?.map((comment, index) => (
                  <Comment
                    key={comment?._id || index}
                    comment={comment}
                    topicId={topic?._id}
                  />
                ))
                .reverse()}
            </List>
          )}

          <DiscussEdit
            openDialog={openDialog}
            update={update}
            setUpdate={setUpdate}
            handleCloseDialog={handleCloseDialog}
            handleContentChange={handleContentChange}
            setOpenDialog={setOpenDialog}
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
