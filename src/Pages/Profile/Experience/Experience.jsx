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
  MenuItem,
  FormControlLabel,
  ListItem,
  List,
  ListItemText,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ExperienceList from "./ExperienceList";
import { ContextStore } from "../../../Context/ContextStore";
import {
  addExperience,
  updateExperience,
} from "../../../Api/Profile/experienceApi";
import { toast } from "react-toastify";
import { formatDateWithYearMonth } from "../config.js";

const Experience = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [experienceList, setExperienceList] = useState(
    props?.userProfile?.experience || []
  );
  const [currentExperience, setCurrentExperience] = useState({
    company: "",
    title: "",
    employmentType: "",
    location: "",
    LocationType: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
    skills: [],
  });
  const [editIndex, setEditIndex] = useState(null);
  const [currentSkill, setCurrentSkill] = useState("");
  const [error, setError] = useState("");
  const { userData } = ContextStore();

  const handleOpenDialog = (index = null) => {
    if (index !== null) {
      const experience = experienceList[index];
      setCurrentExperience({
        ...experience,
        startDate: formatDateWithYearMonth(experience.startDate),
        endDate: formatDateWithYearMonth(experience.endDate),
      });
      setEditIndex(index);
    } else {
      setCurrentExperience({
        company: "",
        title: "",
        employmentType: "",
        location: "",
        LocationType: "",
        startDate: "",
        endDate: "",
        description: "",
        isCurrent: false,
        skills: [],
      });
      setEditIndex(null);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setError("");
    setCurrentSkill("");
    setIsDialogOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "skills") {
      setCurrentSkill(value);
      if (value.trim()) {
        setError("");
      }
    } else {
      setCurrentExperience((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      const experienceToSave = {
        ...currentExperience,
        startDate: new Date(currentExperience.startDate).toISOString(),
        endDate: currentExperience.endDate
          ? new Date(currentExperience.endDate).toISOString()
          : "",
      };
      if (editIndex !== null) {
        console.log(currentExperience)
        const response = await updateExperience(
          currentExperience?._id,
          experienceToSave
        );
        if (response.status === 200) {
          const updatedExperienceList = experienceList.map((experience, idx) =>
            idx === editIndex ? currentExperience : experience
          );
          setExperienceList(updatedExperienceList);
          toast.success(response?.data?.message);
        } else {
          toast.error("Failed to update experience");
        }
      } else {
        const response = await addExperience(experienceToSave);
        if (response.data) {
          setExperienceList(response?.data?.experience);
          toast.success(response?.data?.message);
        } else {
          toast.error("Failed to add experience");
        }
      }
      handleCloseDialog();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to process experience"
      );
      console.log(error);
    }
  };

  const isFormValid = () => {
    return (
      currentExperience.company &&
      currentExperience.title &&
      currentExperience.startDate &&
      (currentExperience.endDate || currentExperience.isCurrent)
    );
  };

  const handleAddSkill = () => {
    if (currentSkill.trim()) {
      const skillExists = currentExperience.skills.some(
        (skill) => skill.toLowerCase() === currentSkill.trim().toLowerCase()
      );
      if (skillExists) {
        setError("Skill already exists");
      } else {
        setCurrentExperience((prev) => ({
          ...prev,
          skills: [...prev.skills, currentSkill.trim()],
        }));
        setCurrentSkill("");
        setError("");
      }
    }
  };

  const handleDeleteSkill = (index) => {
    setCurrentExperience((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const isSaveDisabled = !currentSkill.trim();

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
          Experience
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

      <ExperienceList
        experienceList={experienceList}
        userId={props?.userProfile?._id}
        setExperienceList={setExperienceList}
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
            ? "Edit Experience Details"
            : "Add Experience Details"}
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
                name="company"
                variant="outlined"
                value={currentExperience.company}
                onChange={handleChange}
                fullWidth
                margin="dense"
                label="Company Name"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="title"
                variant="outlined"
                value={currentExperience.title}
                onChange={handleChange}
                fullWidth
                margin="dense"
                label="Title"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="employmentType"
                select
                required
                name="employmentType"
                label="Employment Type"
                variant="outlined"
                value={currentExperience.employmentType}
                onChange={handleChange}
                fullWidth
                margin="dense"
              >
                {[
                  "Full-time",
                  "Part-time",
                  "Internship",
                  "Contract",
                  "Trainee",
                ].map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="location"
                variant="outlined"
                value={currentExperience.location}
                onChange={handleChange}
                fullWidth
                margin="dense"
                label="Location"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="LocationType"
                select
                required
                name="LocationType"
                label="Location Type"
                variant="outlined"
                value={currentExperience.LocationType}
                onChange={handleChange}
                fullWidth
                margin="dense"
              >
                {["On-site", "Hybrid", "Remote"].map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="startDate"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={currentExperience.startDate}
                onChange={handleChange}
                fullWidth
                margin="dense"
                required
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
                value={currentExperience.endDate}
                onChange={handleChange}
                fullWidth
                margin="dense"
                required={!currentExperience?.isCurrent}
                label="End Date"
                disabled={currentExperience?.isCurrent}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={currentExperience?.isCurrent}
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
                id="Description"
                label="Description"
                variant="outlined"
                name="description"
                multiline
                fullWidth
                minRows={2}
                maxRows={10}
                inputProps={{ maxLength: 220 }}
                value={currentExperience.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="skills"
                variant="outlined"
                value={currentSkill}
                onChange={handleChange}
                fullWidth
                margin="dense"
                label="Skills"
                error={Boolean(error)}
                helperText={error}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddSkill}
                style={{ borderRadius: "20px" }}
                startIcon={<AddIcon fontSize="small" />}
                disabled={isSaveDisabled}
              >
                Add Skill
              </Button>
              <List>
                {currentExperience?.skills.map((skill, index) => (
                  <ListItem key={index} button>
                    <ListItemText>{skill}</ListItemText>
                    <IconButton onClick={() => handleDeleteSkill(index)}>
                      <DeleteIcon size="small" color="warning" />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ marginRight: "30px" }}>
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

export default Experience;
