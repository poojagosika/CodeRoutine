import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import {
  addEducation,
  updateEducation,
  deleteEducation,
} from "../../../features/profile/profileActions";
import EducationList from "./EducationList";
import { ContextStore } from "../../../Context/ContextStore";
import { formatDateWithYearMonth } from "../config.js";
import { useDispatch } from "react-redux";

const Education = (props) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [educationList, setEducationList] = useState(
    props?.userProfile?.education || []
  );
  const [currentEducation, setCurrentEducation] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    grade: "",
    activities: "",
    cgpa: "",
    isCurrent: false,
  });
  const [editIndex, setEditIndex] = useState(null);
  const { userData } = ContextStore();

  // useEffect(() => {
  //   const sortedList = [...educationList].sort((a, b) => {
  //     return new Date(b.startDate) - new Date(a.startDate);
  //   });
  //   setEducationList(sortedList);
  // }, [educationList]);

  const handleOpenDialog = (index = null) => {
    if (index !== null) {
      const education = educationList[index];
      setCurrentEducation({
        ...education,
        startDate: formatDateWithYearMonth(education.startDate),
        endDate: formatDateWithYearMonth(education.endDate),
      });
      setEditIndex(index);
    } else {
      setCurrentEducation({
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        grade: "",
        activities: "",
        cgpa: "",
        isCurrent: false,
      });
      setEditIndex(null);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentEducation((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    const today = new Date();
    const startDate = new Date(currentEducation.startDate);
    const endDate = currentEducation.endDate
      ? new Date(currentEducation.endDate)
      : today;

    try {
      const educationToSave = {
        ...currentEducation,
        startDate: startDate.toISOString(),
        endDate: currentEducation.endDate ? endDate.toISOString() : "",
      };
      if (editIndex !== null) {
        dispatch(
          updateEducation({
            educationId: currentEducation?._id,
            data: educationToSave,
          })
        );
      } else {
        dispatch(addEducation(educationToSave));
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to process education"
      );
      console.error(error);
    }
  };

  const isFormValid = () => {
    return (
      currentEducation.institution &&
      currentEducation.degree &&
      currentEducation.startDate &&
      (currentEducation.endDate || currentEducation.isCurrent)
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
          Education
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

      <EducationList
        educationList={educationList}
        userId={props?.userProfile?._id}
        setEducationList={setEducationList}
        handleOpenDialog={handleOpenDialog}
      />

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
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
            ? "Edit Education Details"
            : "Add Education Details"}
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
                name="institution"
                variant="outlined"
                value={currentEducation.institution}
                onChange={handleChange}
                fullWidth
                margin="dense"
                label="Institution"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="degree"
                variant="outlined"
                value={currentEducation.degree}
                onChange={handleChange}
                fullWidth
                margin="dense"
                label="Degree"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="fieldOfStudy"
                variant="outlined"
                value={currentEducation.fieldOfStudy}
                onChange={handleChange}
                fullWidth
                margin="dense"
                label="Field of Study"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="startDate"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={currentEducation.startDate}
                onChange={handleChange}
                fullWidth
                margin="dense"
                required
                label="Start Date"
                InputProps={{
                  inputProps: {
                    max: new Date().toISOString().split("T")[0],
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
                value={currentEducation.endDate}
                onChange={handleChange}
                fullWidth
                margin="dense"
                required={!currentEducation?.isCurrent}
                label="End Date"
                disabled={currentEducation?.isCurrent}
                InputProps={{
                  inputProps: {
                    max: new Date().toISOString().split("T")[0],
                    min: currentEducation.startDate,
                  },
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={currentEducation?.isCurrent}
                    onChange={handleChange}
                    color="primary"
                    size="small"
                    name="isCurrent"
                  />
                }
                label="Currently Working here"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="grade"
                variant="outlined"
                value={currentEducation.grade}
                onChange={handleChange}
                fullWidth
                margin="dense"
                label="Grade"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="activities"
                variant="outlined"
                value={currentEducation.activities}
                onChange={handleChange}
                fullWidth
                margin="dense"
                label="Activities"
                multiline
                minRows={2}
                maxRows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="cgpa"
                variant="outlined"
                value={currentEducation.cgpa}
                onChange={handleChange}
                fullWidth
                margin="dense"
                label="CGPA"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} disabled={!isFormValid()}>
            {editIndex !== null ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Education;
