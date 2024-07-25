import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ContextStore } from '../../../Context/ContextStore';
import { deleteTraining } from '../../../Api/Profile/trainingApi';
import { toast } from 'react-toastify';
import { calculateYearsMonths, formatDate, formatDuration } from "../config";

const TrainingList = ({ trainingList, handleOpenDialog, userId, setTrainingList }) => {
    const { userData } = ContextStore();

    const handleDelete = async (index, trainingId) => {
        try {
            const response = await deleteTraining(trainingId);
            if (response.status === 200) {
                setTrainingList((prev) => prev.filter((_, idx) => idx !== index));
                toast.success(response?.data?.message);
            }
        }
        catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to delete training");
            console.log(error);
        }
    };

    return (
        <Box>
            {trainingList?.map((training, index) => {
                const duration = calculateYearsMonths(
                    training?.startDate,
                    training?.isCurrent ? new Date() : training?.endDate
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
                                {training?.courseName}
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                {training?.organization}
                                {training?.isOnline && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                        component="span"
                                    >
                                        <Box
                                            component="span"
                                            sx={{
                                                display: "inline-block",
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                backgroundColor: '#22C55E',
                                                marginRight: '4px',
                                            }}
                                        />
                                        Online
                                    </Box>
                                )}
                            </Typography>
                            <Typography variant="body2"
                                sx={{
                                    color: "#6B7280",
                                }}
                            >
                                {formatDate(training?.startDate)}{" - "}
                                {training?.isCurrent ? <span>Present</span> : formatDate(training?.endDate)}.
                                {` ${formatDuration(duration)}`}
                            </Typography>
                            <Typography
                                sx={{
                                    color: "#6B7280",
                                }}
                                variant="body2"
                                gutterBottom
                            >{training?.location}</Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                            >{training?.description}</Typography>
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
                                    onClick={() => handleDelete(index, training?._id)}>
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

export default TrainingList;
