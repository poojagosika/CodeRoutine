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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectJobs } from "../../../../features/jobs/jobSlice";
import { fetchJobs, removeJob } from "../../../../features/jobs/jobActions";
import { useNavigate } from "react-router-dom";

function AllJobs() {
  const dispatch = useDispatch();
  const jobs = useSelector(selectJobs);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeJob(id));
    setOpen(false);
  };

  const DeleteJob = (id) => {
    setOpen(true);
    handleDelete(id);
  };

  return (
    <Box>
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
            {jobs.map((job, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {job.title}
                </TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>₹{job.salary}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.jobLevel}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/job/edit/${job._id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => DeleteJob(job._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
            onClick={handleDelete}
            variant="contained"
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AllJobs;
