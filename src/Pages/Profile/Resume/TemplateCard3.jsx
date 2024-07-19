import React from 'react';
import { Card, CardContent, Typography, Divider } from '@mui/material';

const TemplateCard3 = ({ user }) => (
    <Card>
        <CardContent>
            <Typography variant="h3">{user.profile.firstName} {user.profile.lastName}</Typography>
            <Typography variant="h5" color="textSecondary">{user.profile.headline}</Typography>
            <Divider style={{ margin: '10px 0' }} />
            <Typography variant="body1">{user.profile.city}, {user.profile.country}</Typography>
            <Typography variant="body1">{user.email}</Typography>
            <Divider style={{ margin: '10px 0' }} />
            <Typography variant="h6">Skills</Typography>
            {user.skills.map((skill, index) => (
                <Typography key={index} variant="body2">{skill.skill} - {skill.level}</Typography>
            ))}
        </CardContent>
    </Card>
);

export default TemplateCard3;
