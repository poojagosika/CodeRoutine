import React, { useState } from "react";
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
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

  React.useEffect(() => {
    document.title = "CodeRoutine | Post New Job";
  }, []);
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeSkill = (e) => {
    setCurrentSkill(e.target.value);
    setSkillError("");
  };

  const handleChangeRequirement = (e) => {
    setCurrentRequirement(e.target.value);
    setRequirementError("");
  };

  const handleChangeResponsibility = (e) => {
    setCurrentResponsibility(e.target.value);
    setResponsibilityError("");
  };

  const handleChangeBenefit = (e) => {
    setCurrentBenefit(e.target.value);
    setBenefitError("");
  };

  const handleAddSkill = () => {
    const trimmedSkill = currentSkill.trim().toLowerCase();
    if (!trimmedSkill) {
      setSkillError("Skill cannot be empty");
      return;
    }
    if (formData.skills.some((skill) => skill.toLowerCase() === trimmedSkill)) {
      setSkillError("This skill is already added");
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      skills: [...prevState.skills, currentSkill.trim()],
    }));
    setCurrentSkill("");
  };

  const handleAddRequirement = () => {
    const trimmedRequirement = currentRequirement.trim();
    if (!trimmedRequirement) {
      setRequirementError("Requirement cannot be empty");
      return;
    }
    if (formData.requirements.includes(trimmedRequirement)) {
      setRequirementError("This requirement is already added");
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      requirements: [...prevState.requirements, trimmedRequirement],
    }));
    setCurrentRequirement("");
  };

  const handleAddResponsibility = () => {
    const trimmedResponsibility = currentResponsibility.trim();
    if (!trimmedResponsibility) {
      setResponsibilityError("Responsibility cannot be empty");
      return;
    }
    if (formData.responsibilities.includes(trimmedResponsibility)) {
      setResponsibilityError("This responsibility is already added");
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      responsibilities: [...prevState.responsibilities, trimmedResponsibility],
    }));
    setCurrentResponsibility("");
  };

  const handleAddBenefit = () => {
    const trimmedBenefit = currentBenefit.trim();
    if (!trimmedBenefit) {
      setBenefitError("Benefit cannot be empty");
      return;
    }
    if (formData.benefits.includes(trimmedBenefit)) {
      setBenefitError("This Benefit is already added");
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      benefits: [...prevState.benefits, trimmedBenefit],
    }));
    setCurrentBenefit("");
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prevState) => ({
      ...prevState,
      skills: prevState.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleRemoveRequirement = (requirementToRemove) => {
    setFormData((prevState) => ({
      ...prevState,
      requirements: prevState.requirements.filter(
        (req) => req !== requirementToRemove
      ),
    }));
  };

  const handleRemoveResponsibility = (responsibilityToRemove) => {
    setFormData((prevState) => ({
      ...prevState,
      responsibilities: prevState.responsibilities.filter(
        (resp) => resp !== responsibilityToRemove
      ),
    }));
  };

  const handleRemoveBenefit = (benefitToRemove) => {
    setFormData((prevState) => ({
      ...prevState,
      benefits: prevState.benefits.filter((ben) => ben !== benefitToRemove),
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewJob(formData));
    navigate("/jobs");
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={4} sx={{ padding: 4, marginTop: 5, marginBottom: 5 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Post a New Job
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
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
                fullWidth
                label="Company"
                name="company"
                value={formData.company}
                onChange={onChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={onChange}
                multiline
                rows={4}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Job Details</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={onChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Salary"
                name="salary"
                value={formData.salary}
                onChange={onChange}
                size="small"
                type="number"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Employment Type"
                name="employmentType"
                value={formData.employmentType}
                onChange={onChange}
                required
                size="small"
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
                fullWidth
                label="Job Level"
                name="jobLevel"
                value={formData.jobLevel}
                onChange={onChange}
                size="small"
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
                fullWidth
                label="Industry"
                name="industry"
                value={formData.industry}
                onChange={onChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Number of Openings"
                name="numberOfOpenings"
                type="number"
                value={formData.numberOfOpenings}
                onChange={onChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Skills</Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="start" mb={1}>
                <TextField
                  fullWidth
                  label="Add a Skill"
                  value={currentSkill}
                  onChange={handleChangeSkill}
                  size="small"
                  error={Boolean(skillError)}
                  helperText={skillError}
                />
                <Button
                  variant="outlined"
                  type="button"
                  color="primary"
                  onClick={handleAddSkill}
                  style={{
                    borderRadius: "10px",
                    marginLeft: "10px",
                    padding: "7px",
                  }}
                  size="small"
                >
                  Add
                </Button>
              </Box>
              {formData.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={
                    <Box display="flex" alignItems="center">
                      <Typography variant="body2" component="span">
                        {skill}
                      </Typography>
                    </Box>
                  }
                  sx={{ mb: 1, mr: 1 }}
                  variant="outlined"
                  onDelete={() => handleRemoveSkill(skill)}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Requirements</Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="start">
                <TextField
                  fullWidth
                  label="Add a Requirement"
                  value={currentRequirement}
                  onChange={handleChangeRequirement}
                  size="small"
                  error={Boolean(requirementError)}
                  helperText={requirementError}
                />
                <Button
                  variant="outlined"
                  type="button"
                  color="primary"
                  onClick={handleAddRequirement}
                  style={{
                    borderRadius: "10px",
                    marginLeft: "10px",
                    padding: "7px",
                  }}
                  size="small"
                >
                  Add
                </Button>
              </Box>
              <Box
                component="ul"
                sx={{ listStyleType: "disc", paddingLeft: 2 }}
              >
                {formData.requirements.map((req, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography
                      component="li"
                      variant="body2"
                      sx={{ flexGrow: 1 }}
                    >
                      {req}
                    </Typography>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      size="small"
                      onClick={() => handleRemoveRequirement(req)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Responsibilities</Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="start">
                <TextField
                  fullWidth
                  label="Add a Responsibility"
                  value={currentResponsibility}
                  onChange={handleChangeResponsibility}
                  size="small"
                  error={Boolean(responsibilityError)}
                  helperText={responsibilityError}
                />
                <Button
                  variant="outlined"
                  type="button"
                  color="primary"
                  onClick={handleAddResponsibility}
                  style={{
                    borderRadius: "10px",
                    marginLeft: "10px",
                    padding: "7px",
                  }}
                  size="small"
                >
                  Add
                </Button>
              </Box>
              <Box
                component="ul"
                sx={{ listStyleType: "disc", paddingLeft: 2 }}
              >
                {formData.responsibilities.map((resp, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography
                      component="li"
                      variant="body2"
                      sx={{ flexGrow: 1 }}
                    >
                      {resp}
                    </Typography>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      size="small"
                      onClick={() => handleRemoveResponsibility(resp)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Benefits</Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="start">
                <TextField
                  fullWidth
                  label="Add a Benefits"
                  value={currentBenefit}
                  onChange={handleChangeBenefit}
                  size="small"
                  error={Boolean(benefitError)}
                  helperText={benefitError}
                />
                <Button
                  variant="outlined"
                  type="button"
                  color="primary"
                  onClick={handleAddBenefit}
                  style={{
                    borderRadius: "10px",
                    marginLeft: "10px",
                    padding: "7px",
                  }}
                  size="small"
                >
                  Add
                </Button>
              </Box>
              <Box
                component="ul"
                sx={{ listStyleType: "disc", paddingLeft: 2 }}
              >
                {formData.benefits.map((benefit, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography
                      component="li"
                      variant="body2"
                      sx={{ flexGrow: 1 }}
                    >
                      {benefit}
                    </Typography>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      size="small"
                      onClick={() => handleRemoveBenefit(benefit)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Other Information</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Posted By"
                name="postedBy"
                value={formData.postedBy}
                onChange={onChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Application Deadline"
                name="applicationDeadline"
                type="date"
                value={formData.applicationDeadline}
                onChange={onChange}
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Application Instructions"
                name="applicationInstructions"
                value={formData.applicationInstructions}
                onChange={onChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Email"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={onChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Link (If any)"
                name="externalLink"
                value={formData.externalLink}
                onChange={onChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Box mt={2} display="flex" justifyContent="flex-start">
                <Button type="submit" variant="contained" color="primary">
                  Post Job
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default PostNewJob;
