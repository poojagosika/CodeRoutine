import React, { useState } from "react";
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
  TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BarChartIcon from "@mui/icons-material/BarChart";
import CoursesData from "../CoursesData";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter courses based on the search term
  const filteredCourses = CoursesData.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Search Bar at the top-right corner */}
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Grid item>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Courses
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Search Courses"
            variant="outlined"
            size="small"
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: "300px" }}
          />
        </Grid>
      </Grid>

      {/* Course Grid */}
      <Grid container spacing={3}>
        {filteredCourses.map((course, index) => (
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
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ ml: 0.5 }}
                  >
                    {course.instructor}
                  </Typography>
                </Box>

                {/* Duration with Icon */}
                <Box display="flex" alignItems="center" mt={1}>
                  <AccessTimeIcon sx={{ fontSize: "1rem", color: "gray" }} />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ ml: 0.5 }}
                  >
                    {course.duration}
                  </Typography>
                </Box>

                {/* Level with Icon */}
                <Box display="flex" alignItems="center" mt={1}>
                  <BarChartIcon sx={{ fontSize: "1rem", color: "gray" }} />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ ml: 0.5 }}
                  >
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
        ))}
      </Grid>
    </Container>
  );
};

export default Courses;
