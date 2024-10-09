import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BarChartIcon from "@mui/icons-material/BarChart";
import SchoolIcon from "@mui/icons-material/School";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const CoursesPage = () => {
  const navigate = useNavigate();

  const courses = [
    {
      title: "JavaScript Essentials",
      instructor: "John Doe",
      duration: "2h 34m",
      level: "Beginner",
      image: "https://via.placeholder.com/150?text=JavaScript",
      rating: 4.5,
    },
    {
      title: "React for Beginners",
      instructor: "Jane Smith",
      duration: "3h 10m",
      level: "Beginner",
      image: "https://via.placeholder.com/150?text=React",
      rating: 4.8,
    },
    {
      title: "Advanced Node.js",
      instructor: "Michael Brown",
      duration: "5h 15m",
      level: "Advanced",
      image: "https://via.placeholder.com/150?text=Node.js",
      rating: 4.7,
    },
    {
      title: "CSS Flexbox & Grid",
      instructor: "Emily White",
      duration: "1hr 45m",
      level: "Intermediate",
      image: "https://via.placeholder.com/150?text=CSS+Flexbox",
      rating: 4.9,
    },
  ];

  const popularCourses = [
    {
      title: "Fullstack Web Development",
      instructor: "Chris Black",
      duration: "6h 20m",
      level: "Advanced",
      image: "https://via.placeholder.com/150?text=Fullstack+Web+Dev",
      rating: 5.0,
    },
    {
      title: "Python Data Science Bootcamp",
      instructor: "Sarah Johnson",
      duration: "4h 50m",
      level: "Intermediate",
      image: "https://via.placeholder.com/150?text=Python+Data+Science",
      rating: 4.8,
    },
    {
      title: "UI/UX Design for Beginners",
      instructor: "Mark Lee",
      duration: "2h 30m",
      level: "Beginner",
      image: "https://via.placeholder.com/150?text=UI+UX+Design",
      rating: 4.6,
    },
    {
      title: "DevOps Crash Course for Intermediate",
      instructor: "Anna Davis",
      duration: "3h 45m",
      level: "Intermediate",
      image: "https://via.placeholder.com/150?text=DevOps",
      rating: 4.7,
    },
  ];

  const renderCourseCard = (course, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: 5,
          },
        }}
      >
        <CardMedia
          component="img"
          height="150"
          image={course.image}
          alt={course.title}
          sx={{
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {course.title}
          </Typography>

          {/* Instructor with Icon */}
          <Box display="flex" alignItems="center" mt={1}>
            <PersonIcon sx={{ fontSize: "1rem", color: "gray" }} />
            <Typography variant="body2" color="textSecondary" sx={{ ml: 0.5 }}>
              {course.instructor}
            </Typography>
          </Box>

          {/* Duration with Icon */}
          <Box display="flex" alignItems="center" mt={1}>
            <AccessTimeIcon sx={{ fontSize: "1rem", color: "gray" }} />
            <Typography variant="body2" color="textSecondary" sx={{ ml: 0.5 }}>
              {course.duration}
            </Typography>
          </Box>

          {/* Level with Icon */}
          <Box display="flex" alignItems="center" mt={1}>
            <BarChartIcon sx={{ fontSize: "1rem", color: "gray" }} />
            <Typography variant="body2" color="textSecondary" sx={{ ml: 0.5 }}>
              {course.level}
            </Typography>
          </Box>

          {/* Rating with Star Icon */}
          <Box display="flex" alignItems="center" mt={1}>
            <Rating
              name="read-only"
              value={course.rating}
              readOnly
              size="small"
            />
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              {course.rating}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <>
      <Box
        sx={{
          backgroundColor: "green",
          color: "white",
          textAlign: "center",
          py: 12,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to CodeRoutine
        </Typography>
        <Typography variant="h6" gutterBottom>
          Unlock your potential with top-tier courses designed for every step of
          your learning journey.
        </Typography>
        <Box mt={4} display="flex" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/courses")}
          >
            Browse Courses
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            onClick={() => navigate("/courses/add")}
          >
            Are you an Instructor?
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: 3,
          borderRadius: 3,
          p: 5,
          mb: 10,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* First Icon and Text */}
            <Grid item xs={12} sm={4}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
              >
                <SchoolIcon sx={{ fontSize: 50, color: "green" }} />
                <Box>
                  <Typography variant="h6">10,000+ Online Courses</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Enjoy different topics at one place
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Second Icon and Text */}
            <Grid item xs={12} sm={4}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
              >
                <VerifiedUserIcon sx={{ fontSize: 50, color: "green" }} />
                <Box>
                  <Typography variant="h6">Expert Instruction</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Find the right instructor for you
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Third Icon and Text */}
            <Grid item xs={12} sm={4}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
              >
                <AccessTimeIcon sx={{ fontSize: 50, color: "green" }} />
                <Box>
                  <Typography variant="h6">Lifetime Access</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Learn from your schedule
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ mt: 4, p: 2, mHeight: "100vh" }}>
        {/* Recommended Section */}
        <Box sx={{ mb: 5 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Recommended for you</Typography>
            <Button onClick={() => navigate("/courses")} color="primary">
              View All
            </Button>
          </Box>
          <Grid container spacing={2} mt={2}>
            {courses.map((course, index) => renderCourseCard(course, index))}
          </Grid>
        </Box>

        {/* Most Popular Section */}
        <Box sx={{ mb: 5 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Most Popular</Typography>
            <Button onClick={() => navigate("/courses")} color="primary">
              View All
            </Button>
          </Box>
          <Grid container spacing={2} mt={2}>
            {popularCourses.map((course, index) =>
              renderCourseCard(course, index)
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default CoursesPage;
