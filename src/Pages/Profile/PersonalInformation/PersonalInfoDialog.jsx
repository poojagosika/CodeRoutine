import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from "@mui/icons-material/Close";
import { toast } from 'react-toastify';
import { personalInformationUpdate } from "../../../Api/Profile/personalInformationApi.js";

const PersonalInfoDialog = ({ toggleEditing, isEditing, tempPersonalInfo, setTempPersonalInfo, setPersonalInfo }) => {
    const handleChange = (e) => {
        const { id, value } = e.target;
        setTempPersonalInfo((prev) => ({ ...prev, [id]: value }));
    };

    const handleGenderChange = (gender) => {
        setTempPersonalInfo((prev) => ({ ...prev, gender }));
    };

    const handleSave = async () => {
        try {
            const response = await personalInformationUpdate(tempPersonalInfo);
            if (response?.data) {
                setPersonalInfo(tempPersonalInfo);
                toast.success("Personal information updated successfully");
                toggleEditing();
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error("Error updating personal information:", error);
        }
    };

    const handleCancel = () => {
        toggleEditing();
    };
    const isSaveDisabled = Object.values(tempPersonalInfo).some(value => value === "");

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
                                    variant={tempPersonalInfo.gender === gender ? "contained" : "outlined"}
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
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="currentPosition"
                            label="Current Position"
                            variant="outlined"
                            value={tempPersonalInfo.currentPosition}
                            onChange={handleChange}
                            fullWidth
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="education"
                            select
                            label="Education"
                            variant="outlined"
                            value={tempPersonalInfo?.education}
                            onChange={(e) => handleChange({ target: { id: 'education', value: e.target.value } })}
                            fullWidth
                            margin="dense"
                        >
                            {["UG", "12th", "10th"].map((education) => (
                                <MenuItem key={education} value={education}>
                                    {education}
                                </MenuItem>
                            ))}
                        </TextField>
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
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleSave} disabled={isSaveDisabled}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PersonalInfoDialog;
