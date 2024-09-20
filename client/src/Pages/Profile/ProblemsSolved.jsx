import { Box, Divider, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const ProblemsSolved = ({ userProfile }) => {
    return (
        <Grid item xs={12} pb={2}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>
                Problems Solved
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {["total", "easy", "medium", "hard"].map((difficulty) => (
                    <TextField
                        key={difficulty}
                        id={`${difficulty}-problems`}
                        label={capitalize(difficulty)}
                        value={userProfile?.profile?.problemsSolved?.[difficulty] || 0}
                        variant="outlined"
                        size="small"
                        sx={{ width: 100 }}
                        disabled
                    />
                ))}
            </Box>
        </Grid>
    )
}

export default ProblemsSolved