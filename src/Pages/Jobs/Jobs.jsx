import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Container,
} from "@mui/material";
import PostJobs from "./PostJobs";

const jobsData = [
  {
    id: 1,
    title: "Software Engineer",
    company: "ABC Corp",
    location: "San Francisco, CA",
    description:
      "Develop and maintain web applications using React and Node.js.",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "XYZ Inc",
    location: "New York, NY",
    description: "Lead product development and manage cross-functional teams.",
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "Data Solutions",
    location: "Boston, MA",
    description:
      "Analyze data and build predictive models to support business decisions.",
  },
];

function Jobs() {
  const handleJobClick = (jobId) => {
    console.log(`Job clicked: ${jobId}`);
  };

  return (
    <Container
      direction="column"
      spacing={2}
      padding={2}
      style={{ overflow: "auto", marginTop: "50px" }}
      component="main"
      id="main-content"
    >
      <PostJobs />
      {jobsData.map((job) => (
        <Grid item key={job.id}>
          <Card
            sx={{
              borderBottom: "1px solid #E5E5E5",
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                {job.title}
              </Typography>
              <Typography color="textSecondary">{job.company}</Typography>
              <Typography color="textSecondary">{job.location}</Typography>
              <Typography variant="body2" component="p">
                {job.description}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleJobClick(job.id)}
                style={{ marginTop: "10px" }}
              >
                View Job
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Container>
  );
}

export default Jobs;
