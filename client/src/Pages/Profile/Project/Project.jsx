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
import ProjectList from "./ProjectList.jsx";
import { ContextStore } from "../../../Context/ContextStore.jsx";
import { toast } from "react-toastify";
import { formatDateWithYearMonth } from "../config.js";
import { useDispatch } from "react-redux";
import {
  addProject,
  updateProject,
} from "../../../features/profile/profileActions.js";

const Project = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projectList, setProjectList] = useState(props?.userProfile?.project);
  const [currentProject, setCurrentProject] = useState({
    projectName: "",
    projectLink: "",
    startDate: "",
    endDate: "",
    description: "",
    isCurrent: false,
  });
  const [editIndex, setEditIndex] = useState(null);
  const { userData } = ContextStore();
  const dispatch = useDispatch();

  const handleOpenDialog = (index = null) => {
    if (index !== null) {
      const project = projectList[index];
      setCurrentProject({
        ...project,
        startDate: formatDateWithYearMonth(project.startDate),
        endDate: formatDateWithYearMonth(project.endDate),
      });
      setEditIndex(index);
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
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentProject({
      projectName: "",
      projectLink: "",
      startDate: "",
      endDate: "",
      description: "",
      isCurrent: false,
    });
    setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentProject((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    const today = new Date();
    const startDate = new Date(currentProject.startDate);
    const endDate = currentProject.endDate
      ? new Date(currentProject.endDate)
      : today;
    try {
      const projectToSave = {
        ...currentProject,
        startDate: startDate.toISOString(),
        endDate: currentProject.endDate ? endDate.toISOString() : "",
      };

      if (editIndex !== null) {
        dispatch(
          updateProject({ projectId: currentProject?._id, data: projectToSave })
        );
      } else {
        dispatch(addProject(projectToSave));
      }
      handleCloseDialog();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to process project"
      );
      console.log(error);
    }
  };

  const isFormValid = () => {
    return (
      currentProject.projectName &&
      currentProject.projectLink &&
      currentProject.startDate &&
      (currentProject.isCurrent || currentProject.endDate)
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
          Projects
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
      <ProjectList
        projectList={projectList}
        userId={props?.userProfile?._id}
        setProjectList={setProjectList}
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
          {editIndex !== null ? "Edit Project Details" : "Add Project Details"}
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
                name="projectName"
                variant="outlined"
                value={currentProject.projectName}
                onChange={handleChange}
                fullWidth
                margin="dense"
                label="Project Name"
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
                name="projectLink"
                variant="outlined"
                fullWidth
                margin="dense"
                label="Project Link"
                required
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                value={currentProject.projectLink}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="startDate"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={currentProject.startDate}
                onChange={handleChange}
                fullWidth
                margin="dense"
                required
                autoComplete="off"
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
                value={currentProject.endDate}
                onChange={handleChange}
                fullWidth
                margin="dense"
                required
                autoComplete="off"
                label="End Date"
                disabled={currentProject.isCurrent}
                InputProps={{
                  inputProps: {
                    max: new Date().toISOString().split("T")[0],
                    min: currentProject.startDate,
                  },
                }}
              />
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={currentProject.isCurrent}
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
                value={currentProject.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ marginRight: "20px" }}>
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

export default Project;
