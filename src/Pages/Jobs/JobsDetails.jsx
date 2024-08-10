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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { getJobById, deleteJob, applyForJob } from "../../Api/jobAPi";
import { toast } from "react-toastify";
import { ContextStore } from "../../Context/ContextStore";
import ErrorIcon from "@mui/icons-material/Error";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = ContextStore();
  const [open, setOpen] = useState(false);
  const [jobIdToDelete, setJobIdToDelete] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getJobById(id);
        setJob(res?.data?.job);
      } catch (err) {
        toast.error(err?.response?.data?.message);
        setError(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleDelete = (id) => {
    setJobIdToDelete(id);
    setOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteJob(jobIdToDelete);
      if (response.data) {
        toast.success(response.data.message);
        navigate("/jobs");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete job");
    } finally {
      setOpen(false);
    }
  };

  const handleApply = async (id) => {
    try {
      const response = await applyForJob(id);
      if (response.data) {
        toast.success(response?.data?.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to Apply job");
    } finally {
      setOpen(false);
    }
  };

  const handleEdit = () => {
    navigate(`/job/edit/${id}`);
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
        <Typography variant="h4" component="h1" gutterBottom>
          {error}
        </Typography>
      </Container>
    );
  }

  const JobExpiry = (applicationDeadline) => {
    const currentDate = new Date();
    return new Date(applicationDeadline) > currentDate;
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {job?.title}
        </Typography>
        {!JobExpiry(job?.applicationDeadline) || job?.applicationDeadline === null && (
          <Box
            display="flex"
            gap={1}
            style={{ color: "red" }}
            alignItems="center"
          >
            <ErrorIcon style={{ fontSize: 22 }} />
            <Typography variant="body1">
              No longer accepting applications
            </Typography>
          </Box>
        )}
        <Typography variant="h6" gutterBottom>
          {job?.company}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {job?.location}
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1" gutterBottom>
            {job?.description}
          </Typography>
        </Box>
        <Section title="Skills Required">
          {job?.skills?.map((skill, index) => (
            <Chip key={index} label={skill} sx={{ margin: 0.5 }} />
          ))}
        </Section>
        <Section title="Responsibilities">
          <ul>
            {job?.responsibilities?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Section>
        <Section title="Requirements">
          <ul>
            {job?.requirements?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Section>
        <Section title="Benefits">
          <ul>
            {job?.benefits?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Section>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <JobDetail label="Employment Type" value={job?.employmentType} />
            <JobDetail label="Job Level" value={job?.jobLevel} />
            <JobDetail label="Industry" value={job?.industry} />
            <JobDetail label="Salary" value={job?.salary} />
            <JobDetail
              label="Number of Openings"
              value={job?.numberOfOpenings}
            />
          </Grid>
          <Grid item xs={6}>
            <JobDetail
              label="Application Deadline"
              value={new Date(job?.applicationDeadline).toLocaleDateString()}
            />
            <JobDetail label="Posted By" value={job?.postedBy} />
            <JobDetail label="Contact Email" value={job?.contactEmail} />
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 4 }} display="flex" gap={2}>
          <Button variant="contained" color="primary" onClick={() => {handleApply(job?._id)}}>
            Apply Now
          </Button>
          {job?.user?._id === userData?._id && (
            <Button
              variant="contained"
              color="success"
              onClick={() => handleEdit(job._id)}
            >
              Edit
            </Button>
          )}
          {job?.user?._id === userData?._id && (
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(job?._id)}
            >
              Delete
            </Button>
          )}
        </Box>
      </Paper>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">Delete Job</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "#000000" }}
          >
            Do you really want to delete this job listing? Once deleted, it
            cannot be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
