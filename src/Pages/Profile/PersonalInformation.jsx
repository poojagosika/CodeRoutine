import React, { useState } from 'react';
import { Box, Grid, IconButton, TextField, Typography, Button } from '@mui/material';
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const PersonalInformation = ({ profile }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [personalInformation, setPersonalInformation] = useState({
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        email: profile?.email,
        phone: profile?.phone,
        address: profile?.address,
        city: profile?.city,
        state: profile?.state,
        zip: profile?.zip,
    });

    const toggleEditing = () => {
        setIsEditing((prev) => !prev);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setPersonalInformation((prevInfo) => ({
            ...prevInfo,
            [id]: value,
        }));
    };

    const handleSave = () => {
        // Handle save logic here, e.g., dispatching an update action
        console.log('Saving changes:', personalInformation);
        toggleEditing();
    };

    const handleCancel = () => {
        // Reset form or cancel editing
        console.log('Canceling changes');
        setPersonalInformation({
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            phone: profile.phone,
            address: profile.address,
            city: profile.city,
            state: profile.state,
            zip: profile.zip,
        });
        toggleEditing();
    };

    return (
        <>
            <Grid item xs={12}>
                <Box display="flex" alignItems="center" gap={2}>
                    <Typography variant="h5" gutterBottom>
                        Personal Information
                    </Typography>
                    {isEditing ? (
                        <>
                            <IconButton color="primary" onClick={handleSave}>
                                <SaveIcon fontSize="small" />
                            </IconButton>
                            <Button color="secondary" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <IconButton color="primary" onClick={toggleEditing}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    )}
                </Box>
            </Grid>
            {["firstName", "lastName", "email", "phone", "address", "city", "state", "zip"].map((field) => (
                <Grid item xs={12} sm={6} key={field}>
                    <TextField
                        id={field}
                        label={capitalize(field)}
                        variant="outlined"
                        value={personalInformation[field]}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        sx={{ mb: 2 }}
                        disabled={!isEditing}
                    />
                </Grid>
            ))}
        </>
    );
};

export default PersonalInformation;
