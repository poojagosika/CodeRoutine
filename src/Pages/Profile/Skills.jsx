import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  Box,
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
import { addSkill, deleteSkill } from "../../features/profile/profileActions";
import { selectSkills } from "../../features/profile/profileSlice";
import { toast } from "react-toastify";
import { ContextStore } from "../../Context/ContextStore";

const Skills = ({ userProfile }) => {
  const dispatch = useDispatch();
  const skills = useSelector(selectSkills);
  const [openDialog, setOpenDialog] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("intermediate");
  const [error, setError] = useState("");
  const { userData } = ContextStore();

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setError("");
    setNewSkill("");
    setOpenDialog(false);
  };

  const handleSaveSkill = async () => {
    if (newSkill.trim()) {
      const skillExists = skills.some(
        (skill) => skill.skill.toLowerCase() === newSkill.trim().toLowerCase()
      );
      if (skillExists) {
        setError("Skill already exists");
        return;
      }

      const skillObject = { skill: newSkill.trim(), level: selectedLevel };
      try {
        await dispatch(addSkill(skillObject)).unwrap();
        resetDialog();
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const resetDialog = () => {
    setNewSkill("");
    setSelectedLevel("intermediate");
    setOpenDialog(false);
  };

  const handleLevelChange = (event) => setSelectedLevel(event.target.value);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "skills") {
      setNewSkill(value);
      if (value.trim()) {
        setError("");
      }
    }
  };

  const renderSkillDot = (level) => {
    const colors = {
      beginner: "red",
      intermediate: "orange",
      advanced: "green",
    };
    return (
      <span
        style={{
          backgroundColor: colors[level] || "gray",
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
      await dispatch(deleteSkill(skillId));
    } catch (error) {
      toast.error(error);
    }
  };

  const canEdit = userData?._id === userProfile?._id;

  const isSaveDisabled = !newSkill.trim();

  return (
    <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
          Skills
        </Typography>
        {canEdit && (
          <IconButton color="primary" onClick={handleOpenDialog} sx={{ mr: 1 }}>
            <AddIcon />
          </IconButton>
        )}
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Skill</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="skill"
            label="Skill"
            type="text"
            name="skills"
            fullWidth
            value={newSkill}
            onChange={handleChange}
            error={Boolean(error)}
            helperText={error}
          />
          <RadioGroup
            aria-label="skill-level"
            name="skill-level"
            value={selectedLevel}
            onChange={handleLevelChange}
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {["beginner", "intermediate", "advanced"].map((level) => (
              <FormControlLabel
                key={level}
                value={level}
                control={<Radio size="small" />}
                label={
                  <Typography variant="body2">
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveSkill}
            color="primary"
            disabled={isSaveDisabled}
          >
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
                <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                  {skill.skill}
                </Typography>
              </Box>
            }
            sx={{ mb: 1, mr: 1 }}
            onDelete={canEdit ? () => handleDeleteSkill(index) : undefined}
            deleteIcon={canEdit ? <ClearIcon /> : undefined}
            variant="outlined"
          />
        ))}
      </Box>

      {skills.length === 0 ? (
        <Typography variant="body2" sx={{ color: "#6B7280" }}>
          No skills added yet.
        </Typography>
      ) : (
        <Box
          display="flex"
          justifyContent="flex-start"
          gap={2}
          ml={2}
          mt={1}
          sx={{ color: "#6B7280" }}
        >
          {["beginner", "intermediate", "advanced"].map((level) => (
            <Box
              key={level}
              display="flex"
              justifyContent="center"
              gap={1}
              alignItems="center"
            >
              {renderSkillDot(level)}
              <Typography
                variant="body2"
                display="flex"
                gap={1}
                alignItems="center"
                borderBottom={`1px solid ${
                  renderSkillDot(level).props.style.backgroundColor
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Grid>
  );
};

export default Skills;
