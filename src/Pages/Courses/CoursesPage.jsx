import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import CourseList from "./components/CourseList";
import { useNavigate } from "react-router-dom";

const CoursesPage = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 4, p: 2, minHeight:"100vh"}}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" gutterBottom>
          All Courses
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/courses/add")}
        >
          Add Course
        </Button>
      </Box>
      <CourseList />
    </Container>
  );
};

export default CoursesPage;
