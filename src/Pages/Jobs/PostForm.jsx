import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import JobsData from "./JobsData";

const PostForm = () => {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Handle form submission (e.g., API call to save job)

    console.log("Job posted:", job);
    JobsData.push(job);
    console.log(JobsData);
    // Reset the form
    setJob({
      title: "",
      company: "",
      location: "",
      description: "",
    });
    // Navigate back to the jobs list
    navigate("/jobs");
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h6">Post a New Job</Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ mt: 2 }}
            onSubmit={(e) => {
              handleSubmit();
            }}
          >
            <TextField
              fullWidth
              margin="normal"
              name="title"
              label="Job Title"
              variant="outlined"
              value={job.title}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="company"
              label="Company"
              variant="outlined"
              value={job.company}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="location"
              label="Location"
              variant="outlined"
              value={job.location}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="description"
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={job.description}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
            >
              Post Job
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PostForm;
