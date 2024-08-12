import { Box, Button, Grid, Paper, Typography, Chip, IconButton } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArticleIcon from "@mui/icons-material/Article";
import PsychologyIcon from '@mui/icons-material/Psychology';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ReactTimeAgo from "react-time-ago";
import { Link, useNavigate } from 'react-router-dom';
import { savedJob } from '../../Api/jobAPi';
import { toast } from 'react-toastify';

const JobCard = ({ job, index }) => {
    const navigate = useNavigate();
    const cardRef = useRef(null);
    const [isSaved, setIsSaved] = useState(job.saved);

    const jobExpiry = useMemo(() => {
        const currentDate = new Date();
        return new Date(job?.applicationDeadline) > currentDate;
    }, [job?.applicationDeadline]);

    const handleClick = () => {
        navigate(`/jobs/${job._id}`);
    };

    const toggleSaveStatus = async (e) => {
        e.stopPropagation(); // Prevent triggering card click event
        try {
            const res = await savedJob(job._id);
            if (res.status === 200) {
                setIsSaved(!isSaved);
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const card = cardRef.current;
        if (card) {
            card.style.animationDelay = `${index * 0.1}s`; // Stagger animation based on index
            card.classList.add('card-animation');
        }
    }, [index]);

    return (
        <Paper
            ref={cardRef}
            elevation={3}
            sx={{
                padding: 2,
                borderLeft: "5px solid transparent",
                transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
                "&:hover": {
                    borderColor: jobExpiry || !job?.applicationDeadline ? "green" : "red",
                    cursor: "pointer",
                },
                position: 'relative',
            }}
            onClick={handleClick}
        >
            <Box display="flex" flexDirection="column">
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {job.title}
                </Typography>
                <Typography color="textSecondary" sx={{ fontWeight: 600 }}>
                    {job.company}
                </Typography>

                <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <WorkOutlineIcon sx={{ color: "#00000099" }} aria-label="Job Level" />
                        <Typography variant="body1">{job.jobLevel}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <CurrencyRupeeIcon sx={{ color: "#00000099" }} aria-label="Salary" />
                        <Typography variant="body1">
                            {job.salary ? job.salary : "Not specified"}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <LocationOnIcon sx={{ color: "#00000099" }} aria-label="Location" />
                        <Typography variant="body1">{job.location}</Typography>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <ArticleIcon sx={{ color: "#00000099" }} aria-label="Responsibilities" />
                    <Typography variant="body1" noWrap>
                        {job.responsibilities.join(" ").length < 100
                            ? job.responsibilities.join(" ")
                            : `${job.responsibilities.join(" ").slice(0, 90)}....`}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mt={1} flexWrap="wrap">
                    <PsychologyIcon sx={{ color: "#00000099" }} aria-label="Skills" />
                    {job.skills.slice(0, 5).map((skill, index) => (
                        <Chip key={index} label={skill} size="small" sx={{ marginRight: 0.5 }} />
                    ))}
                </Box>

                <Box display="flex" alignItems="center" justifyContent="space-between" >
                    <Typography variant="body2" color="textSecondary">
                        <ReactTimeAgo date={new Date(job?.postedOn).getTime()} locale="en-US" />
                    </Typography>

                    <Button
                        component={Link}
                        to={`/jobs/${job._id}`}
                        variant="contained"
                        color="primary"
                        size="small"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            mt: 1,
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                                backgroundColor: "primary.dark",
                            },
                            position: "relative",
                            right: 0,
                        }}
                    >
                        View Job
                    </Button>
                </Box>
            </Box>

            {/* Save icon button */}
            <IconButton
                onClick={toggleSaveStatus}
                sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    color: isSaved ? 'blue' : 'grey',
                }}
                aria-label="Save Job"
            >
                {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
        </Paper>
    );
};

export default React.memo(JobCard);
