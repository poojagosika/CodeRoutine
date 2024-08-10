import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArticleIcon from "@mui/icons-material/Article";
import ReactTimeAgo from "react-time-ago";
import { Link, useNavigate } from 'react-router-dom';
const JobCard = ({ job }) => {
    const navigate = useNavigate();

    const JobExpiry = (applicationDeadline) => {
        const currentDate = new Date();
        return new Date(applicationDeadline) > currentDate;
    };
    return (
        <Paper
            elevation={3}
            sx={{
                padding: 2,
                borderLeft: "5px solid transparent",
                transition:
                    "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
                "&:hover": {
                    borderColor:
                        JobExpiry(job?.applicationDeadline) ||
                            job?.applicationDeadline === null
                            ? "green"
                            : "red",
                    cursor: "pointer",
                },
            }}
            onClick={() => navigate(`/jobs/${job._id}`)}
        >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {job.title}
            </Typography>
            <Typography
                color="textSecondary"
                sx={{ fontWeight: 600 }}
            >
                {job.company}
            </Typography>
            <Box
                display="flex"
                spacing={2}
                gap={4}
                color="textSecondary"
                mt={1}
                mb={1}
                alignItems="center"
            >
                <Box display="flex">
                    <WorkOutlineIcon sx={{ color: "#00000099" }} />
                    <Typography>{job.jobLevel}</Typography>
                </Box>
                <Box display="flex">
                    <CurrencyRupeeIcon sx={{ color: "#00000099" }} />
                    <Typography>
                        {job.salary ? `${job.salary}` : "Not specified"}
                    </Typography>
                </Box>
                <Box display="flex">
                    <LocationOnIcon sx={{ color: "#00000099" }} />
                    <Typography>{job.location}</Typography>
                </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={1} mb={1}>
                <ArticleIcon sx={{ color: "#00000099" }} />
                <Typography variant="body1">
                    {job.responsibilities.join(" ").length < 100
                        ? job.responsibilities.join(" ")
                        : `${job.responsibilities
                            .join(" ")
                            .slice(0, 90)}....`}
                </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="body2" color="textSecondary">
                    {job.skills.join(" ").length < 100
                        ? job.skills.join(" ")
                        : `${job.skills.join(" ").slice(0, 90)}....`}
                </Typography>
            </Box>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Typography variant="body2" color="textSecondary">
                    <ReactTimeAgo
                        date={new Date(job?.postedOn).getTime()}
                        locale="en-US"
                    />
                </Typography>

                <Button
                    component={Link}
                    to={`/jobs/${job._id}`}
                    variant="outlined"
                    color="primary"
                    size="small"
                >
                    View Details
                </Button>
            </Box>
        </Paper>
    )
}

export default JobCard