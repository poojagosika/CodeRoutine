import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Error = (props) => {
  const navigate = useNavigate();
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          border: "2px solid #f44336",
          borderRadius: "8px",
          padding: "24px",
          backgroundColor: "#fff",
          boxShadow: 3,
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h5" color="error">
            Oops! Something went wrong.
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {props.error}
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/")}
            >
              Go to Home
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default Error;
