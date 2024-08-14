import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import TopicForm from './TopicForm';
import ExerciseForm from './ExerciseForm';
import { getCourseById, updateCourse } from '../../Api/CoursesApi';

const UpdateCourse = () => {
    const { courseId } = useParams();  // Get course ID from URL
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        createdBy: '',
        topics: [{ title: '', description: '', content: '' }],
        exercises: [{ title: '', questions: [{ questionText: '', options: [], correctAnswer: '' }] }]
    });

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await getCourseById(courseId);
                setCourseData(response.course);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };

        fetchCourse();
    }, [courseId]);

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
            const response = await updateCourse(courseId, courseData);
            alert('Course updated successfully');
            navigate('/courses');  // Redirect to courses list or any other page after updating
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Update Course</Typography>
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
                <TextField
                    name="createdBy"
                    label="Created By (Admin ID)"
                    value={courseData.createdBy}
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

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Update Course
                </Button>
            </form>
        </Box>
    );
};

export default UpdateCourse;
