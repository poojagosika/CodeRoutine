import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import JobsData from "./JobsData";

const JobsDetails = () => {
  const { id } = useParams();
  const job = JobsData.find((job) => job.id === parseInt(id));

  return (
    <Container>
      {job ? (
        <Card sx={{ mt: 4, p: 3 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {job.title}
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              {job.company}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {job.location}
            </Typography>
            <Box mt={2} mb={2}>
              <Typography variant="body1">{job.description}</Typography>
            </Box>
            <Box mt={4} mb={2}>
              <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                Apply Now
              </Button>
              <Button variant="outlined" color="primary">
                Save Job
              </Button>
            </Box>
            <Divider />
            <Box mt={2} mb={2}>
              <Typography variant="h5" gutterBottom>
                About the Job
              </Typography>
              <Typography variant="body1">{job.introduction}</Typography>
            </Box>
            <Divider />
            <Box mt={2} mb={2}>
              <Typography variant="h5" gutterBottom>
                Your Role and Responsibilities
              </Typography>
              <ul>
                {job.responsibilities.map((resp, index) => (
                  <li key={index}>
                    <Typography variant="body1">{resp}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
            <Divider />
            <Box mt={2} mb={2}>
              <Typography variant="h5" gutterBottom>
                Required Technical and Professional Expertise
              </Typography>
              <ul>
                {job.requiredExpertise.map((exp, index) => (
                  <li key={index}>
                    <Typography variant="body1">{exp}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
            <Divider />
            <Box mt={2} mb={2}>
              <Typography variant="h5" gutterBottom>
                Preferred Technical and Professional Expertise
              </Typography>
              <ul>
                {job.preferredExpertise.map((exp, index) => (
                  <li key={index}>
                    <Typography variant="body1">{exp}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
            <Divider />
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" component="p" mt={4}>
          Job not found
        </Typography>
      )}
    </Container>
  );
};

export default JobsDetails;
