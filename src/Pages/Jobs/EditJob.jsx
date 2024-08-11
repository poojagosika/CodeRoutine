import React, { useState, useEffect } from "react";
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
import { getJobById, updateJob } from "../../Api/jobAPi";
import { toast } from "react-toastify";
import { formatDateWithYearMonth } from "../../Config/FormatDate";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getJobById(id);
        setJob(res.data);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateJob(id, job);
      toast.success(response.data.message);
      navigate(`/jobs`);
    } catch (error) {
      toast.error(error.response.data.message);
    }
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
              <Typography variant="h6">
                Basic Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="title"
                label="Title"
                value={job.title || ""}
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
                value={job.company || ""}
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
                value={job.description || ""}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">
                Job Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="location"
                label="Location"
                value={job.location || ""}
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
                value={job.salary || ""}
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
                value={job.employmentType || ""}
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
                value={job.jobLevel || ""}
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
                value={job.industry || ""}
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
                value={job.numberOfOpenings || ""}
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
                value={job.skills.join(", ") || ""}
                onChange={(e) =>
                  setJob({ ...job, skills: e.target.value.split(", ") })
                }
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="requirements"
                label="Requirements"
                value={job.requirements.join(", ") || ""}
                onChange={(e) =>
                  setJob({ ...job, requirements: e.target.value.split(", ") })
                }
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="responsibilities"
                label="Responsibilities"
                value={job.responsibilities.join(", ") || ""}
                onChange={(e) =>
                  setJob({
                    ...job,
                    responsibilities: e.target.value.split(", "),
                  })
                }
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">
                Benefits & Contact
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="benefits"
                label="Benefits"
                value={job.benefits.join(", ") || ""}
                onChange={(e) =>
                  setJob({ ...job, benefits: e.target.value.split(", ") })
                }
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
                value={formatDateWithYearMonth(job.applicationDeadline) || ""}
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
                value={job.contactEmail || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <Box mt={2} display="flex" justifyContent="flex-start">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
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
