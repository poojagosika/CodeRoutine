import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Box, Chip, Grid, Button } from '@mui/material';
import axios from 'axios';
import { getJobById } from '../../Api/jobAPi';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getJobById(id);
        setJob(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          Loading Job Details...
        </Typography>
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
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" gutterBottom>
            Skills Required
          </Typography>
          {job.skills.map((skill, index) => (
            <Chip key={index} label={skill} sx={{ margin: 0.5 }} />
          ))}
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" gutterBottom>
            Responsibilities
          </Typography>
          <ul>
            {job.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" gutterBottom>
            Requirements
          </Typography>
          <ul>
            {job.requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" gutterBottom>
            Benefits
          </Typography>
          <ul>
            {job.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom>
              <strong>Employment Type:</strong> {job.employmentType}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Job Level:</strong> {job.jobLevel}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Industry:</strong> {job.industry}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Salary:</strong> {job.salary}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Number of Openings:</strong> {job.numberOfOpenings}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom>
              <strong>Application Deadline:</strong> {new Date(job.applicationDeadline).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Posted By:</strong> {job.postedBy}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Contact Email:</strong> {job.contactEmail}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 4 }}>
          <Button variant="contained" color="primary" onClick={() => alert('Apply Now functionality not implemented')}>
            Apply Now
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default JobDetails;
