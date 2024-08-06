import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Paper,
  Typography,
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
          Loading...
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Job
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Title"
            value={job.title || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="company"
            label="Company"
            value={job.company || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            value={job.description || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            name="location"
            label="Location"
            value={job.location || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="skills"
            label="Skills"
            value={job.skills.join(", ") || ""}
            onChange={(e) =>
              setJob({ ...job, skills: e.target.value.split(", ") })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            name="salary"
            label="Salary"
            value={job.salary || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="employmentType"
            label="Employment Type"
            value={job.employmentType || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="requirements"
            label="Requirements"
            value={job.requirements.join(", ") || ""}
            onChange={(e) =>
              setJob({ ...job, requirements: e.target.value.split(", ") })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            name="responsibilities"
            label="Responsibilities"
            value={job.responsibilities.join(", ") || ""}
            onChange={(e) =>
              setJob({ ...job, responsibilities: e.target.value.split(", ") })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            name="benefits"
            label="Benefits"
            value={job.benefits.join(", ") || ""}
            onChange={(e) =>
              setJob({ ...job, benefits: e.target.value.split(", ") })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            name="applicationDeadline"
            label="Application Deadline"
            type="date"
            value={formatDateWithYearMonth(job.applicationDeadline) || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="jobLevel"
            label="Job Level"
            value={job.jobLevel || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="industry"
            label="Industry"
            value={job.industry || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="numberOfOpenings"
            label="Number of Openings"
            value={job.numberOfOpenings || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="contactEmail"
            label="Contact Email"
            value={job.contactEmail || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Update Job
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default EditJob;
