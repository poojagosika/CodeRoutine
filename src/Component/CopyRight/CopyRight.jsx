import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const CopyRight = () => {
    return (
        <footer style={{ backgroundColor: '#393f48', color: 'white', marginTop: 'auto', padding: '16px' }}>
            <Container maxWidth="sm">
                <Typography variant="h6" align="center" gutterBottom>
                    CodeRoutine
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" component="p">
                    &copy; {new Date().getFullYear()} CodeRoutine. All rights reserved.
                </Typography>
            </Container>
        </footer>
    );
};

export default CopyRight;
