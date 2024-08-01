import React, { useRef } from "react";
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
import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import { LinkedIn, GitHub } from "@mui/icons-material";
import { formatDate } from "../config";

const TemplateCard4 = ({ user }) => {
  const resumeRef = useRef();

  const handleView = async () => {
    const { default: pdfFonts } = await import("pdfmake/build/vfs_fonts");
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const resumeContent = resumeRef.current.innerHTML;
    const pdfContent = htmlToPdfmake(resumeContent);
    const documentDefinition = { content: pdfContent };
    pdfMake.createPdf(documentDefinition).open();
  };

  return (
    <Card>
      <CardContent>
        <Box ref={resumeRef} padding={1}>
          {user?.profile && (
            <>
              <Box textAlign="center" mb={1}>
                <Typography variant="h3" fontWeight="bold" color="primary">
                  {user.profile.firstName} {user.profile.lastName}
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  m={1}
                  gap={1}
                  justifyContent="center"
                >
                  <Link
                    to={`mailto:${user?.email}`}
                    style={{
                      color: "inherit",
                      display: "flex",
                      alignItems: "center",
                      textDecoration: "none",
                    }}
                  >
                    <IconButton size="small" color="textSecondary">
                      <EmailIcon fontSize="small" />
                    </IconButton>
                    <Typography
                      variant="body2"
                      component="span"
                      color="textSecondary"
                    >
                      {user?.email}
                    </Typography>
                  </Link>

                  <Link
                    to={user?.socialLinks?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <IconButton size="small" color="textSecondary">
                      <GitHub fontSize="small" />
                    </IconButton>
                    <Typography
                      variant="body2"
                      component="span"
                      color="textSecondary"
                    >
                      GitHub
                    </Typography>
                  </Link>

                  <Link
                    to={user?.socialLinks?.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <IconButton size="small" color="textSecondary">
                      <LinkedIn fontSize="small" />
                    </IconButton>
                    <Typography
                      variant="body2"
                      component="span"
                      color="textSecondary"
                    >
                      LinkedIn
                    </Typography>
                  </Link>

                  <Typography
                    variant="body2"
                    component="span"
                    color="textSecondary"
                  >
                    <IconButton size="small" color="textSecondary">
                      <LocationOnIcon fontSize="small" />
                    </IconButton>
                    {user?.profile?.city}
                    {user?.profile?.city && user?.profile?.country && ", "}
                    {user?.profile?.country}
                  </Typography>
                </Box>

                <Divider />
                <Typography variant="subtitle1" color="textSecondary" mt={1}>
                  <i>{user.profile.headline}</i>
                </Typography>
              </Box>
            </>
          )}
          <Grid container spacing={1}>
            {user?.experience?.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  Experience
                </Typography>
                <Divider />
                {user.experience.map((exp, index) => (
                  <Box key={index} mt={1}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {exp.company}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {exp.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {formatDate(exp?.startDate)} -{" "}
                      {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                    </Typography>
                    <Typography variant="body2" component="div" mt={1}>
                      <ul style={{ margin: 0, paddingLeft: "20px" }}>
                        <li>{exp.description}</li>
                      </ul>
                    </Typography>
                  </Box>
                ))}
              </Grid>
            )}
            {user?.education?.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  Education
                </Typography>
                <Divider />
                {user.education.map((edu, index) => (
                  <Box key={index} mt={1}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {edu.institution}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </Typography>
                    <Typography variant="body2">
                      {edu.degree} in {edu.fieldOfStudy} (Grade: {edu.grade} |
                      CGPA: {edu.cgpa})
                    </Typography>
                    <Typography variant="body2" component="div" mt={1}>
                      <ul style={{ margin: 0, paddingLeft: "20px" }}>
                        <li>{edu.activities}</li>
                      </ul>
                    </Typography>
                  </Box>
                ))}
              </Grid>
            )}
            {user?.training?.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  Training & Courses
                </Typography>
                <Divider />
                {user.training.map((course, index) => (
                  <Box key={index} mt={1}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {course.courseName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {formatDate(course.startDate)} -{" "}
                      {formatDate(course.endDate)}
                    </Typography>
                    <Typography variant="body2">
                      {course.organization} ({course.location})
                    </Typography>
                    <Typography variant="body2" component="div" mt={1}>
                      <ul style={{ margin: 0, paddingLeft: "20px" }}>
                        <li>{course.description}</li>
                      </ul>
                    </Typography>
                  </Box>
                ))}
              </Grid>
            )}
            {user?.project?.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  Projects
                </Typography>
                <Divider />
                {user.project.map((proj, index) => (
                  <Box key={index} mt={1}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      <Link
                        to={proj.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {proj.projectName}
                      </Link>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {formatDate(proj.startDate)} - {formatDate(proj.endDate)}
                    </Typography>
                    <Typography variant="body2" component="div" mt={1}>
                      <ul style={{ margin: 0, paddingLeft: "20px" }}>
                        <li>{proj.description}</li>
                      </ul>
                    </Typography>
                  </Box>
                ))}
              </Grid>
            )}
            {user?.skills?.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  Skills
                </Typography>
                <Divider />
                <Box mt={1}>
                  <Typography variant="body2">
                    {user.skills.map((skill) => skill.skill).join(", ")}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
        <Box mt={2}>
          <Button variant="contained" onClick={handleView}>
            View Resume
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TemplateCard4;
