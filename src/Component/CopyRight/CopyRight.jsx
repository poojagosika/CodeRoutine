import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const CopyRight = () => {
    return (
        <footer style={{ backgroundColor: '#393f48', color: 'white', marginTop: 'auto', padding: '16px' }}>
            <Container maxWidth="sm">
                <Typography variant="h6" align="center">
                    CodeRoutine
                </Typography>
                <Typography variant="subtitle1" color="#e0e0e0" align="center" component="p" gutterBottom>
                    Our mission is to help you improve yourself and land your dream job
                </Typography>
                <Typography variant="body2" color="#bdbdbd" align="center" component="p">
                    &copy; {new Date().getFullYear()} CodeRoutine. All rights reserved.
                </Typography>
            </Container>
        </footer>
    );
};

export default CopyRight;
