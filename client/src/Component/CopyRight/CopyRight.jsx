import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const CopyRight = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#393f48',
                color: 'white',
                py: 2,
                width: '100%',
                mt: 'auto',
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="h6" align="center">
                    CodeRoutine
                </Typography>
                <Typography variant="subtitle1" color="#e0e0e0" align="center" gutterBottom>
                    Our mission is to help you improve yourself and land your dream job
                </Typography>
                <Typography variant="body2" color="#bdbdbd" align="center">
                    &copy; {new Date().getFullYear()} CodeRoutine. All rights reserved.
                </Typography>
            </Container>
        </Box >
    );
};

export default CopyRight;
