import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const TemplateCard2 = ({ user }) => (
    <Card>
        <CardContent>
            <Typography variant="h4" gutterBottom>{user.profile.firstName} {user.profile.lastName}</Typography>
            <Typography variant="h6">{user.profile.headline}</Typography>
            <Typography variant="body1">{user.profile.city}, {user.profile.country}</Typography>
            <Typography variant="body1">{user.email}</Typography>

            <Typography variant="h6" style={{ marginTop: '10px' }}>Education</Typography>
            {user.education.map((edu, index) => (
                <List key={index}>
                    <ListItem>
                        <ListItemText primary={`${edu.degree} in ${edu.fieldOfStudy}`} secondary={`${edu.institution}, ${new Date(edu.startDate).toLocaleDateString()} - ${edu.isCurrent ? 'Present' : new Date(edu.endDate).toLocaleDateString()}`} />
                    </ListItem>
                </List>
            ))}
        </CardContent>
    </Card>
);

export default TemplateCard2;
