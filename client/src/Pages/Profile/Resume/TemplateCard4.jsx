import React from "react";
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
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import { LinkedIn, GitHub } from "@mui/icons-material";
import { formatDate, formatDateWithYearMonth } from "../config";

const TemplateCard4 = ({ user }) => {
  const handlePrint = (areaId) => {
    const printContents = document.getElementById(areaId).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload to restore the original state
  };

  return (
    <Card
      sx={{
        backgroundColor: "#f4f4f4",
        padding: "10px",
        maxWidth: "800px",
        margin: "auto",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <div id="printableTemplateCard4">
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px 8px 0 0",
            }}
          >
            {user?.profile && (
              <>
                <Box textAlign="center">
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
                  <Typography variant="body2" sx={{ my: 1 }}>
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
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="subtitle2" fontWeight="bold">
                          {exp.title}
                          {" - "}
                          {exp.company}
                        </Typography>
                        <Typography variant="body2">
                          <i>
                            {formatDate(exp?.startDate)} -{" "}
                            {exp.isCurrent
                              ? "Present"
                              : formatDate(exp.endDate)}
                          </i>
                        </Typography>
                      </Box>
                      <Typography variant="body2" component="div">
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
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="subtitle2" fontWeight="bold">
                          {edu.institution}
                        </Typography>
                        <Typography variant="body2">
                          <i>
                            {formatDate(edu?.startDate)} -{" "}
                            {edu.isCurrent
                              ? "Present"
                              : formatDate(edu.endDate)}
                          </i>
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {edu.degree} in {edu.fieldOfStudy} (Grade: {edu.grade} |
                        CGPA: {edu.cgpa})
                      </Typography>
                      <Typography variant="body2" component="div">
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
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="subtitle2" fontWeight="bold">
                          {course.courseName}
                        </Typography>
                        <Typography variant="body2">
                          <i>
                            {formatDate(course?.startDate)} -{" "}
                            {course.isCurrent
                              ? "Present"
                              : formatDate(course.endDate)}
                          </i>
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {course.organization} ({course.location})
                      </Typography>
                      <Typography variant="body2" component="div">
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
                      <Box display="flex" justifyContent="space-between">
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
                        <Typography variant="body2">
                          <i>
                            {formatDate(proj?.startDate)} -{" "}
                            {proj.isCurrent
                              ? "Present"
                              : formatDate(proj.endDate)}
                          </i>
                        </Typography>
                      </Box>
                      <Typography variant="body2" component="div">
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
        </div>
        <style>
          {`
            @media print {
              body * {
                visibility: hidden;
              }
              #printableTemplateCard3, #printableTemplateCard3 * {
                visibility: visible;
              }
              #printableTemplateCard3 {
                position: absolute;
                  left: 0;
                  top: 0;
              }
            }
          `}
        </style>
        <Box mt={2}>
          <Button
            variant="contained"
            onClick={() => handlePrint("printableTemplateCard4")}
          >
            View Resume
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TemplateCard4;
