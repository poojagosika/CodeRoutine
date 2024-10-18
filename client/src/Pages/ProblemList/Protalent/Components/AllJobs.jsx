import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { JobsData } from "./JobsData";

function AllJobs() {
  // Handle Edit action (for now just a console log)
  const handleEdit = (index) => {
    console.log(`Edit job at index: ${index}`);
  };

  // Handle Delete action (for now just a console log)
  const handleDelete = (index) => {
    console.log(`Delete job at index: ${index}`);
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "lightgray",
          padding: 2,
          marginBottom: 2,
        }}
      >
        <Typography variant="body1" sx={{ color: "blue" }}>
          All Jobs
        </Typography>

        <Table sx={{ minWidth: 650 }} aria-label="job table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Job Title
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Company Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Salary
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Location
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Level
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {JobsData.map((job, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {job.jobTitle}
                </TableCell>
                <TableCell>{job.companyName}</TableCell>
                <TableCell>{job.salary}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.level}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AllJobs;
