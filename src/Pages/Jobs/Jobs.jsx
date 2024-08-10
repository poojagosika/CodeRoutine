import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  CircularProgress,
  TablePagination,
} from "@mui/material";
import { getAllJobs } from "../../Api/jobAPi";
import JobsLoader from "./Loading/JobsLoading";
import SearchIcon from "@mui/icons-material/Search";
import WorkIcon from "@mui/icons-material/Work";
import JobCard from "./JobCard";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    employmentTypes: [],
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getAllJobs();
        setJobs(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "employmentTypes") {
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
      (!location ||
        job.location.toLowerCase().includes(location.toLowerCase())) &&
      (employmentTypes.length === 0 ||
        employmentTypes.includes(job.employmentType))
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

  const currentPageJobs = filteredJobs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );


  if (loading) {
    return (
      <Container maxWidth="md">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      style={{ marginTop: "50px", marginBottom: "50px" }}
    >
      <Grid container spacing={2}>
        {jobs.length === 0 ? (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "70vh" }}
          >
            <Grid item xs={12} sm={12} md={12}>
              <Box
                justifyContent="center"
                alignItems="center"
                textAlign="center"
              >
                <SearchIcon sx={{ color: "#00000099", fontSize: 100 }} />
                <Typography
                  variant="h5"
                  justifyContent="center"
                  textAlign="center"
                  gutterBottom
                >
                  No jobs found 😢
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={"/jobs/postjobs"}
                  sx={{ marginBottom: 2 }}
                >
                  Post a New Job
                </Button>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <React.Fragment>
            <Grid item xs={12} sm={12} md={4}>
              <Box mb={3}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    display={"flex"}
                    alignItems={"center"}
                    gap={1}
                  >
                    <WorkIcon />
                    My Jobs
                  </Typography>
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
                          checked={filters.employmentTypes.includes(
                            "Full-Time"
                          )}
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
                          checked={filters.employmentTypes.includes(
                            "Part-Time"
                          )}
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
              {loading ? (
                <JobsLoader />
              ) : (
                <>
                  <Grid container spacing={2} mb={2}>
                    {currentPageJobs.map((job) => (
                      <Grid item key={job._id} xs={12} sm={12} md={12} gap={2}>
                        <JobCard job={job} />
                      </Grid>
                    ))}
                  </Grid>
                  {jobs.length > 5 && (
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={jobs.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  )}
                </>
              )}
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    </Container>
  );
};

export default Jobs;
