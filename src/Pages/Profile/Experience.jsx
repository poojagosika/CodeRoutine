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
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  ListItem,
  List,
  ListItemText,
  TextareaAutosize,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const Experience = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [experienceList, setExperienceList] = useState([]);
  const [currentExperience, setCurrentExperience] = useState({
    company: "",
    title: "",
    employmentType: "",
    location: "",
    LocationType: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [isChecked, setIsChecked] = useState(false); // State for checkbox

  const handleOpenDialog = (index = null) => {
    if (index !== null) {
      setCurrentExperience(experienceList[index]);
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

    // Update current experience state
    setCurrentExperience((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Additional validation for start and end dates
    if (
      name === "startDate" &&
      new Date(value) >= new Date(currentExperience.endDate)
    ) {
      alert("Start date must be before end date!");
      return;
    }
    if (
      name === "endDate" &&
      new Date(value) <= new Date(currentExperience.startDate)
    ) {
      alert("End date must be after start date!");
      return;
    }
  };

  const handleSave = () => {
    // Update currentExperience with isChecked state
    const updatedExperience = {
      ...currentExperience,
      hiAll: isChecked, // Add isChecked state to currentExperience
    };

    const updatedExperienceList =
      editIndex !== null
        ? experienceList.map((exp, idx) =>
            idx === editIndex ? updatedExperience : exp
          )
        : [...experienceList, updatedExperience];

    // Sort the experience list by start date (latest first)
    const sortedExperienceList = updatedExperienceList.sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );

    setExperienceList(sortedExperienceList);
    setIsDialogOpen(false);
  };

  const handleDelete = (index) => {
    setExperienceList((prev) => prev.filter((_, idx) => idx !== index));
  };

  const isFormValid = () => {
    return (
      currentExperience.company &&
      currentExperience.title &&
      currentExperience.startDate &&
      currentExperience.endDate
    );
  };

  const handleChangeSkill = (event) => {
    setCurrentSkill(event.target.value);
  };

  const handleAddSkill = () => {
    if (currentSkill.trim() !== "") {
      setSkills([...skills, currentSkill]);
      setCurrentSkill("");
    }
  };

  const handleDeleteSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handlCheck = (event) => {
    setIsChecked(event.target.checked); // Update isChecked state
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
        Experience
      </Typography>

      <Box mt={3}>
        {experienceList.map((experience, index) => (
          <Box
            key={index}
            mb={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box ml={2} spacing={2}>
              <Typography variant="h6">{experience.company}</Typography>
              <Typography>{experience.title}</Typography>
              <Typography>{experience.employmentType}</Typography>
              <Typography>{experience.location}</Typography>
              <Typography>{experience.LocationType}</Typography>
              <Typography>
                {experience.startDate} - {experience.endDate}
                {isChecked && <span> - Present - </span>}(
                {
                  calculateYearsMonths(experience.startDate, experience.endDate)
                    .years
                }{" "}
                years{" "}
                {
                  calculateYearsMonths(experience.startDate, experience.endDate)
                    .months
                }{" "}
                months)
              </Typography>

              <Typography>{experience.description}</Typography>
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
            ? "Edit Experience Details "
            : "Add Experience Details"}
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
              <Typography mb={1}>Company</Typography>

              <TextField
                name="company"
                variant="outlined"
                value={currentExperience.company}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography mb={1}>Title</Typography>

              <TextField
                name="title"
                variant="outlined"
                value={currentExperience.title}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography mb={1}>Employment Type</Typography>

              <FormControl
                variant="outlined"
                fullWidth
                size="small"
                margin="normal"
              >
                <Select
                  name="employmentType"
                  value={currentExperience.employmentType}
                  onChange={handleChange}
                >
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Trainee">Trainee</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography mb={1}>Location</Typography>

              <TextField
                name="location"
                variant="outlined"
                value={currentExperience.location}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography mb={1}>Location Type</Typography>

              <FormControl
                variant="outlined"
                fullWidth
                size="small"
                margin="normal"
              >
                <Select
                  name="LocationType"
                  value={currentExperience.LocationType}
                  onChange={handleChange}
                  label="Location Type"
                >
                  <MenuItem value="On-site">On-site</MenuItem>
                  <MenuItem value="Hybrid">Hybrid</MenuItem>
                  <MenuItem value="Remote">Remote</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography mb={1}>Start Date</Typography>

              <TextField
                name="startDate"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={currentExperience.startDate}
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
                value={currentExperience.endDate}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="normal"
              />
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox checked={isChecked} onChange={handlCheck} />
                  }
                  label="Currently Working here"
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
                value={currentExperience.description}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography mb={1}>Skills</Typography>
              <TextField
                variant="outlined"
                value={currentSkill}
                onChange={handleChangeSkill}
                fullWidth
                size="small"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddSkill}
                style={{ borderRadius: "20px" }}
                startIcon={<AddIcon fontSize="small" />}
              >
                Add Skill
              </Button>
              <List>
                {skills.map((skill, index) => (
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
          Add Experience
        </Button>
      </Box>
    </Box>
  );
};

export default Experience;
