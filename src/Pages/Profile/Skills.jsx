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
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Add as AddIcon, Clear as ClearIcon } from "@mui/icons-material";

const Skills = (props) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [skills, setSkills] = React.useState(props?.skills);
  const [newSkill, setNewSkill] = React.useState("");
  const [selectedLevel, setSelectedLevel] = React.useState("beginner");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveSkill = () => {
    if (newSkill.trim() !== "") {
      const skillObject = {
        skill: newSkill.trim(),
        level: selectedLevel,
      };
      setSkills((prevSkills) => [...prevSkills, skillObject]);
      setNewSkill("");
      setSelectedLevel("beginner");
      setOpenDialog(false);
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

  const handleDeleteSkill = (index) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };

  return (
    <Grid item xs={12}>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Skills</Typography>

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

      <Box>
        {skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill.skill}
            style={{ marginBottom: "8px", marginRight: "8px" }}
            avatar={renderSkillDot(skill.level)}
            onDelete={() => handleDeleteSkill(index)}
            deleteIcon={<ClearIcon />}
          />
        ))}
      </Box>

      <Button
        variant="text"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenDialog}
      >
        Add Skills
      </Button>
    </Grid>
  );
};

export default Skills;
