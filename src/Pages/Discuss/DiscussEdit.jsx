import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import ReactQuill from "react-quill";
import ReplyIcon from "@mui/icons-material/Reply";
import CloseIcon from "@mui/icons-material/Close";

const DiscussEdit = ({
  openDialog,
  update,
  setUpdate,
  handleCloseDialog,
  handleContentChange,
  handleUpdatePost,
}) => {
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Edit New Post</DialogTitle>
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
          theme="snow"
          style={{ height: "200px", marginBottom: "20px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseDialog}
          color="secondary"
          variant="outlined"
          startIcon={<CloseIcon fontSize="small" />}
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpdatePost}
          color="primary"
          variant="outlined"
          startIcon={<ReplyIcon fontSize="small" />}
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DiscussEdit;
