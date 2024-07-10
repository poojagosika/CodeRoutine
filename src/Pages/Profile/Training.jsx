import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  TextareaAutosize,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const Training = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [trainingList, setTrainingList] = useState([]);
  const [currentTraining, setCurrentTraining] = useState({
    courseName: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [online, setIsOnline] = useState(false);
  // State for checkbox

  const handleOpenDialog = (index = null) => {
    if (index !== null) {
      setCurrentTraining(trainingList[index]);
      setEditIndex(index);
    } else {
      setCurrentTraining({
        courseName: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      setEditIndex(null);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update current training state
    setCurrentTraining((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Additional validation for start and end dates
    if (
      name === "startDate" &&
      new Date(value) >= new Date(currentTraining.endDate)
    ) {
      alert("Start date must be before end date!");
      return;
    }
    if (
      name === "endDate" &&
      new Date(value) <= new Date(currentTraining.startDate)
    ) {
      alert("End date must be after start date!");
      return;
    }
  };

  const handleSave = () => {
    // Update currentTraining with isChecked state
    const updatedTraining = {
      ...currentTraining,
      isCurrent: isChecked,
      isonline: online, // Add isChecked state to currentTraining
    };

    const updatedTrainingList =
      editIndex !== null
        ? trainingList.map((training, idx) =>
            idx === editIndex ? updatedTraining : training
          )
        : [...trainingList, updatedTraining];

    // Sort the training list by start date (latest first)
    const sortedTrainingList = updatedTrainingList.sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );

    setTrainingList(sortedTrainingList);
    setIsDialogOpen(false);
  };

  const handleDelete = (index) => {
    setTrainingList((prev) => prev.filter((_, idx) => idx !== index));
  };

  const isFormValid = () => {
    return (
      currentTraining.courseName &&
      currentTraining.institution &&
      currentTraining.startDate &&
      currentTraining.endDate
    );
  };

  const calculateYearsMonths = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months };
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Training / Courses
      </Typography>

      <Box mt={3}>
        {trainingList.map((training, index) => (
          <Box
            key={index}
            mb={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box ml={2} spacing={2}>
              <Typography variant="h6">{training.courseName}</Typography>
              <Typography>
                {training.institution}
                {training.isonline && <span> - Online - </span>}
              </Typography>
              <Typography>{training.location}</Typography>
              <Typography>
                {training.startDate} - {training.endDate}
                {training.isCurrent && <span> - Present - </span>}(
                {
                  calculateYearsMonths(training.startDate, training.endDate)
                    .years
                }{" "}
                years{" "}
                {
                  calculateYearsMonths(training.startDate, training.endDate)
                    .months
                }{" "}
                months)
              </Typography>
              <Typography>{training.description}</Typography>
            </Box>
            <Box>
              <IconButton
                color="success"
                onClick={() => handleOpenDialog(index)}
              >
                <EditIcon />
              </IconButton>
              <IconButton color="warning" onClick={() => handleDelete(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editIndex !== null
            ? "Edit Training/Course Details "
            : "Add Training/Course Details"}
          <IconButton
            color="secondary"
            onClick={handleCloseDialog}
            style={{ float: "right" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography mb={1}>Training program</Typography>

              <TextField
                name="courseName"
                variant="outlined"
                value={currentTraining.courseName}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography mb={1}>Organization</Typography>

              <TextField
                name="institution"
                variant="outlined"
                value={currentTraining.institution}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="normal"
              />
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={online}
                      onChange={() => setIsOnline(!online)}
                    />
                  }
                  label="Online"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography mb={1}>Location</Typography>

              <TextField
                name="location"
                variant="outlined"
                value={currentTraining.location}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography mb={1}>Start Date</Typography>

              <TextField
                name="startDate"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={currentTraining.startDate}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography mb={1}>End Date</Typography>

              <TextField
                name="endDate"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={currentTraining.endDate}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="normal"
              />
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                    />
                  }
                  label="Currently Ongoing"
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography mb={1}>Description</Typography>
              <TextareaAutosize
                name="description"
                style={{
                  width: "100%",
                  minHeight: 100,
                  padding: 10,
                  fontFamily: "Times New Roman",
                }}
                variant="outlined"
                value={currentTraining.description}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} disabled={!isFormValid()}>
            {editIndex !== null ? "Update" : "Add "}
          </Button>
        </DialogActions>
      </Dialog>

      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          <AddIcon />
          Add Training / Course
        </Button>
      </Box>
    </Box>
  );
};

export default Training;
