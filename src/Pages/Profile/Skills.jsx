import React from 'react'
import { Box, Chip, Divider, Grid, IconButton, Typography } from '@mui/material'
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const Skills = ({ userProfile, isEditing, }) => {
    return (
        <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h5" gutterBottom>
                    Skills
                </Typography>
                {isEditing.skills ? (
                    <>
                        <IconButton color="primary" onClick={() => handleSaveClick("skills")}>
                            <SaveIcon fontSize="small" />
                        </IconButton>
                        <Button color="secondary" onClick={() => handleCancelClick("skills")}>
                            Cancel
                        </Button>
                    </>
                ) : (
                    <IconButton color="primary" onClick={() => handleEditClick("skills")}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                )}
            </Box>
            {["advanced", "intermediate", "fundamental"].map((level) => (
                <Box key={level} sx={{
                    display: "flex",
                    gap: 2, flexWrap: "wrap"
                }}>
                    <Typography variant="body1" sx={{ flexBasis: "100%" }}>
                        {capitalize(level)}:
                    </Typography>
                    {isEditing?.skills
                        ? userProfile?.profile?.skills?.[level]?.map((skill, index) => (
                            <TextField
                                key={index}
                                value={skill}
                                onChange={(e) => handleSkillChange(e, level, index)}
                                size="small"
                                sx={{ mb: 1 }}
                            />
                        ))
                        : userProfile?.profile?.skills?.[level]?.map((skill, index) => (
                            <Chip key={index} label={skill} sx={{ mb: 1 }} />
                        ))}
                </Box>
            ))}
        </Grid>
    )
}

export default Skills