import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ReactQuill from "react-quill";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";
import { updateDiscussById } from "../../Api/Discuss/discussApi";
import { toast } from "react-toastify";

const DiscussEdit = ({
  openDialog,
  update,
  setUpdate,
  handleCloseDialog,
  handleContentChange,
  setOpenDialog,
  setTopic,
}) => {
  const [postLoading, setPostLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { id } = useParams();

  const handleUpdatePost = async () => {
    try {
      setPostLoading(true);
      const response = await updateDiscussById(id, {
        title: update.title,
        content: update.content,
        tags: update.tags,
      });
      setTopic(response.data.topic);
      setOpenDialog(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setError("Error updating post:", error);
    } finally {
      setPostLoading(false);
    }
  };
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle>Edit Post</DialogTitle>
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
          value={update.tags}
          onChange={(e) => setUpdate({ ...update, tags: e.target.value })}
          required
          InputProps={{
            endAdornment: postLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : null,
          }}
        />
        <ReactQuill
          value={update.content}
          onChange={handleContentChange}
          theme="snow"
          placeholder="Edit your post here..."
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
            onClick={handleCloseDialog}
            color="primary"
            variant="contained"
            startIcon={<CloseIcon />}
            size="small"
            disabled={postLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdatePost}
            color="primary"
            variant="contained"
            size="small"
            startIcon={
              postLoading ? <CircularProgress size={20} /> : <ModeEditIcon />
            }
            disabled={postLoading}
          >
            Edit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default DiscussEdit;
