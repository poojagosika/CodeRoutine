import React, {  useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import ReactQuill from "react-quill";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { ContextStore } from "../../Context/ContextStore";
import { useDispatch } from "react-redux";
import { createDiscuss } from "../../features/discuss/discussAction";

const NewPost = (props) => {
  const [postLoading, setPostLoading] = useState(false);
  const [newPostData, setNewPostData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const { userData } = ContextStore();
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPostData.title || !newPostData.content || !newPostData.tags) {
      setError("All fields are required.");
      return;
    }

    try {
      setPostLoading(true);
      dispatch(createDiscuss(newPostData));
      setNewPostData({ title: "", content: "", tags: "" });
      props.setOpenDialog(false);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setPostLoading(false);
    }
  };

  const handleContentChange = (value) => {
    setNewPostData({ ...newPostData, content: value });
  };

  return (
    <Dialog
      open={props.openDialog}
      onClose={props.handleCloseDialog}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="lg"
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
          value={newPostData.title}
          onChange={(e) =>
            setNewPostData({ ...newPostData, title: e.target.value })
          }
          required
          InputProps={{
            endAdornment: postLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : null,
          }}
        />
        <TextField
          label="Tags (comma separated)"
          fullWidth
          id="tags"
          margin="dense"
          type="text"
          value={newPostData.tags}
          onChange={(e) =>
            setNewPostData({ ...newPostData, tags: e.target.value })
          }
          required
          InputProps={{
            endAdornment: postLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : null,
          }}
        />
        <ReactQuill
          value={newPostData.content}
          onChange={handleContentChange}
          theme="snow"
          placeholder="Write your post here..."
          style={{ height: "200px", marginBottom: "50px" }}
        />

        {error && (
          <Typography
            color="error"
            variant="body2"
            sx={{ display: "flex", alignItems: "center" }}
            component="div"
            alignItems="center"
            justifyContent="center"
          >
            {error}
          </Typography>
        )}

        <DialogActions>
          <Button
            onClick={props.handleCloseDialog}
            color="primary"
            variant="contained"
            startIcon={<CloseIcon />}
            size="small"
            disabled={postLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreatePost}
            color="primary"
            variant="contained"
            size="small"
            startIcon={
              postLoading ? <CircularProgress size={20} /> : <SendIcon />
            }
            disabled={postLoading}
          >
            Post
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default NewPost;
