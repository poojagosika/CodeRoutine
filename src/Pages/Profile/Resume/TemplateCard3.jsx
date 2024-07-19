import React, { useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Divider,
} from "@mui/material";
import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import {
  LinkedIn,
  GitHub,
  X,
  Language,
  Public,
  AccountCircle,
} from "@mui/icons-material";

const TemplateCard3 = ({ user }) => {
  const resumeRef = useRef();

  const handleView = async (resume) => {
    const { default: pdfFonts } = await import("pdfmake/build/vfs_fonts");
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const resumeContent = resumeRef.current.innerHTML;
    const pdfContent = htmlToPdfmake(resumeContent);
    const documentDefinition = { content: pdfContent };
    pdfMake.createPdf(documentDefinition).open();
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getDomainName = (url) => {
    const { hostname } = new URL(url);
    return hostname.replace("www.", "");
  };

  return (
    <Card>
      <CardContent>
        <Box ref={resumeRef} p={1}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3" sx={{ fontWeight: 700, color: "#004275" }}>
              {user.profile.firstName} {user.profile.lastName}
            </Typography>
            <Typography
              variant="body2"
              display="flex"
              alignItems="center"
              m={1}
              gap={0.5}
            >
              <EmailIcon fontSize="small" sx={{ color: "text.secondary" }} />
              {user.email}
              <GitHub fontSize="small" sx={{ color: "text.secondary" }} />
              <a
                href={user.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {getDomainName(user.socialLinks.github)}
              </a>
              <LinkedIn fontSize="small" sx={{ color: "text.secondary" }} />
              <a
                href={user.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {getDomainName(user.socialLinks.linkedin)}
              </a>
              <LocationOnIcon
                fontSize="small"
                sx={{ color: "text.secondary" }}
              />
              {user.profile.city}
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body1" textAlign="center">
            <i>{user.profile.headline}</i>
          </Typography>
          <Box container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#004275" }}
              >
                Experience
              </Typography>
              <Divider />
              {user.experience.map((exp, index) => (
                <Box key={index}>
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {exp.title} at {exp.company}
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(exp.startDate)} -{" "}
                      {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" mb={1}>
                    {exp.description}
                  </Typography>
                </Box>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#004275" }}
              >
                Education
              </Typography>
              <Divider />

              {user.education.map((edu, index) => (
                <Box key={index}>
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {edu.institution}
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {edu.degree} in {edu.fieldOfStudy} {"("}Grade: {edu.grade} |
                    CGPA: {edu.cgpa}
                    {")"}
                  </Typography>
                  <Typography variant="body2">{edu.activities}</Typography>
                </Box>
              ))}
            </Grid>
            {/* Training & Courses Section */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#004275" }}
                mt={1}
              >
                Training & Courses
              </Typography>
              <Divider />
              {user.training.map((course, index) => (
                <Box key={index} mb={1}>
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {course.courseName}
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(course.startDate)} -{" "}
                      {formatDate(course.endDate)}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {course.organization} {"("}
                    {course.location}
                    {")"}
                  </Typography>
                  <Typography variant="body2">{course.description}</Typography>
                </Box>
              ))}
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#004275" }}
              >
                Projects
              </Typography>
              <Divider />
              {user.project.map((proj, index) => (
                <Box key={index}>
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      <Link
                        href={proj.projectLink}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {proj.projectName}
                      </Link>
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(proj.startDate)} - {formatDate(proj.endDate)}
                    </Typography>
                  </Box>
                  <Typography variant="body2">{proj.description}</Typography>
                </Box>
              ))}
            </Grid>

            {/* Skills Section */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#004275" }}
                mt={1}
              >
                Skills
              </Typography>
              <Divider />
              <Box sx={{ display: "flex", mt: 1 }}>
                <Typography variant="body2">
                  {user.skills.map((skill) => skill.skill).join(", ")}
                </Typography>
              </Box>
            </Grid>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            handleView(user.profile.firstName + user.profile.lastName)
          }
          sx={{ marginTop: "20px" }}
        >
          View Resume
        </Button>
      </CardContent>
    </Card>
  );
};

export default TemplateCard3;
