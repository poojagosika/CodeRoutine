import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { personalInformationUpdate } from "../../../features/profile/profileActions";

const PersonalInfoDialog = ({
    toggleEditing,
    isEditing,
    tempPersonalInfo,
    setTempPersonalInfo,
    education,
    experience
}) => {
    const handleChange = (e) => {
        const { id, value } = e.target;
        setTempPersonalInfo((prev) => ({ ...prev, [id]: value }));
    };

    const handleGenderChange = (gender) => {
        setTempPersonalInfo((prev) => ({ ...prev, gender }));
    };

    const dispatch = useDispatch();


    const handleSave = () => {
        dispatch(personalInformationUpdate(tempPersonalInfo));
        toggleEditing();
    };

    const handleCancel = () => {
        toggleEditing();
    };
    const isSaveDisabled = Object.values(tempPersonalInfo).some(
        (value) => value === ""
    );

    return (
        <Dialog open={isEditing} onClose={handleCancel} fullWidth maxWidth="sm">
            <DialogTitle id="alert-dialog-title">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5">Personal Information</Typography>
                    <IconButton onClick={handleCancel}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="firstName"
                            label="First Name"
                            variant="outlined"
                            value={tempPersonalInfo?.firstName}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="lastName"
                            label="Last Name"
                            variant="outlined"
                            value={tempPersonalInfo?.lastName}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography gutterBottom>Gender</Typography>
                        <Box display="flex" gap={2}>
                            {["👦🏻 Male", "👧🏻 Female", "💫 Other"].map((gender) => (
                                <Button
                                    key={gender}
                                    variant={
                                        tempPersonalInfo.gender === gender
                                            ? "contained"
                                            : "outlined"
                                    }
                                    onClick={() => handleGenderChange(gender)}
                                >
                                    {gender}
                                </Button>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="headline"
                            label="Headline (max 220 characters)"
                            variant="outlined"
                            multiline
                            fullWidth
                            minRows={2}
                            maxRows={10}
                            inputProps={{ maxLength: 220 }}
                            value={tempPersonalInfo.headline}
                            onChange={handleChange}
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            id="currentPosition"
                            select
                            label="Current Position"
                            variant="outlined"
                            value={tempPersonalInfo.currentPosition}
                            onChange={(e) =>
                                handleChange({
                                    target: { id: "currentPosition", value: e.target.value },
                                })
                            }
                            fullWidth
                            margin="dense"
                        >
                            {experience?.map((experience) => (
                                <MenuItem key={experience?._id} value={experience?.title + " at " + experience?.company}>
                                    {experience?.title + " at " + experience?.company}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            id="education"
                            select
                            label="Education"
                            variant="outlined"
                            value={tempPersonalInfo?.education}
                            onChange={(e) =>
                                handleChange({
                                    target: { id: "education", value: e.target.value },
                                })
                            }
                            fullWidth
                            margin="dense"
                        >
                            {education?.map((education) => (
                                <MenuItem key={education?._id} value={education?.institution}>
                                    {education?.institution}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="city"
                            label="City"
                            variant="outlined"
                            value={tempPersonalInfo?.city}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="country"
                            label="Country/Region"
                            variant="outlined"
                            value={tempPersonalInfo?.country}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSave}
                    disabled={isSaveDisabled}
                    startIcon={<SendIcon />}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PersonalInfoDialog;
