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
  TextareaAutosize,
  TextField,
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
} from "../../../Api/Profile/educationApi";

const Education = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [educationList, setEducationList] = useState(props?.education);
  const [currentEducation, setCurrentEducation] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    grade: "",
    activities: "",
    cgpa: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const sortedList = [...educationList].sort((a, b) => {
      return new Date(b.startDate) - new Date(a.startDate);
    });
    setEducationList(sortedList);
  }, [educationList]);

  const handleOpenDialog = (index = null) => {
    if (index !== null) {
      setCurrentEducation(educationList[index]);
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

    if (
      name === "startDate" &&
      new Date(value) >= new Date(currentEducation.endDate)
    ) {
      alert("Start date must be before end date!");
      return;
    }
    if (
      name === "endDate" &&
      new Date(value) <= new Date(currentEducation.startDate)
    ) {
      alert("End date must be after start date!");
      return;
    }

    setCurrentEducation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (editIndex !== null) {
        const response = await updateEducation(
          educationList[editIndex]._id,
          currentEducation
        );
        if (response.status === 200) {
          toast.success("Education updated successfully");
          setEducationList((prev) =>
            prev.map((edu, idx) => (idx === editIndex ? currentEducation : edu))
          );
        } else {
          toast.error("Failed to update education");
        }
      } else {
        const response = await addEducation(currentEducation);
        if (response.data) {
          toast.success(response.data.message);
          setEducationList((prev) => [...prev, currentEducation]);
        } else {
          toast.error("Failed to add education");
        }
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to process education"
      );
      console.error(error);
    }
  };

  const handleDelete = async (index, educationId) => {
    try {
      const response = await deleteEducation(educationId);
      if (response.status === 200) {
        setEducationList((prev) => prev.filter((_, idx) => idx !== index));
        toast.success("Education deleted successfully");
      } else {
        toast.error("Failed to delete education");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete education"
      );
      console.error(error);
    }
  };

  const isFormValid = () => {
    return (
      currentEducation.institution &&
      currentEducation.degree &&
      currentEducation.startDate &&
      currentEducation.endDate
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
            letterSpacing: "0.025em",
            m: 2,
          }}
          gutterBottom
        >
          Education
        </Typography>

        <IconButton
          color="primary"
          onClick={() => handleOpenDialog()}
          sx={{
            mr: 3,
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Box mt={3}>
        {educationList?.map((education, index) => (
          <Box
            key={index}
            mb={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box ml={2} spacing={2}>
              <Typography variant="h6">{education.institution}</Typography>
              <Typography>
                {education.degree} in {education.fieldOfStudy}
              </Typography>
              <Typography>
                {education.startDate} - {education.endDate}
              </Typography>
              <Typography>{education.grade}</Typography>
              <Typography>{education.activities}</Typography>
              <Typography>{education.cgpa}</Typography>
            </Box>
            <Box>
              <IconButton
                color="success"
                onClick={() => handleOpenDialog(index)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDelete(index, education._id)}
              >
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
        <DialogTitle display="flex" justifyContent="space-between" mt={2}>
          {editIndex !== null
            ? "Edit Education Details"
            : "Add Education Details"}
          <IconButton color="secondary" onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography mb={2}>College</Typography>
              <TextField
                name="institution"
                variant="outlined"
                value={currentEducation.institution}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography mb={2}>Degree</Typography>
              <TextField
                name="degree"
                variant="outlined"
                value={currentEducation.degree}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography mb={2}>
                Stream <small>(optional)</small>
              </Typography>
              <TextField
                name="fieldOfStudy"
                variant="outlined"
                value={currentEducation.fieldOfStudy}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography mb={2}>Start Date</Typography>
              <TextField
                name="startDate"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={currentEducation.startDate}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography mb={2}>End Date</Typography>
              <TextField
                name="endDate"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={currentEducation.endDate}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography mb={2}>Grade</Typography>
              <TextField
                name="grade"
                variant="outlined"
                value={currentEducation.grade}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography mb={2}>Activities and Sports</Typography>
              <TextareaAutosize
                name="activities"
                style={{
                  width: "100%",
                  minHeight: 100,
                  padding: 10,
                  fontFamily: "Times New Roman",
                }}
                variant="outlined"
                value={currentEducation.activities}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography mb={2}>
                Performance Score <small>(Recommended)</small>
              </Typography>
              <TextField
                name="cgpa"
                variant="outlined"
                value={currentEducation.cgpa}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ mr: 2 }}>
          <Button
            onClick={handleSave}
            color="primary"
            disabled={!isFormValid()}
          >
            {editIndex !== null ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Education;
