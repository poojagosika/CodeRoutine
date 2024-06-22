import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Container,
    Box,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
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
import ReactTimeAgo from 'react-time-ago'

const getCuteAvatar = (author) => {
    const styles = [avataaars, micah, bottts, adventurer, identicon, initials];
    const style = styles[author.length % styles.length];
    const avatar = createAvatar(style, {
        seed: author,
        size: 128,
    });
    return avatar.toDataUri();
};

const DiscussList = () => {
    const { userData } = ContextStore();
    const [discussions, setDiscussions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [newPostData, setNewPostData] = useState({
        title: "",
        content: "",
        tags: "",
        author: userData?.userName,
    });

    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/discuss");
                setDiscussions(response.data.topics);
            } catch (error) {
                console.error("Error fetching discussions:", error);
            }
        };

        fetchDiscussions();
    }, []);

    const handleSearch = async (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        const filteredDiscussions = discussions.filter((topic) => {
            return topic.title.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setDiscussions(filteredDiscussions);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleCreatePost = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/discuss",
                newPostData
            );
            // Optionally, you can update discussions state to include the new post
            setDiscussions([...discussions, response.data.newTopic]);
            setNewPostData({ title: "", content: "", tags: "" }); // Clear form data
            setOpenDialog(false); // Close dialog
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <Container mt={4}>
            <Box display="flex" justifyContent="right" gap={2} alignItems="center">
                {/* Search Bar */}
                <TextField
                    variant="outlined"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={handleSearch}
                />

                {/* Create Post Button */}
                <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                    New +
                </Button>
            </Box>
            <List>
                {discussions.map((discussion) => (
                    <ListItem
                        key={discussion._id}
                        button
                        component="a"
                        href={`/discuss/${discussion._id}`}
                    >
                        <ListItemAvatar>
                            <Avatar
                                alt={discussion.author}
                                src={getCuteAvatar(discussion.author)}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={discussion.title}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        By: {discussion.author} Created At:{" "}
                                        <ReactTimeAgo date={discussion.createdAt} locale="en-US" />
                                    </Typography>

                                </React.Fragment>
                            }
                        />
                        <Box textAlign="right">
                            <Typography variant="body2" color="textSecondary">
                                Likes: {discussion.likes}
                            </Typography>
                        </Box>
                    </ListItem>
                ))}
            </List>

            {/* Create Post Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
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

                    <TextField
                        margin="dense"
                        id="content"
                        label="Content"
                        multiline
                        rows={4}
                        fullWidth
                        value={newPostData.content}
                        onChange={(e) =>
                            setNewPostData({ ...newPostData, content: e.target.value })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreatePost} color="primary">
                        Post
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default DiscussList;
