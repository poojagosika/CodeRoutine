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
            // Optionally, you can update discussions state to include the new post
            setDiscussions([...discussions, response.data.newTopic]);
            setNewPostData({ title: "", content: "", tags: "" }); // Clear form data
            setOpenDialog(false); // Close dialog
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
    console.log(discussions)
    return (
        <Container style={{ marginTop: 20 }}>
            <Box display="flex" justifyContent="right" gap={2} alignItems="center">
                <Grid display="flex" justifyContent="right" gap={1} alignItems="center">
                    <InputBase
                        placeholder="Search posts..."
                        inputProps={{ "aria-label": "Search posts..." }}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        style={{
                            border: "1px solid grey",
                            borderRadius: "4px",
                            width: "250px",
                            padding: 1,
                            paddingLeft: "6px",
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                        New +
                    </Button>
                </Grid>
            </Box>
            {Loading ? (
                <>
                    <Box style={{ margin: "30px" }}>
                        <Skeleton style={{ height: "80px" }} />
                        <Skeleton style={{ height: "70px" }} />
                        <Skeleton style={{ height: "60px" }} />
                    </Box>
                </>
            ) : (
                <List>
                    {discussions
                        .map((discussion) => (
                            <DiscussList discussion={discussion} key={discussion._id}
                            />
                        ))
                    }
                </List>
            )
            }

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