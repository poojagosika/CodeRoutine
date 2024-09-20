import { Paper } from '@mui/material'
import React, { useState } from 'react'
import serverUserData from "./Confi";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    Box,
    Divider,
    IconButton,
} from "@mui/material";
import { LinkedIn, GitHub } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { ContextStore } from '../../../../Context/ContextStore';
const ViewResume = () => {
    const { resumeInfo, setResumeInfo } = ContextStore();
    const hasPersonalInformation = (profile) => {
        if (!profile) return false;
        const {
            firstName,
            lastName,
            headline,
            currentPosition,
            education,
            city,
            gender,
            country,
        } = profile;
        return (
            firstName ||
            lastName ||
            headline ||
            currentPosition ||
            education ||
            city ||
            gender ||
            country
        );
    };
    return (
        <Paper elevation={3} sx={{ p: 2, width: "100%" }}>
            <Box
                sx={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px 8px 0 0",
                }}
            >
                {hasPersonalInformation(resumeInfo?.profile) && (
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 700 }}
                            textAlign="center"
                        >
                            {resumeInfo.profile.firstName} {resumeInfo.profile.lastName}
                        </Typography>

                        <Box
                            display="flex"
                            gap={2}
                            alignItems="center"
                            justifyContent="center"
                            flexWrap="wrap"
                        >
                            <Box display="flex" alignItems="center">
                                <EmailIcon color="primary" fontSize="small" />
                                <Typography variant="body1" ml={1}>
                                    {resumeInfo.email}
                                </Typography>
                            </Box>

                            <IconButton
                                component="a"
                                href={resumeInfo.socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                title="GitHub"
                                sx={{ display: "flex", alignItems: "center", gap: 1 }}
                            >
                                <GitHub color="primary" fontSize="small" />
                                <Typography variant="body1">GitHub</Typography>
                            </IconButton>

                            <IconButton
                                component="a"
                                href={resumeInfo.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                title="LinkedIn"
                                sx={{ display: "flex", alignItems: "center", gap: 1 }}
                            >
                                <LinkedIn color="primary" fontSize="small" />
                                <Typography variant="body1">LinkedIn</Typography>
                            </IconButton>

                            <Box display="flex" alignItems="center">
                                <FmdGoodIcon color="primary" fontSize="small" />
                                <Typography variant="body1" ml={1}>
                                    {resumeInfo.profile.city && `${resumeInfo.profile.city}, `}
                                    {resumeInfo.profile.country}
                                </Typography>
                            </Box>
                        </Box>

                        <Typography variant="h6" color="secondary">
                            Summary
                        </Typography>
                        <Divider />
                        <Typography variant="body1">{resumeInfo.profile.headline}</Typography>
                    </Box>
                )}

                {resumeInfo?.experience?.length > 0 && (
                    <Box>
                        <Typography variant="h6" color="secondary">
                            Experience
                        </Typography>
                        <Divider />
                        {resumeInfo.experience.map((exp, index) => (
                            <Box key={index} mb={1}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    {exp.title} at {exp.company}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    ({new Date(exp.startDate).toLocaleDateString()} -{" "}
                                    {exp.isCurrent
                                        ? "Present"
                                        : new Date(exp.endDate).toLocaleDateString()}
                                    )
                                </Typography>
                                <Typography variant="body2">
                                    {exp.employmentType}
                                </Typography>
                                <Typography variant="body2">
                                    {exp.location} ({exp.locationType})
                                </Typography>
                                <Typography variant="body2">{exp.description}</Typography>
                                {exp.skills.length > 0 && (
                                    <Typography variant="body2">
                                        Skills: {exp.skills.join(", ")}
                                    </Typography>
                                )}
                            </Box>
                        ))}
                    </Box>
                )}

                {resumeInfo?.education?.length > 0 && (
                    <Box>
                        <Typography variant="h6" color="secondary">
                            Education
                        </Typography>
                        <Divider />
                        {resumeInfo.education.map((edu, index) => (
                            <Box key={index} mb={1}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    {edu.degree} in {edu.fieldOfStudy}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    ({new Date(edu.startDate).toLocaleDateString()} -{" "}
                                    {edu.isCurrent
                                        ? "Present"
                                        : new Date(edu.endDate).toLocaleDateString()}
                                    )
                                </Typography>
                                <Typography variant="body2">{edu.institution}</Typography>
                                {edu.grade && (
                                    <Typography variant="body2">
                                        Grade: {edu.grade}
                                    </Typography>
                                )}
                                {edu.activities && (
                                    <Typography variant="body2">
                                        Activities: {edu.activities}
                                    </Typography>
                                )}
                                {edu.cgpa && (
                                    <Typography variant="body2">CGPA: {edu.cgpa}</Typography>
                                )}
                            </Box>
                        ))}
                    </Box>
                )}

                {resumeInfo?.training?.length > 0 && (
                    <Box>
                        <Typography variant="h6" color="secondary">
                            Training Courses
                        </Typography>
                        <Divider />
                        {resumeInfo.training.map((course, index) => (
                            <Box key={index} mb={1}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    {course.courseName} at {course.organization}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    ( {new Date(course.startDate).toLocaleDateString()} -{" "}
                                    {course.isCurrent
                                        ? "Present"
                                        : new Date(course.endDate).toLocaleDateString()}
                                    )
                                </Typography>
                                <Typography variant="body2">
                                    {course.location} (
                                    {course.isOnline ? "Online" : "On-site"})
                                </Typography>
                                <Typography variant="body2">
                                    {course.description}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}

                {resumeInfo?.project?.length > 0 && (
                    <Box>
                        <Typography variant="h6" color="secondary">
                            Projects
                        </Typography>
                        <Divider />
                        {resumeInfo.project.map((project, index) => (
                            <Box key={index} mb={1}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    {project.projectName}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    ( {new Date(project.startDate).toLocaleDateString()} -{" "}
                                    {project.isCurrent
                                        ? "Present"
                                        : new Date(project.endDate).toLocaleDateString()}
                                    )
                                </Typography>
                                <Typography variant="body2" mt={1}>
                                    {project.description}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}

                {resumeInfo?.skills?.length > 0 && (
                    <Box>
                        <Typography variant="h6" color="secondary">
                            Skills
                        </Typography>
                        <Divider />
                        <Typography variant="body2">
                            {resumeInfo.skills.map((skill) => skill.skill).join(", ")}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Paper>
    )
}

export default ViewResume