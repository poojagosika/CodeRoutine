import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Tabs,
  Tab,
  TablePagination,
} from "@mui/material";
import {
  selectJobs,
  selectLoading,
  selectError,
  setFilters,
  setSelectedTab,
  selectFilters,
  selectSelectedTab,
} from "../../features/jobs/jobSlice";
import JobsLoader from "./Loading/JobsLoading";
import JobCard from "./JobCard";
import { Link } from "react-router-dom";
import { fetchJobs } from "../../features/jobs/jobActions";

const Jobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector(selectJobs);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filters = useSelector(selectFilters);
  const selectedTab = useSelector(selectSelectedTab);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch, selectedTab]);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    let newFilters = { ...filters };

    if (name === "employmentTypes") {
      newFilters = {
        ...newFilters,
        employmentTypes: checked
          ? [...newFilters.employmentTypes, value]
          : newFilters.employmentTypes.filter((type) => type !== value),
      };
    } else {
      newFilters = {
        ...newFilters,
        [name]: value,
      };
    }

    dispatch(setFilters(newFilters));
  };

  const handleTabChange = (event, newValue) => {
    dispatch(setSelectedTab(newValue));
  };

  const filterJobs = (job) => {
    const { title, location, employmentTypes } = filters;

    const isSaved = job.saved;
    const isApplied = job.applied;

    const isTabMatch =
      selectedTab === 0 || // All Jobs
      (selectedTab === 1 && isSaved) || // Saved Jobs
      (selectedTab === 2 && isApplied); // Applied Jobs

    return (
      isTabMatch &&
      (!title || job.title.toLowerCase().includes(title.toLowerCase())) &&
      (!location || job.location.toLowerCase().includes(location.toLowerCase())) &&
      (employmentTypes.length === 0 || employmentTypes.includes(job.employmentType))
    );
  };

  const filteredJobs = jobs.filter(filterJobs);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Container maxWidth="md" style={{ marginTop: "50px", marginBottom: "50px" }}>
        <JobsLoader />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" style={{ marginTop: "50px", marginBottom: "50px" }}>
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: "50px", marginBottom: "50px", minHeight:"100vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4}>
          <Box mb={3}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Filter Jobs
              </Typography>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  name="title"
                  label="Search by Title"
                  value={filters.title}
                  size="small"
                  onChange={handleFilterChange}
                  fullWidth
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  name="location"
                  label="Location"
                  size="small"
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
                      checked={filters.employmentTypes.includes("Full-Time")}
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
                      checked={filters.employmentTypes.includes("Part-Time")}
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
                      checked={filters.employmentTypes.includes("Contract")}
                      onChange={handleFilterChange}
                    />
                  }
                  label="Contract"
                />
              </FormGroup>
            </Paper>
          </Box>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={"/jobs/postjobs"}
            sx={{ marginBottom: 2 }}
          >
            Post a New Job
          </Button>
        </Grid>
        <Grid item xs={12} md={8}>
          <Tabs value={selectedTab} style={{ paddingBottom: '16px' }} onChange={handleTabChange} aria-label="job categories">
            <Tab label="All Jobs" />
            <Tab label="Saved Jobs" />
            <Tab label="Applied Jobs" />
          </Tabs>

          <Grid container spacing={2} mb={2}>
            {filteredJobs.length === 0 && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                width="100%"
              >
                <Typography variant="h6" gutterBottom>
                  No Jobs Found!
                </Typography>
              </Box>
            )}
            {filteredJobs.map((job, index) => (
              <Grid item key={index} xs={12} sm={12} md={12} gap={2}>
                <JobCard job={job} index={index} />
              </Grid>
            ))}
          </Grid>
          {filteredJobs.length >= 10 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredJobs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Jobs;
