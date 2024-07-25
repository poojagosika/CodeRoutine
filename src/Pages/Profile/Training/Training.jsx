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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import TrainingList from "./TrainingList";
import { ContextStore } from "../../../Context/ContextStore";
import { toast } from "react-toastify";
import { addTraining, updateTraining } from "../../../Api/Profile/trainingApi";
import { formatDateWithYearMonth } from "../config.js";

const Training = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [trainingList, setTrainingList] = useState(
    props?.userProfile?.training
  );
  const [currentTraining, setCurrentTraining] = useState({
    courseName: "",
    organization: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    isCurrent: false,
    isOnline: false,
  });
  const [editIndex, setEditIndex] = useState(null);
  const { userData } = ContextStore();

  const handleOpenDialog = (index = null) => {
    if (index !== null) {
      const training = trainingList[index];
      setCurrentTraining({
        ...training,
        startDate: formatDateWithYearMonth(training.startDate),
        endDate: formatDateWithYearMonth(training.endDate),
      });
      setEditIndex(index);
    } else {
      setCurrentTraining({
        courseName: "",
        organization: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        isCurrent: false,
        isOnline: false,
      });
      setEditIndex(null);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentTraining({
      courseName: "",
      organization: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      isCurrent: false,
      isOnline: false,
    });
    setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentTraining((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      const trainingToSave = {
        ...currentTraining,
        startDate: new Date(currentTraining.startDate).toISOString(),
        endDate: currentTraining.endDate
          ? new Date(currentTraining.endDate).toISOString()
          : "",
      };
      if (editIndex !== null) {
        const response = await updateTraining(
          currentTraining?._id,
          trainingToSave
        );
        if (response.status === 200) {
          const updatedTrainingList = trainingList.map((training, idx) =>
            idx === editIndex ? currentTraining : training
          );
          setTrainingList(updatedTrainingList);
          toast.success("Training updated successfully");
        } else {
          toast.error("Failed to update training");
        }
      } else {
        const response = await addTraining(trainingToSave);
        if (response.data) {
          setTrainingList(response?.data?.training);
          toast.success(response.data.message);
        } else {
          toast.error("Failed to add training");
        }
      }
      handleCloseDialog();
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
      currentTraining.organization &&
      currentTraining.startDate &&
      (currentTraining.isCurrent || currentTraining.endDate)
    );
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            fontSize: "1.25rem",
          }}
        >
          Training | Courses
        </Typography>
        {userData?._id === props?.userProfile?._id && (
          <IconButton
            color="primary"
            onClick={() => handleOpenDialog()}
            sx={{ mr: 1 }}
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
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          id="form-dialog-title"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {editIndex !== null
            ? "Edit Training | Course Details"
            : "Add Training | Course Details"}
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              color: "grey.500",
              "&:hover": {
                color: "grey.700",
              },
            }}
            aria-label="close"
            size="small"
            edge="end"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="courseName"
                variant="outlined"
                value={currentTraining.courseName}
                onChange={handleChange}
                fullWidth
                margin="dense"
                label="Training | Course Name"
                required
                autoFocus
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="organization"
                variant="outlined"
                fullWidth
                margin="dense"
                label="Organization"
                required
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                value={currentTraining.organization}
                onChange={handleChange}
              />
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isOnline"
                      checked={currentTraining.isOnline}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "primary checkbox" }}
                      color="primary"
                      size="small"
                    />
                  }
                  label="Online"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="location"
                variant="outlined"
                value={currentTraining.location}
                onChange={handleChange}
                fullWidth
                label="Location"
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="startDate"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={currentTraining.startDate}
                onChange={handleChange}
                fullWidth
                margin="dense"
                required
                autoComplete="off"
                label="Start Date"
                InputProps={{
                  inputProps: {
                    min: "1970-01-01",
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="endDate"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={currentTraining.endDate}
                onChange={handleChange}
                fullWidth
                margin="dense"
                required
                autoComplete="off"
                label="End Date"
                disabled={currentTraining.isCurrent}
              />
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={currentTraining.isCurrent}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "primary checkbox" }}
                      color="primary"
                      size="small"
                      name="isCurrent"
                    />
                  }
                  label="Currently Ongoing"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="Description"
                label="Description"
                variant="outlined"
                name="description"
                multiline
                fullWidth
                minRows={2}
                maxRows={10}
                inputProps={{ maxLength: 220 }}
                value={currentTraining.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSave}
            disabled={!isFormValid()}
            color="primary"
            variant="contained"
            startIcon={editIndex !== null ? <SaveIcon /> : <AddIcon />}
          >
            {editIndex !== null ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Training;
