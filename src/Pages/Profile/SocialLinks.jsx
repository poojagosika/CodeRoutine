import React from 'react'
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material'
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const SocialLinks = ({ userProfile, isEditing }) => {
    return (
        <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h5" gutterBottom>
                    Social Links
                </Typography>
                {isEditing.social ? (
                    <>
                        <IconButton color="primary" onClick={() => handleSaveClick("social")}>
                            <SaveIcon fontSize="small" />
                        </IconButton>
                        <Button color="secondary" onClick={() => handleCancelClick("social")}>
                            Cancel
                        </Button>
                    </>
                ) : (
                    <IconButton color="primary" onClick={() => handleEditClick("social")}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                )}
            </Box>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {["linkedin", "github", "twitter"].map((platform) =>
                    isEditing.social ? (
                        <TextField
                            key={platform}
                            id={platform}
                            label={capitalize(platform)}
                            variant="outlined"
                            value={userProfile?.profile?.socialAddresses?.[platform] || ""}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    ) : (
                        userProfile?.profile?.socialAddresses?.[platform] && (
                            <Link
                                key={platform}
                                href={userProfile?.profile?.socialAddresses?.[platform]}
                                target="_blank"
                                variant="body1"
                                underline="none"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    color: platformColors[platform],
                                }}
                            >
                                {platformIcons[platform]}
                            </Link>
                        )
                    )
                )}
            </Box>
        </Grid>
    )
}

export default SocialLinks