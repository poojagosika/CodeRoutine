import React, { useState } from "react";
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
  TablePagination,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BarChartIcon from "@mui/icons-material/BarChart";
import CoursesData from "../CoursesData";

const AllCourses = () => {
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handlers for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page on rows per page change
  };

  // Slicing the courses data based on pagination
  const paginatedCourses = CoursesData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCourses.map((course, index) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination controls */}
        <TablePagination
          component="div"
          count={CoursesData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default AllCourses;
