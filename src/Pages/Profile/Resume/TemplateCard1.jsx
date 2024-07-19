import React, { useRef } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const TemplateCard1 = ({ user }) => {
    const resumeRef = useRef();
    const handleDownload = (resumeName) => {
        const resumeContent = resumeRef.current.innerHTML;
        const pdfContent = htmlToPdfmake(resumeContent);
        const documentDefinition = { content: pdfContent };
        pdfMake.createPdf(documentDefinition).download(`${resumeName} Resume.pdf`);
    };
    return (<Card>
        <CardContent>
            <div ref={resumeRef}>

                <Typography variant="h5">{user.profile.firstName} {user.profile.lastName}</Typography>
                <Typography variant="subtitle1">{user.profile.headline}</Typography>
                <Typography variant="body2">{user.profile.city}, {user.profile.country}</Typography>
                <Typography variant="body2">{user.email}</Typography>

                <Grid container spacing={2} style={{ marginTop: '10px' }}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Experience</Typography>
                        {user.experience.map((exp, index) => (
                            <div key={index}>
                                <Typography variant="subtitle2">{exp.title} at {exp.company}</Typography>
                                <Typography variant="body2">{exp.location} | {new Date(exp.startDate).toLocaleDateString()} - {exp.isCurrent ? 'Present' : new Date(exp.endDate).toLocaleDateString()}</Typography>
                                <Typography variant="body2">{exp.description}</Typography>
                            </div>
                        ))}
                    </Grid>
                </Grid>
            </div>
            <Button variant="contained" color="primary" onClick={() => handleDownload(user.profile.firstName + user.profile.lastName)} style={{ marginTop: '20px' }}>
                Download Resume
            </Button>
        </CardContent>
    </Card>);
}

export default TemplateCard1;
