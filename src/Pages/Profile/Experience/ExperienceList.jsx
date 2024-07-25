import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ContextStore } from '../../../Context/ContextStore';
import { toast } from 'react-toastify';
import { deleteExperience } from '../../../Api/Profile/experienceApi';
import { calculateYearsMonths, formatDate, formatDuration } from '../config';

const ExperienceList = ({ experienceList, userId, setExperienceList, handleOpenDialog }) => {
    const { userData } = ContextStore();
    const handleDelete = async (index, experienceId) => {
        console.log(experienceId)
        try {
            const response = await deleteExperience(experienceId);
            if (response.status === 200) {
                setExperienceList((prev) => prev.filter((_, idx) => idx !== index));
                toast.success(response?.data?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete training");
            console.log(error);
        }
    };

    return (
        <Box>
            {experienceList?.map((experience, index) => {
                const duration = calculateYearsMonths(
                    experience?.startDate,
                    experience?.isCurrent ? new Date() : experience?.endDate
                );
                return (
                    <Box
                        key={index}
                        mb={2}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                            borderBottom: "1px solid #E5E5E5",
                        }}
                    >
                        <Box ml={2}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 600,
                                }}
                            >
                                {experience?.company}
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                {experience?.title}{" | "}
                                {experience?.employmentType}
                            </Typography>
                            <Typography variant="body2"
                                sx={{
                                    color: "#6B7280",
                                }}
                            >
                                {formatDate(experience?.startDate)}{" - "}
                                {experience?.isCurrent ? <span>Present</span> : formatDate(experience?.endDate)}.
                                {` ${formatDuration(duration)}`}
                            </Typography>
                            <Box display={"flex"} gap={1} alignItems={"center"}>
                                <Typography
                                    sx={{
                                        color: "#6B7280",
                                    }}
                                    variant="body2"
                                    gutterBottom
                                >
                                    {experience?.location}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "#6B7280",
                                    }}
                                    variant="body2"
                                    gutterBottom
                                >
                                    {experience?.LocationType}
                                </Typography>
                            </Box>
                            <Typography variant="body2">
                                {experience?.description}
                            </Typography>
                            <Box display={"flex"} gap={1} alignItems={"center"}>
                                <Typography
                                    sx={{
                                        color: "#6B7280",
                                    }}
                                    variant="body2"
                                    gutterBottom
                                >
                                    {experience?.skills?.map((skill) => skill).join(", ")}
                                </Typography>
                            </Box>
                        </Box>
                        {userData?._id === userId &&
                            <Box>
                                <IconButton
                                    size="small"
                                    color="success"
                                    onClick={() => handleOpenDialog(index)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleDelete(index, experience?._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        }
                    </Box>
                )
            })}
        </Box>
    );
}

export default ExperienceList;
