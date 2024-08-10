import React, { useEffect } from 'react'
import { ContextStore } from '../../../../../Context/ContextStore';
import { Box, Button, Grid, TextField } from '@mui/material';

const Title = ({ setPage }) => {
    const { resumeInfo, setResumeInfo } = ContextStore();
    useEffect(() => {
        // Initialize resumeInfo if it's undefined or incomplete
        if (!resumeInfo?.profile) {
            setResumeInfo((prev) => ({
                ...prev,
                profile: {
                    firstName: '',
                    lastName: '',
                    ...prev?.profile
                }
            }));
        }
    }, [resumeInfo, setResumeInfo]);
    const handleChange = (e) => {
        const { id, value } = e.target;
        setResumeInfo((prev) => ({
            ...prev,
            profile: {
                ...prev.profile,
                [id]: value,
            }
        }));
    };
    const onSave = () => {
        setPage((prev) => prev + 1)
        console.log(resumeInfo);
    };
    return (
        <Box >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="firstName"
                        label="First Name"
                        variant="outlined"
                        value={resumeInfo?.profile?.firstName}
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
                        value={resumeInfo?.profile?.lastName}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                </Grid>
            </Grid>
            <Box
                display={"flex"}
                justifyContent={"flex-end"}
                alignItems={"center"}
                mt={3}
            >
                <Button variant="contained" color="primary"
                    onClick={() => {
                        onSave()
                    }}
                >
                    Save
                </Button>


            </Box>
        </Box >
    )
}

export default Title