import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import { createJob } from "../../Api/jobAPi";
import { useNavigate } from "react-router-dom";

const employmentTypes = ["Full-Time", "Part-Time", "Contract"];
const jobLevels = ["Entry-Level", "Mid-Level", "Senior-Level"];

const PostNewJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    skills: "",
    salary: "",
    employmentType: "",
    requirements: "",
    responsibilities: "",
    benefits: "",
    postedBy: "",
    applicationDeadline: "",
    jobLevel: "",
    industry: "",
    numberOfOpenings: "",
    applicationInstructions: "",
    contactEmail: "",
  });

  const {
    title,
    company,
    description,
    location,
    skills,
    salary,
    employmentType,
    requirements,
    responsibilities,
    benefits,
    postedBy,
    applicationDeadline,
    jobLevel,
    industry,
    numberOfOpenings,
    applicationInstructions,
    contactEmail,
  } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createJob(formData);
      console.log(response.data);
      // Handle success (e.g., show success message, redirect)
      navigate("/jobs");
    } catch (err) {
      console.error(err.response.data);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={4} sx={{ padding: 4, marginTop: 5, marginBottom: 5 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Post a New Job
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Basic Information</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="title"
                label="Job Title"
                value={title}
                onChange={onChange}
                fullWidth
                variant="outlined"
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={company}
                onChange={onChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={description}
                onChange={onChange}
                multiline
                rows={4}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Job Details</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={location}
                onChange={onChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Salary"
                name="salary"
                value={salary}
                onChange={onChange}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Employment Type"
                name="employmentType"
                value={employmentType}
                onChange={onChange}
                required
                size="small"
              >
                {employmentTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Job Level"
                name="jobLevel"
                value={jobLevel}
                onChange={onChange}
                size="small"
              >
                {jobLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Industry"
                name="industry"
                value={industry}
                onChange={onChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Number of Openings"
                name="numberOfOpenings"
                type="number"
                value={numberOfOpenings}
                onChange={onChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Requirements & Responsibilities
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Skills (comma separated)"
                name="skills"
                value={skills}
                onChange={onChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Requirements (comma separated)"
                name="requirements"
                value={requirements}
                onChange={onChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Responsibilities (comma separated)"
                name="responsibilities"
                value={responsibilities}
                onChange={onChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Benefits & Contact</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Benefits (comma separated)"
                name="benefits"
                value={benefits}
                onChange={onChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Posted By"
                name="postedBy"
                value={postedBy}
                onChange={onChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Application Deadline"
                name="applicationDeadline"
                type="date"
                value={applicationDeadline}
                onChange={onChange}
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Application Instructions"
                name="applicationInstructions"
                value={applicationInstructions}
                onChange={onChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Email"
                name="contactEmail"
                type="email"
                value={contactEmail}
                onChange={onChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Box mt={2} display="flex" justifyContent="flex-start">
                <Button type="submit" variant="contained" color="primary">
                  Post Job
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default PostNewJob;
