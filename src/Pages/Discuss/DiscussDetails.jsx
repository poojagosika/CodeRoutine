import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import { createAvatar } from "@dicebear/core";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  avataaars,
  micah,
  bottts,
  adventurer,
  identicon,
  initials,
} from "@dicebear/collection";
import { ContextStore } from "../../Context/ContextStore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  ddeleteDiscussById,
  getDiscussById,
  updateDiscussByI,
} from "../../Services/AuthService";
import ReactQuill from "react-quill";

const getCuteAvatar = (author) => {
  const styles = [avataaars, micah, bottts, adventurer, identicon, initials];
  const style = styles[author.length % styles.length];
  const avatar = createAvatar(style, {
    seed: author,
    size: 128,
  });
  return avatar.toDataUri();
};

const DiscussDetails = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [update, setUpdate] = useState(topic);
  const [newComment, setNewComment] = useState("");
  const { userData } = ContextStore();
  const [openDialog, setOpenDialog] = useState(false);
  const navagate = useNavigate();

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

  const handleDelete = async () => {
    try {
      await ddeleteDiscussById(id);
      navagate("/discuss");
      // Redirect or show a message indicating successful deletion
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/discuss/${id}`,
        {
          content: newComment,
          author: userData.userName, // Replace with actual authenticated user
        }
      );
      setTopic(response.data); // Update topic state with new comment
      setNewComment(""); // Clear input field
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!topic) return <Typography>Loading...</Typography>;
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
      console.log(update);
      const response = await updateDiscussByI(id, {
        title: update.title,
        content: update.content,
        tags: update.tags,
      });
      setTopic(response.data.topic);
      //messge display for updated
      setOpenDialog(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  return (
    <Container style={{ marginTop: 30, padding: 5 }}>
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
        <Typography variant="subtitle1">{topic?.author?.userName}</Typography>
        <ThumbUpIcon
          cursor="pointer"
          style={{
            color: "gray",
          }}
        />
        <EditIcon
          onClick={() => {
            setOpenDialog(true);
          }}
          style={{ color: "green" }}
        />
        <DeleteOutlineIcon
          onClick={handleDelete}
          style={{
            color: "red",
          }}
        />
      </Box>

      <Typography gutterBottom variant="h6">
        <div dangerouslySetInnerHTML={{ __html: topic.content }} />
      </Typography>

      <Box mt={3}>
        <Typography variant="h5" gutterBottom>
          Comments
        </Typography>
        {topic.comments.length === 0 ? (
          <Typography>No comments yet</Typography>
        ) : (
          <List>
            {topic.comments.map((comment) => (
              <ListItem key={comment._id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={comment.author}
                    src={getCuteAvatar(comment.author)}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.author}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {comment.content}
                      </Typography>
                      <br />
                      {comment.createdAt &&
                        new Date(comment.createdAt).toLocaleString()}
                    </React.Fragment>
                  }
                />

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <List>
                    {comment.replies.map((reply) => (
                      <ListItem
                        key={reply._id}
                        alignItems="flex-start"
                        style={{ paddingLeft: 80 }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={reply.author}
                            src={getCuteAvatar(reply.author)}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={reply.author}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                                {reply.content}
                              </Typography>
                              <br />
                              {reply.createdAt &&
                                new Date(reply.createdAt).toLocaleString()}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* Add Comment Section */}
      <Box mt={3}>
        <Typography variant="h5" gutterBottom>
          Add a Comment
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Your Comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddComment}
          style={{ marginTop: 20 }}
        >
          Add Comment
        </Button>
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={update.title}
            onChange={(e) => setUpdate({ ...update, title: e.target.value })}
          />
          <TextField
            label="Tags (comma separated)"
            fullWidth
            id="tags"
            margin="dense"
            type="text"
            value={update.tags}
            onChange={(e) => setUpdate({ ...update, tags: e.target.value })}
          />
          <ReactQuill
            value={update.content}
            onChange={handleContentChange}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["bold", "italic", "underline"],
                ["link", "image"],
              ],
            }}
            formats={[
              "header",
              "font",
              "list",
              "bullet",
              "bold",
              "italic",
              "underline",
              "link",
              "image",
            ]}
            style={{ height: "200px", marginBottom: "20px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdatePost} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DiscussDetails;
