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

  return (
    <Card>
      <CardContent>
        <Box ref={resumeRef} p={1}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3" sx={{ fontWeight: 700, color: "#004275" }}>
              {user?.profile?.firstName} {user?.profile?.lastName}
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
                <IconButton size="small" sx={{ color: "text.secondary" }}>
                  <EmailIcon fontSize="small" />
                </IconButton>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ color: "text.secondary" }}
                >
                  {user?.email}
                </Typography>
              </Link>

              <Link
                to={user?.socialLinks?.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
                variant="body2"
              >
                <IconButton size="small" sx={{ color: "text.secondary" }}>
                  <GitHub fontSize="small" />
                </IconButton>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ color: "text.secondary" }}
                >
                  GitHub
                </Typography>
              </Link>

              <Link
                to={user?.socialLinks?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "text.secondary" }}
                variant="body2"
              >
                <IconButton size="small" sx={{ color: "text.secondary" }}>
                  <LinkedIn fontSize="small" />
                </IconButton>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ color: "text.secondary" }}
                >
                  LinkedIn
                </Typography>
              </Link>

              <Typography
                variant="body2"
                component="span"
                sx={{ color: "text.secondary" }}
              >
                <IconButton size="small" sx={{ color: "text.secondary" }}>
                  <LocationOnIcon fontSize="small" />
                </IconButton>
                {user?.profile?.city}, {user?.profile?.country}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Typography
            variant="body1"
            textAlign="center"
            component="p"
            sx={{ my: 1 }}
          >
            <i>{user?.profile?.headline}</i>
          </Typography>
          <Grid container gap={1}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#004275" }}
                component="h2"
              >
                Experience
              </Typography>
              <Divider />
              {user.experience.map((exp, index) => (
                <Box key={index}>
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {exp?.title} at {exp?.company}
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(exp?.startDate)} -{" "}
                      {exp?.isCurrent ? "Present" : formatDate(exp?.endDate)}
                    </Typography>
                  </Box>
                  <Typography variant="body2">{exp?.description}</Typography>
                </Box>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#004275" }}
                component="h2"
              >
                Education
              </Typography>
              <Divider />
              {user.education.map((edu, index) => (
                <Box key={index}>
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {edu?.institution}
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(edu?.startDate)} - {formatDate(edu?.endDate)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {edu?.degree} in {edu?.fieldOfStudy} {"("}Grade:{" "}
                    {edu?.grade} | CGPA: {edu?.cgpa}
                    {")"}
                  </Typography>
                  <Typography variant="body2">{edu?.activities}</Typography>
                </Box>
              ))}
            </Grid>
            {/* Training & Courses Section */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#004275" }}
                component="h2"
              >
                Training & Courses
              </Typography>
              <Divider />
              {user.training.map((course, index) => (
                <Box key={index}>
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {course?.courseName}
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(course?.startDate)} -{" "}
                      {formatDate(course?.endDate)}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {course?.organization} {"("}
                    {course?.location}
                    {")"}
                  </Typography>
                  <Typography variant="body2">{course?.description}</Typography>
                </Box>
              ))}
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#004275" }}
                component="h2"
              >
                Projects
              </Typography>
              <Divider />
              {user.project.map((proj, index) => (
                <Box key={index}>
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      <Link
                        to={proj?.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {proj?.projectName}
                      </Link>
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(proj?.startDate)} -{" "}
                      {formatDate(proj?.endDate)}
                    </Typography>
                  </Box>
                  <Typography variant="body2">{proj?.description}</Typography>
                </Box>
              ))}
            </Grid>

            {/* Skills Section */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#004275" }}
                component="h2"
              >
                Skills
              </Typography>
              <Divider />
              <Box sx={{ display: "flex", mt: 1 }}>
                <Typography variant="body2">
                  {user.skills.map((skill) => skill?.skill).join(", ")}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            handleView(user?.profile?.firstName + user?.profile?.lastName)
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
