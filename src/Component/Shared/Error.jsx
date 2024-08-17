import { Container, Typography } from '@mui/material';
import React from 'react'

const Error = ({ error }) => {
    return (
        <Container
            maxWidth="md"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Typography variant="h6" color="error" gutterBottom
                style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "24px",
                    marginBottom: "50px",
                }}
            >
                {error}
            </Typography>
        </Container>
    );
}

export default Error