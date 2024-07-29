import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostJobs from "./PostJobs";
import JobsData from "./JobsData";

function Jobs() {
  const navigate = useNavigate();

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <Container
      padding={2}
      style={{ overflow: "auto", marginTop: "50px" }}
      maxWidth="lg"
      component="main"
      id="main-content"
    >
      <PostJobs />
      {JobsData.map((job, index) => (
        <Card key={index} sx={{ borderBottom: "1px solid #E5E5E5" }}>
          <CardContent>
            <Typography variant="h6">{job.title}</Typography>
            <Typography color="textSecondary">{job.company}</Typography>
            <Typography color="textSecondary">{job.location}</Typography>
            <Typography variant="body2">{job.description}</Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleJobClick(index)}
              style={{ marginTop: "10px" }}
            >
              View Job
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Jobs;
