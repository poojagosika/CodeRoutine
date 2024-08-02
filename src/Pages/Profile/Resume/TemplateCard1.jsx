import React from "react";
import {
    Box,
    Typography,
    Divider,
    Grid,
    Button,
    IconButton,
    Link as MuiLink,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const TemplateCard1 = ({ user }) => {
    const handlePrint = (areaId) => {
        const printContents = document.getElementById(areaId).innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const options = { year: "numeric", month: "long" };
        return d.toLocaleDateString("en-US", options);
    };

    return (
        <>
            <style>
                {`
            @media print {
                body * {
                    visibility: hidden;
                }
                #printableTemplateCard1, #printableTemplateCard1 * {
                    visibility: visible;
                }
                #printableTemplateCard1 {
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                }
            @media print {
                body {
                -webkit-print-color-adjust: exact;
                }
                .resume-header {
                background-color: #004275 !important;
                color: #ffffff !important;
                }
                .resume-section-title {
                color: #004275 !important;
                }
            }
            `}
            </style>
            <Box
                sx={{
                    backgroundColor: "#f4f4f4",
                    padding: "20px",
                    maxWidth: "800px",
                    margin: "auto",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Box id="printableTemplateCard1">
                    <Box
                        className="resume-header"
                        sx={{
                            backgroundColor: "#004275",
                            color: "#ffffff",
                            padding: "20px",
                            textAlign: "center",
                            borderRadius: "8px 8px 0 0",
                        }}
                    >
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {user?.profile?.firstName} {user?.profile?.lastName}
                        </Typography>
                        <Typography variant="subtitle1">{user?.profile?.headline}</Typography>
                    </Box>

                    <Box sx={{ padding: "20px", backgroundColor: "#ffffff" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Typography
                                    className="resume-section-title"
                                    variant="h6"
                                    sx={{ fontWeight: 700, color: "#004275" }}
                                >
                                    Contact
                                </Typography>
                                <Divider />
                                <Typography variant="body1">{user?.email}</Typography>
                                <Typography variant="body1">
                                    {user?.profile?.city}, {user?.profile?.country}
                                </Typography>
                                <Box mt={1}>
                                    <IconButton>
                                        <EmailIcon />
                                    </IconButton>
                                    <IconButton
                                        component={MuiLink}
                                        href={user?.socialLinks?.linkedin}
                                        target="_blank"
                                    >
                                        <LinkedInIcon />
                                    </IconButton>
                                    <IconButton
                                        component={MuiLink}
                                        href={user?.socialLinks?.github}
                                        target="_blank"
                                    >
                                        <GitHubIcon />
                                    </IconButton>
                                </Box>
                            </Grid>

                            <Grid item xs={8}>
                                <Typography
                                    className="resume-section-title"
                                    variant="h6"
                                    sx={{ fontWeight: 700, color: "#004275" }}
                                >
                                    Work Experience
                                </Typography>
                                <Divider />
                                {user?.experience.map((exp, index) => (
                                    <Box key={index} mt={2}>
                                        <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                            {exp?.title} at {exp?.company}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                            {formatDate(exp?.startDate)} -{" "}
                                            {exp?.isCurrent ? "Present" : formatDate(exp?.endDate)}
                                        </Typography>
                                        <Typography variant="body2">{exp?.description}</Typography>
                                    </Box>
                                ))}
                            </Grid>

                            <Grid item xs={12}>
                                <Typography
                                    className="resume-section-title"
                                    variant="h6"
                                    sx={{ fontWeight: 700, color: "#004275" }}
                                >
                                    Education
                                </Typography>
                                <Divider />
                                {user?.education.map((edu, index) => (
                                    <Box key={index} mt={2}>
                                        <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                            {edu?.institution}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                            {edu?.degree} in {edu?.fieldOfStudy} ({edu?.grade} | CGPA:{" "}
                                            {edu?.cgpa})
                                        </Typography>
                                        <Typography variant="body2">{edu?.activities}</Typography>
                                    </Box>
                                ))}
                            </Grid>

                            <Grid item xs={12}>
                                <Typography
                                    className="resume-section-title"
                                    variant="h6"
                                    sx={{ fontWeight: 700, color: "#004275" }}
                                >
                                    Training & Courses
                                </Typography>
                                <Divider />
                                {user?.training.map((course, index) => (
                                    <Box key={index} mt={2}>
                                        <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                            {course?.courseName}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                            {formatDate(course?.startDate)} - {formatDate(course?.endDate)}
                                        </Typography>
                                        <Typography variant="body2">{course?.description}</Typography>
                                    </Box>
                                ))}
                            </Grid>

                            <Grid item xs={12}>
                                <Typography
                                    className="resume-section-title"
                                    variant="h6"
                                    sx={{ fontWeight: 700, color: "#004275" }}
                                >
                                    Projects
                                </Typography>
                                <Divider />
                                {user?.project.map((proj, index) => (
                                    <Box key={index} mt={2}>
                                        <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                            <MuiLink href={proj?.projectLink} target="_blank">
                                                {proj?.projectName}
                                            </MuiLink>
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                            {formatDate(proj?.startDate)} - {formatDate(proj?.endDate)}
                                        </Typography>
                                        <Typography variant="body2">{proj?.description}</Typography>
                                    </Box>
                                ))}
                            </Grid>

                            <Grid item xs={12}>
                                <Typography
                                    className="resume-section-title"
                                    variant="h6"
                                    sx={{ fontWeight: 700, color: "#004275" }}
                                >
                                    Skills
                                </Typography>
                                <Divider />
                                <Box mt={1}>
                                    <Typography variant="body2">
                                        {user?.skills.map((skill) => skill?.skill).join(", ")}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handlePrint("printableTemplateCard1")}
                    sx={{ marginTop: "20px" }}
                >
                    View Resume
                </Button>
            </Box>
        </>
    );
};

export default TemplateCard1;
