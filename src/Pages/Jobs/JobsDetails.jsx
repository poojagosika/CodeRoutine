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
  Divider,
} from "@mui/material";
import { getJobById, deleteJob, applyForJob } from "../../Api/jobAPi";
import { toast } from "react-toastify";
import { ContextStore } from "../../Context/ContextStore";
import ErrorIcon from "@mui/icons-material/Error";
import { motion } from "framer-motion"; // Add framer-motion for animations

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
        setJob(res?.data);
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
  };

  return (
    <Container maxWidth="md" sx={{ marginBottom: 6, padding: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            marginTop: 4,
            borderRadius: 3,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 100%)",
              opacity: 0.7,
              zIndex: -1,
            },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            {job?.title}
          </Typography>
          {(!JobExpiry(job?.applicationDeadline) ||
            job?.applicationDeadline === null) && (
              <Box display="flex" gap={1} color="error.main" alignItems="center">
                <ErrorIcon sx={{ fontSize: 22 }} />
                <Typography variant="body1">
                  No longer accepting applications
                </Typography>
              </Box>
            )}
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "primary.dark", fontWeight: "medium" }}
          >
            {job?.company}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {job?.location}
          </Typography>
          <Divider sx={{ my: 2, backgroundColor: "primary.light" }} />
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="body1" gutterBottom>
              {job?.description}
            </Typography>
          </Box>
          <Section title="Skills Required">
            {job?.skills?.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                sx={{
                  margin: 0.5,
                  backgroundColor: "primary.light",
                  color: "primary.contrastText",
                }}
              />
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
              {job?.employmentType && (
                <JobDetail label="Employment Type" value={job?.employmentType} />
              )}
              {job?.jobLevel && (
                <JobDetail label="Job Level" value={job?.jobLevel} />
              )}
              {job?.industry && (
                <JobDetail label="Industry" value={job?.industry} />
              )}
              {job?.salary && (
                <JobDetail label="Salary" value={job?.salary} />
              )}
              {job?.numberOfOpenings && (
                <JobDetail
                  label="Number of Openings"
                  value={job.numberOfOpenings}
                />
              )}
            </Grid>
            <Grid item xs={6}>
              <JobDetail
                label="Application Deadline"
                value={new Date(job?.applicationDeadline).toLocaleDateString()}
              />
              <JobDetail label="Posted By" value={job?.postedBy} />
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 4 }} display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              disabled={job?.applied}
              onClick={() => {
                handleApply(job?._id);
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              {job?.applied ? "Applied" : "Apply Now"}
            </Button>
            {job?.createdBy === userData?._id && (
              <>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleEdit(job._id)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "success.dark",
                    },
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(job?._id)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "error.dark",
                    },
                  }}
                >
                  Delete
                </Button>
              </>
            )}
          </Box>
        </Paper>
      </motion.div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
          Delete Job
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
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
  <Box sx={{ marginBottom: 3 }}>
    <Typography
      variant="h6"
      gutterBottom
      sx={{ fontWeight: "medium", color: "primary.main" }}
    >
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
