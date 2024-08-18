import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Paper,
  Grid,
  Chip,
  IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { postNewJob } from "../../features/jobs/jobActions";

const employmentTypes = ["Full-Time", "Part-Time", "Contract"];
const jobLevels = ["Entry-Level", "Mid-Level", "Senior-Level"];

const PostNewJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    skills: [],
    salary: "",
    employmentType: "",
    requirements: [],
    responsibilities: [],
    benefits: [],
    postedBy: "",
    applicationDeadline: "",
    jobLevel: "",
    industry: "",
    numberOfOpenings: "",
    applicationInstructions: "",
    contactEmail: "",
    externalLink: "",
  });

  const [currentSkill, setCurrentSkill] = useState("");
  const [currentRequirement, setCurrentRequirement] = useState("");
  const [currentResponsibility, setCurrentResponsibility] = useState("");
  const [currentBenefit, setCurrentBenefit] = useState("");
  const [skillError, setSkillError] = useState("");
  const [requirementError, setRequirementError] = useState("");
  const [responsibilityError, setResponsibilityError] = useState("");
  const [benefitError, setBenefitError] = useState("");

  useEffect(() => {
    document.title = "CodeRoutine | Post New Job";
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Generalized handleChange function
  const handleChange = (setter, setError) => (e) => {
    setter(e.target.value);
    setError("");
  };

  // Generalized handleAdd function
  const handleAdd = (type, currentItem, setCurrentItem, setError, errorText) => {
    const trimmedItem = currentItem.trim().toLowerCase();
    if (!trimmedItem) {
      setError(errorText);
      return;
    }
    if (formData[type].some((item) => item.toLowerCase() === trimmedItem)) {
      setError(`This ${type.slice(0, -1)} is already added`);
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      [type]: [...prevState[type], currentItem.trim()],
    }));
    setCurrentItem("");
  };

  // Generalized handleRemove function
  const handleRemove = (type, itemToRemove) => {
    setFormData((prevState) => ({
      ...prevState,
      [type]: prevState[type].filter((item) => item !== itemToRemove),
    }));
  };
  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };


  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewJob(formData));
    navigate("/jobs");
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: "100vh" }}>
      <Paper elevation={4} sx={{ padding: 4, marginTop: 5, marginBottom: 5 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Post a New Job
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="h6">Basic Information</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="title"
                label="Job Title"
                value={formData.title}
                onChange={onChange}
                fullWidth
                variant="outlined"
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="company"
                label="Company"
                value={formData.company}
                onChange={onChange}
                fullWidth
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                value={formData.description}
                onChange={onChange}
                multiline
                rows={4}
                fullWidth
                size="small"
                required
              />
            </Grid>

            {/* Job Details */}
            <Grid item xs={12}>
              <Typography variant="h6">Job Details</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="location"
                label="Location"
                value={formData.location}
                onChange={onChange}
                fullWidth
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="salary"
                label="Salary"
                value={formData.salary}
                onChange={onChange}
                fullWidth
                size="small"
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                name="employmentType"
                label="Employment Type"
                value={formData.employmentType}
                onChange={onChange}
                fullWidth
                size="small"
                required
              >
                {employmentTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                name="jobLevel"
                label="Job Level"
                value={formData.jobLevel}
                onChange={onChange}
                fullWidth
                size="small"
                required
              >
                {jobLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="industry"
                label="Industry"
                value={formData.industry}
                onChange={onChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="numberOfOpenings"
                label="Number of Openings"
                value={formData.numberOfOpenings}
                onChange={onChange}
                fullWidth
                size="small"
                type="number"
              />
            </Grid>

            {/* Skills */}
            <Grid item xs={12}>
              <Typography variant="h6">Skills</Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="start" mb={1}>
                <TextField
                  fullWidth
                  label="Add a Skill"
                  value={currentSkill}
                  onChange={handleChange(setCurrentSkill, setSkillError)}
                  size="small"
                  error={Boolean(skillError)}
                  helperText={skillError}
                />
                <Button
                  variant="outlined"
                  type="button"
                  color="primary"
                  onClick={() =>
                    handleAdd("skills", currentSkill, setCurrentSkill, setSkillError, "Skill cannot be empty")
                  }
                  style={{ borderRadius: "10px", marginLeft: "10px", padding: "7px" }}
                  size="small"
                >
                  Add
                </Button>
              </Box>
              {formData.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  variant="outlined"
                  onDelete={() => handleRemove("skills", skill)}
                  sx={{ mb: 1, mr: 1 }}
                />
              ))}
            </Grid>

            {/* Requirements */}
            <Grid item xs={12}>
              <Typography variant="h6">Requirements</Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="start">
                <TextField
                  fullWidth
                  label="Add a Requirement"
                  value={currentRequirement}
                  onChange={handleChange(setCurrentRequirement, setRequirementError)}
                  size="small"
                  error={Boolean(requirementError)}
                  helperText={requirementError}
                />
                <Button
                  variant="outlined"
                  type="button"
                  color="primary"
                  onClick={() =>
                    handleAdd(
                      "requirements",
                      currentRequirement,
                      setCurrentRequirement,
                      setRequirementError,
                      "Requirement cannot be empty"
                    )
                  }
                  style={{ borderRadius: "10px", marginLeft: "10px", padding: "7px" }}
                  size="small"
                >
                  Add
                </Button>
              </Box>
              {formData.requirements.map((requirement, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                  <Typography component="li" variant="body2" sx={{ flexGrow: 1 }}>
                    {requirement}
                  </Typography>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemove("requirements", requirement)}
                    size="small"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}
            </Grid>

            {/* Responsibilities */}
            <Grid item xs={12}>
              <Typography variant="h6">Responsibilities</Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="start">
                <TextField
                  fullWidth
                  label="Add a Responsibility"
                  value={currentResponsibility}
                  onChange={handleChange(setCurrentResponsibility, setResponsibilityError)}
                  size="small"
                  error={Boolean(responsibilityError)}
                  helperText={responsibilityError}
                />
                <Button
                  variant="outlined"
                  type="button"
                  color="primary"
                  onClick={() =>
                    handleAdd(
                      "responsibilities",
                      currentResponsibility,
                      setCurrentResponsibility,
                      setResponsibilityError,
                      "Responsibility cannot be empty"
                    )
                  }
                  style={{ borderRadius: "10px", marginLeft: "10px", padding: "7px" }}
                  size="small"
                >
                  Add
                </Button>
              </Box>
              {formData.responsibilities.map((responsibility, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                  <Typography component="li" variant="body2" sx={{ flexGrow: 1 }}>
                    {responsibility}
                  </Typography>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemove("responsibilities", responsibility)}
                    size="small"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}
            </Grid>

            {/* Benefits */}
            <Grid item xs={12}>
              <Typography variant="h6">Benefits</Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="start">
                <TextField
                  fullWidth
                  label="Add a Benefit"
                  value={currentBenefit}
                  onChange={handleChange(setCurrentBenefit, setBenefitError)}
                  size="small"
                  error={Boolean(benefitError)}
                  helperText={benefitError}
                />
                <Button
                  variant="outlined"
                  type="button"
                  color="primary"
                  onClick={() =>
                    handleAdd(
                      "benefits",
                      currentBenefit,
                      setCurrentBenefit,
                      setBenefitError,
                      "Benefit cannot be empty"
                    )
                  }
                  style={{ borderRadius: "10px", marginLeft: "10px", padding: "7px" }}
                  size="small"
                >
                  Add
                </Button>
              </Box>
              {formData.benefits.map((benefit, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                  <Typography component="li" variant="body2" sx={{ flexGrow: 1 }}>
                    {benefit}
                  </Typography>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemove("benefits", benefit)}
                    size="small"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}
            </Grid>

            {/* Additional Information */}
            <Grid item xs={12}>
              <Typography variant="h6">Additional Information</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="postedBy"
                label="Posted By"
                value={formData.postedBy}
                onChange={onChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="applicationDeadline"
                label="Application Deadline"
                value={formData.applicationDeadline}
                onChange={onChange}
                fullWidth
                size="small"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="applicationInstructions"
                label="Application Instructions"
                value={formData.applicationInstructions}
                onChange={onChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="contactEmail"
                label="Contact Email"
                value={formData.contactEmail}
                onChange={onChange}
                fullWidth
                size="small"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="externalLink"
                label="External Link"
                value={formData.externalLink}
                onChange={onChange}
                fullWidth
                size="small"
                error={formData.externalLink && !isValidURL(formData.externalLink)}
                helperText={
                  formData.externalLink && !isValidURL(formData.externalLink)
                    ? "Please enter a valid URL"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 3,
                  mb: 2,
                  p: 1.5,
                  borderRadius: "20px",
                  boxShadow: "0 3px 5px 2px rgba(105, 135, 255, .3)",
                }}
              >
                Post Job
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default PostNewJob;
