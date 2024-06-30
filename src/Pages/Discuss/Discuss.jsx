import React, { useCallback, useEffect, useState } from "react";
import {
    List,
    Container,
    Box,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    InputBase,
    Skeleton,
    debounce,
} from "@mui/material";

import ReactQuill from "react-quill";
import { styled } from "@mui/system";
import { createDiscuss, getDiscuss } from "../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import DiscussList from "./DiscussList";
import { ContextStore } from "../../Context/ContextStore";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DiscussLoading from "./Loading/DiscussLoading";

const PreviewArea = styled("div")(({ theme }) => ({
    border: "1px solid #ccc",
    padding: theme.spacing(2),
    minHeight: "200px",
    marginTop: theme.spacing(2),
    backgroundColor: "#f9f9f9",
}));

const Discuss = () => {
    const [Loading, setLoading] = useState(true);
    const [postloading, setPostLoading] = useState(false);
    const [discussions, setDiscussions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [newPostData, setNewPostData] = useState({
        title: "",
        content: "",
        tags: "",
    });
    const { userData } = ContextStore();

    const fetchDiscussions = useCallback(async () => {
        try {
            const response = await getDiscuss();
            setDiscussions(response?.data?.topics || []);
        } catch (error) {
            console.error("Error fetching discussions:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDiscussions();
    }, [fetchDiscussions]);

    const handleSearch = useCallback(
        debounce((searchTerm) => {
            const filteredDiscussions = discussions.filter((topic) =>
                topic.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setDiscussions(filteredDiscussions);
        }, 300),
        [discussions]
    );

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        handleSearch(searchTerm);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        try {
            setPostLoading(true);
            const response = await createDiscuss(newPostData);
            if (response && response.data) {
                const newPost = {
                    ...response.data.newTopic,
                    author: {
                        _id: userData?._id,
                        userName: userData?.userName
                    }
                }
                setDiscussions([newPost, ...(discussions || [])]);
                setNewPostData({ title: "", content: "", tags: "" });
                setOpenDialog(false); // Close dialog
                setPostLoading(false)
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const handleContentChange = (value) => {
        setNewPostData({
            ...newPostData,
            content: value,
        });
    };
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} >
            <Box display="flex" justifyContent="right" gap={2} alignItems="center">
                <InputBase
                    placeholder="Search..."
                    style={{ width: 300 }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    inputProps={{ "aria-label": "search" }}
                    sx={{
                        border: "1px solid #ced4da",
                        borderRadius: "4px",
                        padding: "2px 12px",
                    }}
                    size="small"
                />
                <Button variant="contained" color="primary" onClick={handleOpenDialog}
                    startIcon={<OpenInNewIcon />}
                    size="small"
                >
                    New
                </Button>
            </Box>
            {Loading ? (
                <DiscussLoading />
            ) : (
                <List>
                    {discussions
                        .map((discussion) => (
                            <DiscussList discussion={discussion} key={discussion._id}
                            />
                        ))
                    }
                </List>
            )}

            {/* Create Post Dialog */}
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
                        value={newPostData.title}
                        onChange={(e) =>
                            setNewPostData({ ...newPostData, title: e.target.value })
                        }
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
                    />
                    <ReactQuill
                        value={newPostData.content}
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
                    >
                        Cancel
                    </Button>
                    {postloading ? (
                        <Button
                            onClick={handleCreatePost}
                            color="primary"
                            variant="contained"
                            disabled
                        >
                            <CircularProgress size={15} style={{ marginRight: "8px" }} />
                            Post
                        </Button>
                    ) : (
                        <Button
                            onClick={handleCreatePost}
                            color="primary"
                            variant="contained"
                            disabled={
                                !(
                                    newPostData?.title &&
                                    newPostData?.content &&
                                    newPostData?.tags
                                )
                            }
                        >
                            Post
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </Container >
    );
};

export default Discuss;
