import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Rating,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BarChartIcon from "@mui/icons-material/BarChart";
import CoursesData from "../CoursesData";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const AllCourses = () => {
  return (
    <Box mt={2} mb={4}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        All Courses
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  Title
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  Instructor
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  Duration
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  Level
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  Rating
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {CoursesData.map((course, index) => (
              <TableRow key={index}>
                {/* Course Title */}
                <TableCell>{course.title}</TableCell>

                {/* Instructor with Icon */}
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <PersonIcon
                      sx={{ fontSize: "1rem", color: "gray", mr: 0.5 }}
                    />
                    {course.instructor}
                  </Box>
                </TableCell>

                {/* Duration with Icon */}
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <AccessTimeIcon
                      sx={{ fontSize: "1rem", color: "gray", mr: 0.5 }}
                    />
                    {course.duration}
                  </Box>
                </TableCell>

                {/* Level with Icon */}
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <BarChartIcon
                      sx={{ fontSize: "1rem", color: "gray", mr: 0.5 }}
                    />
                    {course.level}
                  </Box>
                </TableCell>

                {/* Rating */}
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Rating name="read-only" value={course.rating} readOnly />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      {course.rating}
                    </Typography>
                  </Box>
                </TableCell>
                
                <TableCell>
                  <Box display="flex" flexDirection="row">
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllCourses;
