import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'
import ReactQuill from 'react-quill'

const DiscussEdit = ({ openDialog, update, setUpdate, handleCloseDialog, handleContentChange, handleUpdatePost }) => {
    return (
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
    )
}

export default DiscussEdit