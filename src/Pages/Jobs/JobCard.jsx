import React, { useEffect, useMemo } from 'react';
import { Box, Button, Paper, Typography, Chip, } from '@mui/material';
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArticleIcon from "@mui/icons-material/Article";
import PsychologyIcon from '@mui/icons-material/Psychology';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReactTimeAgo from "react-time-ago";
import { Link, useNavigate } from 'react-router-dom';
import SaveJobBookMark from './components/SaveJobBookMark';
import ShareButtons from "../../Component/Shared/ShareButtons";

const JobCard = ({ job, index }) => {
    const navigate = useNavigate();
    const jobExpiry = useMemo(() => {
        const currentDate = new Date();
        return new Date(job?.applicationDeadline) > currentDate;
    }, [job?.applicationDeadline]);

    const handleClick = () => {
        navigate(`/jobs/${job._id}`);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            const card = document.getElementById(`job-card-${index}`);
            if (card) {
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            }
        }, index * 100); // Stagger animation based on index

        return () => clearTimeout(timer);
    }, [index]);

    const url = `${window.location.href}/${job._id}`;

    return (
        <Paper
            id={`job-card-${index}`}
            elevation={3}
            sx={{
                padding: 2,
                borderLeft: "5px solid transparent",
                transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
                opacity: 0,
                transform: 'translateY(20px)',
                '&:hover': {
                    borderColor: jobExpiry || !job?.applicationDeadline ? "green" : "red",
                    cursor: "pointer",
                },
                position: 'relative',
            }}
            onClick={handleClick}
        >
            <Box display="flex" flexDirection="column">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {job.title}
                    </Typography>
                    <Box>
                        <ShareButtons url={url} shareTitle={job?.title} description={job?.description} />
                        <SaveJobBookMark jobId={job._id} />
                    </Box>
                </Box>
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
                        {job.description?.length < 100
                            ? job?.description
                            : `${job?.description?.slice(0, 90)}...`}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mt={1} flexWrap="wrap">
                    <PsychologyIcon sx={{ color: "#00000099" }} aria-label="Skills" />
                    {job?.skills?.slice(0, 5).map((skill, index) => (
                        <Chip key={index} label={skill} size="small" sx={{ marginRight: 0.5 }} />
                    ))}
                </Box>

                <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
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
                            transition: "all 0.3s ease-in-out",
                            '&:hover': {
                                backgroundColor: "primary.dark",
                            },
                        }}
                    >
                        View Job
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default React.memo(JobCard);
