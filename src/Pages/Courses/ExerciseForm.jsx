import React from 'react';
import { TextField, Grid } from '@mui/material';

const ExerciseForm = ({ exercise, index, courseData, setCourseData }) => {
    const handleExerciseChange = (e) => {
        const updatedExercises = courseData.exercises.map((ex, i) =>
            i === index ? { ...ex, [e.target.name]: e.target.value } : ex
        );
        setCourseData({ ...courseData, exercises: updatedExercises });
    };

    return (
        <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
                <TextField
                    name="title"
                    label="Exercise Title"
                    value={exercise.title}
                    onChange={handleExerciseChange}
                    fullWidth
                />
            </Grid>
            {/* You can add more fields for questions and options as needed */}
        </Grid>
    );
};

export default ExerciseForm;
