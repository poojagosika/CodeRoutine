import React from 'react';
import { TextField, Grid } from '@mui/material';

const TopicForm = ({ topic, index, courseData, setCourseData }) => {
    const handleTopicChange = (e) => {
        const updatedTopics = courseData.topics.map((t, i) =>
            i === index ? { ...t, [e.target.name]: e.target.value } : t
        );
        setCourseData({ ...courseData, topics: updatedTopics });
    };

    return (
        <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={4}>
                <TextField
                    name="title"
                    label="Topic Title"
                    value={topic.title}
                    onChange={handleTopicChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    name="description"
                    label="Topic Description"
                    value={topic.description}
                    onChange={handleTopicChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    name="content"
                    label="Topic Content"
                    value={topic.content}
                    onChange={handleTopicChange}
                    fullWidth
                />
            </Grid>
        </Grid>
    );
};

export default TopicForm;
