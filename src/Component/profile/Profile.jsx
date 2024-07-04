import React from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Avatar,
  IconButton,
  Link,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

const user = {
  firstName: "John",
  lastName: "Doe",
  collegeName: "XYZ University",
  companyName: "ABC Corp",
  website: "https://johndoe.com",
  socialAddresses: {
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    twitter: "https://twitter.com/johndoe",
  },
  languages: ["Python", "JavaScript", "Java"],
  skills: {
    advanced: ["Data Structures", "Algorithms"],
    intermediate: ["System Design", "Databases"],
    fundamental: ["OOP", "Version Control"],
  },
};

const Profile = () => {
  return (
    <Box mt={4} p={3}>
      <Container maxWidth="md" boxShadow={3} border={1} borderRadius={8}>
        <Typography variant="h4" mb={3}>My Profile</Typography>
        <Grid container spacing={3} alignItems="center">
          {/* Left Side: Avatar */}
          <Grid item>
            <Avatar
              alt={`${user.firstName} ${user.lastName}`}
              src="/path-to-image.jpg"
              sx={{ width: 120, height: 120 }}
            />
          </Grid>
          {/* Right Side: User Information */}
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              {/* First Name and Last Name */}
              <Grid item container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    defaultValue={user.firstName}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    defaultValue={user.lastName}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
              {/* College Name and Company Name */}
              <Grid item container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="College Name"
                    defaultValue={user.collegeName}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    defaultValue={user.companyName}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
              {/* Social Icons */}
              <Grid item container spacing={2}>
                <Grid item>
                  <Link
                    href={user.socialAddresses.linkedin}
                    target="_blank"
                    rel="noopener"
                  >
                    <IconButton>
                      <LinkedInIcon />
                    </IconButton>
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href={user.socialAddresses.github}
                    target="_blank"
                    rel="noopener"
                  >
                    <IconButton>
                      <GitHubIcon />
                    </IconButton>
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href={user.socialAddresses.twitter}
                    target="_blank"
                    rel="noopener"
                  >
                    <IconButton>
                      <TwitterIcon />
                    </IconButton>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Additional Information */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Additional Information
            </Typography>
            <Box mt={2} />

            {/* Other Fields */}
            <TextField
              fullWidth
              label="Website"
              defaultValue={user.website}
              variant="outlined"
              spacing={2}
              size="small"
            />
            <Box mt={2} />
            <TextField
              fullWidth
              label="Languages"
              defaultValue={user.languages.join(", ")}
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Skills
            </Typography>
            <Box mt={2} />

            {/* Other Fields */}
            <TextField
              fullWidth
              label="Advanced"
              defaultValue={user.skills.advanced.join(", ")}
              variant="outlined"
              spacing={2}
              size="small"
            />
            <Box mt={2} />
            <TextField
              fullWidth
              label="Intermediate"
              defaultValue={user.skills.intermediate.join(", ")}
              variant="outlined"
              size="small"
            />
            <Box mt={2} />
            <TextField
              fullWidth
              label="Fundamental"
              defaultValue={user.skills.fundamental.join(", ")}
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
