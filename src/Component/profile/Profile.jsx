import * as React from "react";
import {
  Box,
  Container,
  Avatar,
  Grid,
  TextField,
  Typography,
  Link,
  Divider,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Profile() {
  const [isEditingPersonal, setIsEditingPersonal] = React.useState(false);
  const [isEditingSocial, setIsEditingSocial] = React.useState(false);
  const [isEditingSkills, setIsEditingSkills] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: "John",
    lastName: "Doe",
    college: "XYZ University",
    company: "ABC Corp",
    website: "https://johndoe.com",
    linkedIn: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    twitter: "https://twitter.com/johndoe",
    skills: {
      advanced: ["Data Structures", "Algorithms"],
      intermediate: ["System Design", "Databases"],
      fundamental: ["OOP", "Version Control"],
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSkillChange = (e, level, index) => {
    const newSkills = { ...formData.skills };
    newSkills[level][index] = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      skills: newSkills,
    }));
  };

  const handleEditPersonalClick = () => {
    setIsEditingPersonal(true);
  };

  const handleSavePersonalClick = () => {
    setIsEditingPersonal(false);
  };

  const handleEditSocialClick = () => {
    setIsEditingSocial(true);
  };

  const handleSaveSocialClick = () => {
    setIsEditingSocial(false);
  };

  const handleEditSkillsClick = () => {
    setIsEditingSkills(true);
  };

  const handleSaveSkillsClick = () => {
    setIsEditingSkills(false);
  };

  return (
    <Container
      maxWidth="lg"
      style={{ marginTop: "80px", marginBottom: "100px" }}
    >
      <Paper elevation={3} sx={{ borderRadius: "10px", overflow: "hidden" }}>
        <Box
          sx={{
            background: "linear-gradient(to right, #6a11cb, #2575fc)",
            color: "white",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <Avatar
            src="https://via.placeholder.com/150"
            alt="John Doe"
            sx={{ width: 120, height: 120, margin: "0 auto", mb: 2 }}
          />
          <Typography variant="h4">John Doe</Typography>
          <Typography variant="h6">Full Stack Web Developer</Typography>
        </Box>
        <Box sx={{ padding: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h5" gutterBottom>
                  Personal Information
                </Typography>
                {isEditingPersonal ? (
                  <IconButton color="primary" onClick={handleSavePersonalClick}>
                    <SaveIcon fontSize="small" />
                  </IconButton>
                ) : (
                  <IconButton color="primary" onClick={handleEditPersonalClick}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="firstName"
                label="First Name"
                variant="outlined"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
                disabled={!isEditingPersonal}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="lastName"
                label="Last Name"
                variant="outlined"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
                disabled={!isEditingPersonal}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="college"
                label="College"
                variant="outlined"
                value={formData.college}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
                disabled={!isEditingPersonal}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="company"
                label="Company"
                variant="outlined"
                value={formData.company}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
                disabled={!isEditingPersonal}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="website"
                label="Website"
                variant="outlined"
                value={formData.website}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
                disabled={!isEditingPersonal}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h5" gutterBottom>
                    Social Links
                  </Typography>
                  {isEditingSocial ? (
                    <IconButton color="primary" onClick={handleSaveSocialClick}>
                      <SaveIcon fontSize="small" />
                    </IconButton>
                  ) : (
                    <IconButton color="primary" onClick={handleEditSocialClick}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Grid>
              {isEditingSocial ? (
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <TextField
                    id="linkedIn"
                    label="LinkedIn"
                    variant="outlined"
                    value={formData.linkedIn}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    id="github"
                    label="GitHub"
                    variant="outlined"
                    value={formData.github}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    id="twitter"
                    label="Twitter"
                    variant="outlined"
                    value={formData.twitter}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Box>
              ) : (
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Link
                    href={formData.linkedIn}
                    target="_blank"
                    variant="body1"
                    underline="none"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "#0e76a8",
                    }}
                  >
                    <LinkedInIcon />
                  </Link>
                  <Link
                    href={formData.github}
                    target="_blank"
                    variant="body1"
                    underline="none"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "#171515",
                    }}
                  >
                    <GitHubIcon />
                  </Link>
                  <Link
                    href={formData.twitter}
                    target="_blank"
                    variant="body1"
                    underline="none"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "#1DA1F2",
                    }}
                  >
                    <TwitterIcon />
                  </Link>
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h5" gutterBottom>
                  Skills
                </Typography>
                {isEditingSkills ? (
                  <IconButton color="primary" onClick={handleSaveSkillsClick}>
                    <SaveIcon fontSize="small" />
                  </IconButton>
                ) : (
                  <IconButton color="primary" onClick={handleEditSkillsClick}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Typography variant="body1" sx={{ flexBasis: "100%" }}>
                  Advanced:
                </Typography>
                {isEditingSkills
                  ? formData.skills.advanced.map((skill, index) => (
                      <TextField
                        key={index}
                        value={skill}
                        onChange={(e) =>
                          handleSkillChange(e, "advanced", index)
                        }
                        size="small"
                        sx={{ mb: 1 }}
                      />
                    ))
                  : formData.skills.advanced.map((skill, index) => (
                      <Chip key={index} label={skill} sx={{ mb: 1 }} />
                    ))}
                <Typography variant="body1" sx={{ flexBasis: "100%" }}>
                  Intermediate:
                </Typography>
                {isEditingSkills
                  ? formData.skills.intermediate.map((skill, index) => (
                      <TextField
                        key={index}
                        value={skill}
                        onChange={(e) =>
                          handleSkillChange(e, "intermediate", index)
                        }
                        size="small"
                        sx={{ mb: 1 }}
                      />
                    ))
                  : formData.skills.intermediate.map((skill, index) => (
                      <Chip key={index} label={skill} sx={{ mb: 1 }} />
                    ))}
                <Typography variant="body1" sx={{ flexBasis: "100%" }}>
                  Fundamental:
                </Typography>
                {isEditingSkills
                  ? formData.skills.fundamental.map((skill, index) => (
                      <TextField
                        key={index}
                        value={skill}
                        onChange={(e) =>
                          handleSkillChange(e, "fundamental", index)
                        }
                        size="small"
                        sx={{ mb: 1 }}
                      />
                    ))
                  : formData.skills.fundamental.map((skill, index) => (
                      <Chip key={index} label={skill} sx={{ mb: 1 }} />
                    ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h5" gutterBottom>
                Problems Solved
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <TextField
                  id="total-problems"
                  label="Total"
                  value="0"
                  variant="outlined"
                  size="small"
                  sx={{ width: 100 }}
                  disabled
                />
                <TextField
                  id="easy-problems"
                  label="Easy"
                  value="0"
                  variant="outlined"
                  size="small"
                  sx={{ width: 100 }}
                  disabled
                />
                <TextField
                  id="medium-problems"
                  label="Medium"
                  value="0"
                  variant="outlined"
                  size="small"
                  sx={{ width: 100 }}
                  disabled
                />
                <TextField
                  id="hard-problems"
                  label="Hard"
                  value="0"
                  variant="outlined"
                  size="small"
                  sx={{ width: 100 }}
                  disabled
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
