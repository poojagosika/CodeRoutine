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
  TextareaAutosize,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const ProjectDetails = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projectList, setProjectList] = useState(props?.project);
  const [currentProject, setCurrentProject] = useState({
    projectName: "",
    projectLink: "",
    startDate: "",
    endDate: "",
    description: "",
    isCurrent: false,
  });
  const [editIndex, setEditIndex] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleOpenDialog = (index = null) => {
    if (index !== null) {
      setCurrentProject(projectList[index]);
      setEditIndex(index);
      setIsChecked(projectList[index].isCurrent);
    } else {
      setCurrentProject({
        projectName: "",
        projectLink: "",
        startDate: "",
        endDate: "",
        description: "",
        isCurrent: false,
      });
      setEditIndex(null);
      setIsChecked(false);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update current project state
    setCurrentProject((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Additional validation for start and end dates
    if (
      name === "startDate" &&
      new Date(value) >= new Date(currentProject.endDate)
    ) {
      alert("Start date must be before end date!");
      return;
    }
    if (
      name === "endDate" &&
      new Date(value) <= new Date(currentProject.startDate)
    ) {
      alert("End date must be after start date!");
      return;
    }
  };

  const handleSave = () => {
    const updatedProject = {
      ...currentProject,
      isCurrent: isChecked,
    };

    const updatedProjectList =
      editIndex !== null
        ? projectList.map((project, idx) =>
          idx === editIndex ? updatedProject : project
        )
        : [...projectList, updatedProject];

    // Sort the project list by start date (latest first)
    const sortedProjectList = updatedProjectList.sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );

    setProjectList(sortedProjectList);
    setIsDialogOpen(false);
  };

  const handleDelete = (index) => {
    setProjectList((prev) => prev.filter((_, idx) => idx !== index));
  };

  const isFormValid = () => {
    return (
      currentProject.projectName &&
      currentProject.projectLink &&
      currentProject.startDate &&
      currentProject.endDate
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
        Project Details
      </Typography>

      <Box mt={3}>
        {projectList.map((project, index) => (
          <Box
            key={index}
            mb={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box ml={2} spacing={2}>
              <Typography variant="h6">{project.projectName}</Typography>
              <Typography>
                {project.startDate} - {project.endDate}
                {project.isCurrent && <span> - Present - </span>}(
                {calculateYearsMonths(project.startDate, project.endDate).years}{" "}
                years{" "}
                {
                  calculateYearsMonths(project.startDate, project.endDate)
                    .months
                }{" "}
                months)
              </Typography>
              <Typography>{project.description}</Typography>
              <Typography>
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.projectLink}
                </a>
              </Typography>
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
          {editIndex !== null ? "Edit Project Details" : "Add Project Details"}
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
              <Typography mb={1}>Project Name</Typography>
              <TextField
                name="projectName"
                variant="outlined"
                value={currentProject.projectName}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography mb={1}>Project Link</Typography>
              <TextField
                name="projectLink"
                variant="outlined"
                value={currentProject.projectLink}
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
                value={currentProject.startDate}
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
                value={currentProject.endDate}
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
                value={currentProject.description}
                onChange={handleChange}
                fullWidth
                size="small"
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

      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          <AddIcon />
          Add Project
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectDetails;
