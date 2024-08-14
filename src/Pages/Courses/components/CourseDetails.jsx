import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Container,
  Paper,
  Box,
} from "@mui/material";
import { getCourseById } from "../../../Api/CoursesApi";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    getCourseById(id)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!course) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {course.title}
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {course.description}
        </Typography>

        <List sx={{ mb: 4 }}>
          {course.topics.map((topic) => (
            <ListItem
              key={topic.topicId}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <ListItemText primary={topic.title} secondary={topic.content} />
            </ListItem>
          ))}
        </List>

        <Box display="flex" justifyContent="center">
          <Button variant="contained" color="primary">
            Start Course
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CourseDetails;
