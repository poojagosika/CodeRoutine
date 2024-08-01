import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Box,
  Chip,
  Grid,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { getJobById, deleteJob } from "../../Api/jobAPi";
import { toast } from "react-toastify";
import { ContextStore } from "../../Context/ContextStore";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userData } = ContextStore();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getJobById(id);
        setJob(res.data);
      } catch (err) {
        setError("Failed to load job details");
        toast.error("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteJob(id);
      if (response.data) {
        toast.success(response.data.message);
        navigate("/jobs");
      }
    } catch (err) {
      toast.error(err.response.data.message);
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

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!job) {
    return (
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          Job Not Found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {job.title}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {job.company}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {job.location}
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1" gutterBottom>
            {job.description}
          </Typography>
        </Box>
        <Section title="Skills Required">
          {job.skills.map((skill, index) => (
            <Chip key={index} label={skill} sx={{ margin: 0.5 }} />
          ))}
        </Section>
        <Section title="Responsibilities">
          <ul>
            {job.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Section>
        <Section title="Requirements">
          <ul>
            {job.requirements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Section>
        <Section title="Benefits">
          <ul>
            {job.benefits.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Section>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <JobDetail label="Employment Type" value={job.employmentType} />
            <JobDetail label="Job Level" value={job.jobLevel} />
            <JobDetail label="Industry" value={job.industry} />
            <JobDetail label="Salary" value={job.salary} />
            <JobDetail
              label="Number of Openings"
              value={job.numberOfOpenings}
            />
          </Grid>
          <Grid item xs={6}>
            <JobDetail
              label="Application Deadline"
              value={new Date(job.applicationDeadline).toLocaleDateString()}
            />
            <JobDetail label="Posted By" value={job.postedBy} />
            <JobDetail label="Contact Email" value={job.contactEmail} />
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 4 }} display="flex" gap={2}>
          <Button variant="contained" color="primary" onClick={() => {}}>
            Apply Now
          </Button>

          {job.user._id === userData._id && (
            <Button variant="contained" color="secondary" onClick={() => {}}>
              Edit
            </Button>
          )}
          {job.user._id === userData._id && (
            <Button
              variant="contained"
              color="warning"
              onClick={() => handleDelete(job._id)}
            >
              Delete
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

const Section = ({ title, children }) => (
  <Box sx={{ marginBottom: 2 }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    {children}
  </Box>
);

const JobDetail = ({ label, value }) => (
  <Typography variant="body1" gutterBottom>
    <strong>{label}:</strong> {value}
  </Typography>
);

export default JobDetails;
