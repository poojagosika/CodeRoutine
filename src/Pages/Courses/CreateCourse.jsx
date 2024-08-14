import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import { createCourse } from '../../Api/CoursesApi';
import ExerciseForm from './ExerciseForm';
import TopicForm from './TopicForm';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        topics: [{ title: '', description: '', content: '' }],
        exercises: [{ title: '', questions: [{ questionText: '', options: [], correctAnswer: '' }] }]
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };

    const handleAddTopic = () => {
        setCourseData({
            ...courseData,
            topics: [...courseData.topics, { title: '', description: '', content: '' }]
        });
    };

    const handleAddExercise = () => {
        setCourseData({
            ...courseData,
            exercises: [...courseData.exercises, { title: '', questions: [{ questionText: '', options: [], correctAnswer: '' }] }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createCourse(courseData);
            navigate(`/courses/${response.data._id}`);
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Create New Course</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="title"
                    label="Course Title"
                    value={courseData.title}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="description"
                    label="Course Description"
                    value={courseData.description}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <Typography variant="h6" gutterBottom>Topics</Typography>
                {courseData.topics.map((topic, index) => (
                    <TopicForm
                        key={index}
                        topic={topic}
                        index={index}
                        courseData={courseData}
                        setCourseData={setCourseData}
                    />
                ))}
                <Button variant="contained" color="primary" onClick={handleAddTopic}>
                    Add Topic
                </Button>

                <Typography variant="h6" gutterBottom mt={2}>Exercises</Typography>
                {courseData.exercises.map((exercise, index) => (
                    <ExerciseForm
                        key={index}
                        exercise={exercise}
                        index={index}
                        courseData={courseData}
                        setCourseData={setCourseData}
                    />
                ))}
                <Button variant="contained" color="primary" onClick={handleAddExercise}>
                    Add Exercise
                </Button>

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}                >
                    Create Course
                </Button>
            </form>
        </Box >
    );
};

export default CreateCourse;
