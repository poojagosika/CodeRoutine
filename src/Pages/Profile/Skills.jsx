import React from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Chip,
} from "@mui/material";
import { Add as AddIcon, Clear as ClearIcon } from "@mui/icons-material";
import { addSkill, deleteSkill } from "../../Api/Profile/skillsApi";
import { toast } from "react-toastify";
import { ContextStore } from "../../Context/ContextStore";

const Skills = (props) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [skills, setSkills] = React.useState(props?.userProfile.skills || []);
  const [newSkill, setNewSkill] = React.useState("");
  const [selectedLevel, setSelectedLevel] = React.useState("intermediate");
  const { userData } = ContextStore();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveSkill = async () => {
    if (newSkill.trim() !== "") {
      const skillObject = {
        skill: newSkill.trim(),
        level: selectedLevel,
      };
      try {
        const response = await addSkill(skillObject);
        if (response.data) {
          setSkills(response.data.skills);
          setNewSkill("");
          setSelectedLevel("intermediate");
          setOpenDialog(false);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to add skill");
        console.error("Failed to add skill:", error);
      }
    }
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const renderSkillDot = (level) => {
    let color;
    switch (level) {
      case "beginner":
        color = "red";
        break;
      case "intermediate":
        color = "yellow";
        break;
      case "advanced":
        color = "green";
        break;
      default:
        color = "gray";
        break;
    }
    return (
      <span
        style={{
          backgroundColor: color,
          width: "8px",
          height: "8px",
          display: "inline-block",
          borderRadius: "50%",
        }}
      />
    );
  };

  const handleDeleteSkill = async (index) => {
    const skillId = skills[index]._id;
    try {
      const response = await deleteSkill(skillId);
      if (response.data) {
        setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
      }
    } catch (error) {
      toast.error("Error deleting skill");
      console.error("Error deleting skill:", error);
    }
  };

  return (
    <Grid item xs={12} p={2}>
      <Divider sx={{ my: 2 }} />
      <Typography
        gutterBottom
        variant="h5"
        sx={{
          fontWeight: 600,
          fontSize: "1.25rem",
          letterSpacing: "0.025em",
        }}
      >
        Skills
      </Typography>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Skill</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="skill"
            label="Skill"
            type="text"
            fullWidth
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <RadioGroup
            aria-label="skill-level"
            name="skill-level"
            value={selectedLevel}
            onChange={handleLevelChange}
            style={{
              marginTop: "16px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <FormControlLabel
              value="beginner"
              control={<Radio size="small" />}
              label={<Typography variant="body2">Beginner</Typography>}
            />
            <FormControlLabel
              value="intermediate"
              control={<Radio size="small" />}
              label={<Typography variant="body2">Intermediate</Typography>}
            />
            <FormControlLabel
              value="advanced"
              control={<Radio size="small" />}
              label={<Typography variant="body2">Advanced</Typography>}
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveSkill} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Box ml={2}>
        {skills.map((skill, index) => (
          <Chip
            key={index}
            label={
              <Box display="flex" alignItems="center">
                {renderSkillDot(skill.level)}
                <Typography
                  variant="body2"
                  component="span"
                  style={{ marginLeft: "8px" }}
                >
                  {skill.skill}
                </Typography>
              </Box>
            }
            style={{ marginBottom: "8px", marginRight: "8px" }}
            onDelete={
              userData?._id === props.userProfile?._id
                ? () => handleDeleteSkill(index)
                : undefined
            }
            deleteIcon={
              userData?._id === props.userProfile?._id ? (
                <ClearIcon />
              ) : undefined
            }
            variant="outlined"
          />
        ))}
      </Box>

      {userData?._id === props.userProfile?._id ? (
        <Button
          variant="text"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{ ml: 2 }}
        >
          Add Skills
        </Button>
      ) : (
        ""
      )}
    </Grid>
  );
};

export default Skills;
