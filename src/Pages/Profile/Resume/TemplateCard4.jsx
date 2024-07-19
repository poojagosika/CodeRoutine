import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';

const TemplateCard4 = ({ user }) => (
    <Card>
        <CardContent>
            <Box display="flex" alignItems="center">
                <Avatar style={{ marginRight: '10px' }}>{user.profile.firstName[0]}{user.profile.lastName[0]}</Avatar>
                <Box>
                    <Typography variant="h4">{user.profile.firstName} {user.profile.lastName}</Typography>
                    <Typography variant="subtitle1">{user.profile.headline}</Typography>
                </Box>
            </Box>
            <Typography variant="body1" style={{ marginTop: '10px' }}>{user.profile.city}, {user.profile.country}</Typography>
            <Typography variant="body1">{user.email}</Typography>

            <Typography variant="h6" style={{ marginTop: '10px' }}>Projects</Typography>
            {user.project.map((proj, index) => (
                <div key={index}>
                    <Typography variant="subtitle1">{proj.projectName}</Typography>
                    <Typography variant="body2">{proj.description}</Typography>
                    <Typography variant="body2"><a href={proj.projectLink} target="_blank" rel="noopener noreferrer">{proj.projectLink}</a></Typography>
                </div>
            ))}
        </CardContent>
    </Card>
);

export default TemplateCard4;
