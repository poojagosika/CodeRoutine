import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
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
    <div>
      <Typography variant="h3">{course.title}</Typography>
      <Typography variant="h6">{course.description}</Typography>

      <List>
        {course.topics.map((topic) => (
          <ListItem key={topic.topicId}>
            <ListItemText primary={topic.title} secondary={topic.content} />
          </ListItem>
        ))}
      </List>

      <Button variant="contained" color="primary">
        Start Course
      </Button>
    </div>
  );
};

export default CourseDetails;
