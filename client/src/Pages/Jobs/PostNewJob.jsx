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
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postNewJob } from "../../features/jobs/jobActions";
import { selectError, selectLoading } from "../../features/jobs/jobSlice";
import Error from "../../Component/Error";

const steps = ["Basic Information", "Job Details", "Skills & Requirements", "Responsibilities & Benefits", "Additional Information"];

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
    externalLink: "",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [currentSkill, setCurrentSkill] = useState("");
  const [currentRequirement, setCurrentRequirement] = useState("");
  const [currentResponsibility, setCurrentResponsibility] = useState("");
  const [currentBenefit, setCurrentBenefit] = useState("");
  const [skillError, setSkillError] = useState("");
  const [requirementError, setRequirementError] = useState("");
  const [responsibilityError, setResponsibilityError] = useState("");
  const [benefitError, setBenefitError] = useState("");
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError)

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

  const handleChange = (setter, setError) => (e) => {
    setter(e.target.value);
    setError("");
  };

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

  const validateForm = () => {
    let valid = true;
    if (!formData.title || !formData.company || !formData.description) {
      valid = false;
      alert("Please fill out all required fields.");
    }

    if (formData.externalLink && !isValidURL(formData.externalLink)) {
      valid = false;
      alert("Please enter a valid URL.");
    }

    return valid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(postNewJob(formData));
      navigate("/jobs");
    }
  };

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if(error){
    return <Error error={error}/>
  }


  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
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
          </>
        );
      case 1:
        return (
          <>
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
          </>
        );
      case 2:
        return (
          <>
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
                    handleAdd(
                      "skills",
                      currentSkill,
                      setCurrentSkill,
                      setSkillError,
                      "Skill cannot be empty"
                    )
                  }
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
                  label={skill}
                  variant="outlined"
                  onDelete={() => handleRemove("skills", skill)}
                  sx={{ mb: 1, mr: 1 }}
                />
              ))}
            </Grid>
          </>
        );
      case 3:
        return (
          <>
            <Grid item xs={12}>
              <Typography variant="h6">Responsibilities</Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="start" mb={1}>
                <TextField
                  fullWidth
                  label="Add a Responsibility"
                  value={currentResponsibility}
                  onChange={handleChange(
                    setCurrentResponsibility,
                    setResponsibilityError
                  )}
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
              {formData.responsibilities.map((responsibility, index) => (
                <Chip
                  key={index}
                  label={responsibility}
                  variant="outlined"
                  onDelete={() =>
                    handleRemove("responsibilities", responsibility)
                  }
                  sx={{ mb: 1, mr: 1 }}
                />
              ))}
            </Grid>
          </>
        );
      case 4:
        return (
          <>
            <Grid item xs={12}>
              <Typography variant="h6">Additional Information</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="postedBy"
                label="Posted By"
                value={formData.postedBy}
                onChange={onChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="applicationDeadline"
                label="Application Deadline"
                type="date"
                value={formData.applicationDeadline}
                onChange={onChange}
                fullWidth
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
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
              />
            </Grid>
          </>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Container component={Paper} sx={{ p: 4, mt: 4 }}>
      <form onSubmit={onSubmit}>
        <Typography variant="h4" align="center" gutterBottom>
          Post New Job
        </Typography>

        {/* Stepper */}
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={2} mt={2}>
          {renderStepContent(currentStep)}
        </Grid>

        <Box mt={3} display="flex" justifyContent="space-between">
          {currentStep > 0 && (
            <Button variant="outlined" onClick={prevStep} size="large">
              Back
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={nextStep}
              size="large"
              sx={{ ml: "auto" }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
              sx={{ ml: "auto" }}
            >
              Submit
            </Button>
          )}
        </Box>
      </form>
    </Container>
  );
};

export default PostNewJob;
