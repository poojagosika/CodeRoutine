import { Box, Container, Paper } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import FormDialogs from './FormDialogs';
const HomeResume = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Paper
                elevation={3}
                onClick={() => { handleClickOpen() }}
                sx={{
                    p: 4,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    width: 200,
                    height: 200,
                    border: "1px dashed #ccc",
                }}>
                <AddIcon sx={{ fontSize: 60, color: "#ccc" }} />
            </Paper>
            <FormDialogs open={open} setOpen={setOpen} />
        </Container>
    )
}

export default HomeResume

