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
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  addProject,
  deleteProject,
  updateProject,
} from "../../Api/Profile/projectApi";

const ProjectDetails = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projectList, setProjectList] = useState(props?.project || []);
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOpenDialog = (index = null) => {
    if (index !== null) {
      const selectedProject = { ...projectList[index] };
      setCurrentProject({
        ...selectedProject,
        startDate: selectedProject.startDate
          ? new Date(selectedProject.startDate).toISOString().split("T")[0]
          : "",
        endDate: selectedProject.endDate
          ? new Date(selectedProject.endDate).toISOString().split("T")[0]
          : "",
      });
      setEditIndex(index);
      setIsChecked(selectedProject.isCurrent);
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
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setIsChecked(checked);
    } else {
      setCurrentProject((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Additional validation for start and end dates
    if (
      name === "startDate" &&
      new Date(value) >= new Date(currentProject.endDate)
    ) {
      setSnackbarMessage("Start date must be before end date!");
      setSnackbarOpen(true);
      return;
    }
    if (
      name === "endDate" &&
      new Date(value) <= new Date(currentProject.startDate)
    ) {
      setSnackbarMessage("End date must be after start date!");
      setSnackbarOpen(true);
      return;
    }
  };

  const handleSave = async () => {
    try {
      let response;
      console.log(currentProject._id);

      if (editIndex !== null) {
        response = await updateProject(currentProject._id, currentProject); // Assuming _id is the identifier for the project
      } else {
        response = await addProject(currentProject);
      }

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

      const sortedProjectList = updatedProjectList.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
      );

      setProjectList(sortedProjectList);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving project:", error);
      setSnackbarMessage("Failed to save project. Please try again.");
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (index) => {
    try {
      const projectId = projectList[index]._id; // Assuming each project has a unique _id
      await deleteProject(projectId);
      setProjectList((prev) => prev.filter((_, idx) => idx !== index));
      setSnackbarMessage("Project deleted successfully.");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting project:", error);
      setSnackbarMessage("Failed to delete project. Please try again.");
      setSnackbarOpen(true);
    }
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
                      onChange={handleChange}
                      name="isCurrent"
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

      <Button
        onClick={() => handleOpenDialog()}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        style={{ marginTop: 20 }}
      >
        Add Project
      </Button>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default ProjectDetails;
