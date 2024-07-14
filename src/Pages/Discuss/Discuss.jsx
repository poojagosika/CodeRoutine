import React, { useCallback, useEffect, useState } from "react";
import {
    List,
    Container,
    Box,
    Button,
    InputBase,
    debounce,
} from "@mui/material";
import DiscussList from "./DiscussList";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DiscussLoading from "./Loading/DiscussLoading";
import NewPost from "./NewPost";
import { getDiscuss } from "../../Api/Discuss/discussApi";

const Discuss = () => {
    const [Loading, setLoading] = useState(true);
    const [discussions, setDiscussions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

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
            <NewPost
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                setDiscussions={setDiscussions}
                setOpenDialog={setOpenDialog} />
        </Container >
    );
};

export default Discuss;
