import React, { useState } from 'react';
import { Container, TextField, Button, MenuItem, Typography, Box } from '@mui/material';
import { createJob } from '../../Api/jobAPi';
import { useNavigate } from 'react-router-dom';

const employmentTypes = ['Full-Time', 'Part-Time', 'Contract'];
const jobLevels = ['Entry-Level', 'Mid-Level', 'Senior-Level'];

const PostNewJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        description: '',
        location: '',
        skills: '',
        salary: '',
        employmentType: '',
        requirements: '',
        responsibilities: '',
        benefits: '',
        postedBy: '',
        applicationDeadline: '',
        jobLevel: '',
        industry: '',
        numberOfOpenings: '',
        applicationInstructions: '',
        contactEmail: '',
    });

    const {
        title,
        company,
        description,
        location,
        skills,
        salary,
        employmentType,
        requirements,
        responsibilities,
        benefits,
        postedBy,
        applicationDeadline,
        jobLevel,
        industry,
        numberOfOpenings,
        applicationInstructions,
        contactEmail
    } = formData;
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const response = await createJob(formData);
            console.log(response.data);
            // Handle success (e.g., show success message, redirect)
            navigate("/jobs");
        } catch (err) {
            console.error(err.response.data);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Post a New Job
            </Typography>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3 }}>
                <TextField
                    fullWidth
                    label="Job Title"
                    name="title"
                    value={title}
                    onChange={onChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Company"
                    name="company"
                    value={company}
                    onChange={onChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={description}
                    onChange={onChange}
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />
                <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={location}
                    onChange={onChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Skills (comma separated)"
                    name="skills"
                    value={skills}
                    onChange={onChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Salary"
                    name="salary"
                    value={salary}
                    onChange={onChange}
                    margin="normal"
                />
                <TextField
                    select
                    fullWidth
                    label="Employment Type"
                    name="employmentType"
                    value={employmentType}
                    onChange={onChange}
                    margin="normal"
                    required
                >
                    {employmentTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    label="Requirements (comma separated)"
                    name="requirements"
                    value={requirements}
                    onChange={onChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Responsibilities (comma separated)"
                    name="responsibilities"
                    value={responsibilities}
                    onChange={onChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Benefits (comma separated)"
                    name="benefits"
                    value={benefits}
                    onChange={onChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Posted By"
                    name="postedBy"
                    value={postedBy}
                    onChange={onChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Application Deadline"
                    name="applicationDeadline"
                    type="date"
                    value={applicationDeadline}
                    onChange={onChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    select
                    fullWidth
                    label="Job Level"
                    name="jobLevel"
                    value={jobLevel}
                    onChange={onChange}
                    margin="normal"
                >
                    {jobLevels.map((level) => (
                        <MenuItem key={level} value={level}>
                            {level}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    label="Industry"
                    name="industry"
                    value={industry}
                    onChange={onChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Number of Openings"
                    name="numberOfOpenings"
                    type="number"
                    value={numberOfOpenings}
                    onChange={onChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Application Instructions"
                    name="applicationInstructions"
                    value={applicationInstructions}
                    onChange={onChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Contact Email"
                    name="contactEmail"
                    type="email"
                    value={contactEmail}
                    onChange={onChange}
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                    Post Job
                </Button>
            </Box>
        </Container>
    );
};

export default PostNewJob;
