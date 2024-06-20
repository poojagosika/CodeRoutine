import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
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
  IconButton,
} from "@mui/material";
import { createAvatar } from "@dicebear/core";
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
  const [newComment, setNewComment] = useState("");
  const { userData } = ContextStore();
  const navagate = useNavigate();

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/discuss/${id}`
        );
        setTopic(response.data);
      } catch (error) {
        console.error("Error fetching topic:", error);
      }
    };

    fetchTopic();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/discuss/${id}`);
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

  return (
    <Container style={{ marginTop: 30, padding: 5 }}>
      <Typography variant="h4" gutterBottom>
        {topic.title}
      </Typography>
      <Box display="flex" alignItems="center">
        <Typography variant="subtitle1" gutterBottom>
          By {topic.author}
        </Typography>
        <Box ml={2} display="flex">
          <Button
            component={Link}
            to={`/update/${topic._id}`}
            style={{ minWidth: "auto", padding: 0, color: "green" }}
          >
            <EditIcon />
          </Button>
          <Button
            onClick={handleDelete}
            style={{
              minWidth: "auto",
              padding: 0,
              marginLeft: 8,
              color: "red",
            }}
          >
            <DeleteOutlineIcon />
          </Button>
        </Box>
      </Box>

      <Typography variant="body1" gutterBottom>
        {topic.content}
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
    </Container>
  );
};

export default DiscussDetails;
