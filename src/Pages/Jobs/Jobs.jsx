import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Paper, TextField, FormGroup, FormControlLabel, Checkbox, Box } from '@mui/material';
import { getAllJobs } from '../../Api/jobAPi';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    employmentTypes: [],
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getAllJobs();
        setJobs(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchJobs();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'employmentTypes') {
      setFilters((prev) => ({
        ...prev,
        employmentTypes: checked
          ? [...prev.employmentTypes, value]
          : prev.employmentTypes.filter((type) => type !== value),
      }));
    } else {
      setFilters({
        ...filters,
        [name]: value,
      });
    }
  };

  const filterJobs = (job) => {
    const { title, location, employmentTypes } = filters;
    return (
      (!title || job.title.toLowerCase().includes(title.toLowerCase())) &&
      (!location || job.location.toLowerCase().includes(location.toLowerCase())) &&
      (employmentTypes.length === 0 || employmentTypes.includes(job.employmentType))
    );
  };

  const filteredJobs = jobs.filter(filterJobs);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Jobs
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Filter Jobs
            </Typography>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                name="title"
                label="Search by Title"
                value={filters.title}
                onChange={handleFilterChange}
                fullWidth
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                name="location"
                label="Location"
                value={filters.location}
                onChange={handleFilterChange}
                fullWidth
              />
            </Box>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="employmentTypes"
                    value="Full-Time"
                    checked={filters.employmentTypes.includes('Full-Time')}
                    onChange={handleFilterChange}
                  />
                }
                label="Full-Time"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="employmentTypes"
                    value="Part-Time"
                    checked={filters.employmentTypes.includes('Part-Time')}
                    onChange={handleFilterChange}
                  />
                }
                label="Part-Time"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="employmentTypes"
                    value="Contract"
                    checked={filters.employmentTypes.includes('Contract')}
                    onChange={handleFilterChange}
                  />
                }
                label="Contract"
              />
            </FormGroup>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={"/jobs/postjobs"}
            sx={{ marginBottom: 2 }}
          >
            Post a New Job
          </Button>
          <Grid container spacing={2}>
            {filteredJobs.map((job) => (
              <Grid item key={job._id} xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography>{job.company}</Typography>
                  <Typography>{job.location}</Typography>
                  <Typography>{job.salary ? `Salary: ${job.salary}` : 'Salary: Not specified'}</Typography>
                  <Typography>{job.employmentType}</Typography>
                  <Button
                    component={Link}
                    to={`/jobs/${job._id}`}
                    variant="contained"
                    color="primary"
                  >
                    View Details
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Jobs;
