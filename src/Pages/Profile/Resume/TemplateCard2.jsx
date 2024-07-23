import React, { useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Link,
  Divider,
  Tooltip, // Import Divider
} from "@mui/material";
import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";

import {
  LinkedIn,
  GitHub,
  X,
  Language,
  Public,
  AccountCircle,
} from "@mui/icons-material";

import IconButton from "@mui/material/IconButton";
import WebIcon from "@mui/icons-material/Web";
import RssFeedIcon from "@mui/icons-material/RssFeed";

const TemplateCard2 = ({ user }) => {
  const resumeRef = useRef();

  const handleView = async () => {
    const { default: pdfFonts } = await import("pdfmake/build/vfs_fonts");
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const resumeContent = resumeRef.current.innerHTML;
    const pdfContent = htmlToPdfmake(resumeContent);
    const documentDefinition = { content: pdfContent };
    pdfMake.createPdf(documentDefinition).open();
  };

  console.log(user);
  const hasSocialLinks = (socialLinks) => {
    if (!socialLinks) return false;
    const { linkedin, github, x, blog, portfolio, additional } = socialLinks;
    return (
      linkedin ||
      github ||
      x ||
      blog ||
      portfolio ||
      (additional && additional.length > 0)
    );
  };

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
    <Card>
      <CardContent>
        <div ref={resumeRef}>
          {hasPersonalInformation(user?.profile) && (
            <Box>
              <Typography variant="h4" gutterBottom textAlign={"center"}>
                {user.profile.firstName} {user.profile.lastName}
              </Typography>
              <Box display={"flex"} justifyContent={"center"} gap={1}>
                <Typography variant="body1">
                  {user.profile.city}
                  {user.profile.city && user.profile.country && ", "}
                  {user.profile.country}
                </Typography>
                <Typography variant="body1">{user.email}</Typography>
              </Box>

              <Typography variant="h6" style={{ color: "red" }}>
                Summary
              </Typography>
              <Divider style={{ margin: "10px 0" }} />

              <Typography variant="body1">{user.profile.headline}</Typography>
            </Box>
          )}
          {user?.experience?.length > 0 && (
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid item xs={12}>
                <Typography variant="h6" style={{ color: "red" }}>
                  {" "}
                  {/* Set color to red */}
                  Experience
                </Typography>
                <Divider style={{ margin: "10px 0" }} /> {/* Add Divider */}
                {user.experience.map((exp, index) => (
                  <div key={index}>
                    <Typography variant="subtitle2">
                      {exp.title} at {exp.company}
                      <span variant="body2">
                        ({new Date(exp.startDate).toLocaleDateString()} -{" "}
                        {exp.isCurrent
                          ? "Present"
                          : new Date(exp.endDate).toLocaleDateString()}
                        )
                      </span>
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
                  </div>
                ))}
              </Grid>
            </Grid>
          )}

          {user?.education?.length > 0 && (
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid item xs={12}>
                <Typography variant="h6" style={{ color: "red" }}>
                  Education
                </Typography>
                <Divider style={{ margin: "10px 0" }} />
                {user.education.map((edu, index) => (
                  <div key={index}>
                    <Typography variant="subtitle2">
                      {edu.degree} in {edu.fieldOfStudy}
                      <span variant="body2">
                        ({new Date(edu.startDate).toLocaleDateString()} -{" "}
                        {edu.isCurrent
                          ? "Present"
                          : new Date(edu.endDate).toLocaleDateString()}
                        )
                      </span>
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
                  </div>
                ))}
              </Grid>
            </Grid>
          )}

          {/* Training Courses Section */}
          {user?.training?.length > 0 && (
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid item xs={12}>
                <Typography variant="h6" style={{ color: "red" }}>
                  {" "}
                  {/* Set color to red */}
                  Training Courses
                </Typography>
                <Divider style={{ margin: "10px 0" }} /> {/* Add Divider */}
                {user.training.map((course, index) => (
                  <div key={index}>
                    <Typography variant="subtitle2">
                      {course.courseName} at {course.organization}
                      <span variant="body2">
                        ( {new Date(course.startDate).toLocaleDateString()} -{" "}
                        {course.isCurrent
                          ? "Present"
                          : new Date(course.endDate).toLocaleDateString()}
                        )
                      </span>
                    </Typography>
                    <Typography variant="body2">
                      {course.location} (
                      {course.isOnline ? "Online" : "On-site"})
                    </Typography>

                    <Typography variant="body2">
                      {course.description}
                    </Typography>
                  </div>
                ))}
              </Grid>
            </Grid>
          )}

          {/* Projects Section */}
          {user?.project?.length > 0 && (
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid item xs={12}>
                <Typography variant="h6" style={{ color: "red" }}>
                  {" "}
                  {/* Set color to red */}
                  Projects
                </Typography>
                <Divider style={{ margin: "10px 0" }} /> {/* Add Divider */}
                {user.project.map((project, index) => (
                  <div key={index}>
                    <Typography variant="subtitle2">
                      {project.projectName}
                      <span variant="body2">
                        ( {new Date(project.startDate).toLocaleDateString()} -{" "}
                        {project.isCurrent
                          ? "Present"
                          : new Date(project.endDate).toLocaleDateString()}
                        )
                      </span>
                    </Typography>
                    {project.projectLink && (
                      <Typography variant="body2">
                        <Link
                          href={project.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.projectLink}
                        </Link>
                      </Typography>
                    )}

                    <Typography variant="body2">
                      {project.description}
                    </Typography>
                  </div>
                ))}
              </Grid>
            </Grid>
          )}

          {/* Skills Section */}
          {user?.skills?.length > 0 && (
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#004275" }}
                  mt={1}
                  style={{ color: "red" }}
                >
                  Skills
                </Typography>
                <Divider style={{ margin: "10px 0" }} /> {/* Add Divider */}
                <Box sx={{ display: "flex", mt: 1 }}>
                  <Typography variant="body2">
                    {user.skills.map((skill) => skill.skill).join(", ")}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}

          {hasSocialLinks(user?.socialLinks) && (
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#004275" }}
                  mt={1}
                  style={{ color: "red" }}
                >
                  Social Links
                </Typography>
                <Divider style={{ margin: "10px 0" }} /> {/* Add Divider */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  {user.socialLinks?.linkedin && (
                    <IconButton
                      component="a"
                      href={user.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      title="LinkedIn"
                    >
                      <LinkedIn color="primary" />
                    </IconButton>
                  )}
                  {user.socialLinks?.github && (
                    <IconButton
                      component="a"
                      href={user.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      title="GitHub"
                    >
                      <GitHub color="primary" />
                    </IconButton>
                  )}
                  {user.socialLinks?.x && (
                    <IconButton
                      component="a"
                      href={user.socialLinks.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="X"
                      title="X"
                    >
                      <X color="primary" />
                    </IconButton>
                  )}
                  {user.socialLinks?.portfolio && (
                    <IconButton
                      component="a"
                      href={user.socialLinks.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Portfolio"
                      title="Portfolio"
                    >
                      <AccountCircle color="primary" />
                    </IconButton>
                  )}
                  {user.socialLinks?.blog && (
                    <IconButton
                      component="a"
                      href={user.socialLinks.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Blog"
                      title="Blog"
                    >
                      <Public color="primary" />
                    </IconButton>
                  )}
                  <span>
                    {user.socialLinks.additional
                      .filter((add) => add) // Filters out empty strings
                      .map((add, index) => (
                        <Tooltip
                          title={`Work Sample ${index + 1}`}
                          key={index}
                          arrow
                          style={{ padding: "10px" }}
                        >
                          <Link
                            href={add}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="inherit"
                          >
                            <Language
                              color="primary"
                              style={{ marginTop: "8px" }}
                            />
                          </Link>
                        </Tooltip>
                      ))}
                  </span>
                </Box>
              </Grid>
            </Grid>
          )}
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleView}
          style={{ marginTop: "20px" }}
        >
          View as PDF
        </Button>
      </CardContent>
    </Card>
  );
};

export default TemplateCard2;
