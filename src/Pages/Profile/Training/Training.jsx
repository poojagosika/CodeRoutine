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
import CloseIcon from "@mui/icons-material/Close";
import TrainingList from "./TrainingList";
import { ContextStore } from "../../../Context/ContextStore";
import { toast } from "react-toastify";
import { addTraining, updateTraining } from "../../../Api/Profile/trainingApi";

const Training = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [trainingList, setTrainingList] = useState(props?.userProfile?.training);
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
  const { userData } = ContextStore();

  const handleOpenDialog = (index = null) => {

    if (index !== null) {
      const training = trainingList[index];
      setCurrentTraining(training);
      setIsChecked(training.isCurrent || false);
      setIsOnline(training.isOnline || false);
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
      setIsChecked(false);
      setIsOnline(false);
      setEditIndex(null);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      (name === "startDate" && new Date(value) >= new Date(currentTraining.endDate)) ||
      (name === "endDate" && new Date(value) <= new Date(currentTraining.startDate))
    ) {
      alert("Start date must be before end date!");
      return;
    }
    setCurrentTraining((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const updatedTraining = {
      ...currentTraining,
      isCurrent: isChecked,
      isOnline: online,
    };
    let updatedTrainingList;
    if (editIndex !== null) {
      updatedTrainingList = trainingList.map((training, idx) =>
        idx === editIndex ? updatedTraining : training
      );
    } else {
      updatedTrainingList = [...trainingList, updatedTraining];
    }

    const sortedTrainingList = updatedTrainingList.sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );

    try {
      if (editIndex !== null) {
        const response = await updateTraining(currentTraining._id, updatedTraining);
        if (response.status === 200) {
          toast.success("Training updated successfully");
        } else {
          toast.error("Failed to update training");
        }
      } else {
        const response = await addTraining(updatedTraining);
        if (response.data) {
          toast.success(response.data.message);
        } else {
          toast.error("Failed to add training");
        }
      }
      setTrainingList(sortedTrainingList);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to process training"
      );
      console.log(error);
    }
  };

  const isFormValid = () => {
    return (
      currentTraining.courseName &&
      currentTraining.institution &&
      currentTraining.startDate &&
      currentTraining.endDate
    );
  };

  return (
    <Box p={2}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            fontSize: "1.25rem",
            letterSpacing: "0.025em",
            mb: 2,
          }}
          gutterBottom
        >
          Training / Courses
        </Typography>
        {userData?._id === props?.userProfile?._id && (
          <IconButton
            color="primary"
            onClick={() => handleOpenDialog()}
            sx={{
              mr: 1,
            }}
          >
            <AddIcon />
          </IconButton>
        )}
      </Box>
      <TrainingList
        trainingList={trainingList}
        userId={props?.userProfile?._id}
        setTrainingList={setTrainingList}
        handleOpenDialog={handleOpenDialog}
      />
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editIndex !== null
            ? "Edit Training/Course Details"
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
              <Typography mb={1}>Training Program</Typography>
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
    </Box>
  );
};

export default Training;
