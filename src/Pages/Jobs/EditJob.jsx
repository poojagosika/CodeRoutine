import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatDateWithYearMonth } from "../../Config/FormatDate";
import { editJob } from "../../features/jobs/jobActions";
import { selectJobById, selectLoading } from "../../features/jobs/jobSlice";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const job = useSelector((state) => selectJobById(state, id));
  const loading = useSelector(selectLoading);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    skills: [],
    salary: "",
    employmentType: "",
    requirements: [],
    responsibilities: [],
    benefits: [],
    applicationDeadline: "",
    jobLevel: "",
    industry: "",
    numberOfOpenings: "",
    contactEmail: "",
  });

  React.useEffect(() => {
    document.title = "CodeRoutine | Edit Job";
  }, []);

  useEffect(() => {
    if (job) {
      setFormData({
        ...job,
        skills: job.skills.join(", "),
        requirements: job.requirements.join(", "),
        responsibilities: job.responsibilities.join(", "),
        benefits: job.benefits.join(", "),
        applicationDeadline: formatDateWithYearMonth(job.applicationDeadline),
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedJob = {
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      requirements: formData.requirements.split(",").map((req) => req.trim()),
      responsibilities: formData.responsibilities
        .split(",")
        .map((resp) => resp.trim()),
      benefits: formData.benefits.split(",").map((benefit) => benefit.trim()),
    };

    dispatch(editJob({ id, job: updatedJob })).then(() => {
      navigate(`/jobs/${id}`);
    });
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={4} sx={{ padding: 4, marginTop: 5, marginBottom: 5 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Edit Job
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Basic Information</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="title"
                label="Title"
                value={formData.title || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="company"
                label="Company"
                value={formData.company || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                value={formData.description || ""}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Job Details</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="location"
                label="Location"
                value={formData.location || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="salary"
                label="Salary"
                value={formData.salary || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="employmentType"
                label="Employment Type"
                value={formData.employmentType || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="jobLevel"
                label="Job Level"
                value={formData.jobLevel || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="industry"
                label="Industry"
                value={formData.industry || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="numberOfOpenings"
                label="Number of Openings"
                value={formData.numberOfOpenings || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
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
                name="skills"
                label="Skills"
                value={formData.skills || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="requirements"
                label="Requirements"
                value={formData.requirements || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="responsibilities"
                label="Responsibilities"
                value={formData.responsibilities || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Benefits & Contact</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="benefits"
                label="Benefits"
                value={formData.benefits || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="applicationDeadline"
                label="Application Deadline"
                type="date"
                value={formData.applicationDeadline || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="contactEmail"
                label="Contact Email"
                value={formData.contactEmail || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <Box mt={2} display="flex" justifyContent="flex-start">
                <Button type="submit" variant="contained" color="primary">
                  Update Job
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditJob;
