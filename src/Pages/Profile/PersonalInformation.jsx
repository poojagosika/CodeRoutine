import React, { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import WorkIcon from "@mui/icons-material/Work";
import getCuteAvatar from "../../Config/getCuteAvatar";

const PersonalInformation = ({ profile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [personalInformation, setPersonalInformation] = useState({
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    headline: profile?.headline || "",
    currentPosition: profile?.currentPosition || "",
    education: profile?.education || "",
    city: profile?.city || "",
    gender: profile?.gender || "",
    country: profile?.country || "",
  });

  const [tempPersonalInformation, setTempPersonalInformation] = useState(personalInformation);
  const [formUpdated, setFormUpdated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const toggleEditing = () => {
    setTempPersonalInformation(personalInformation);
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTempPersonalInformation((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  const handleGenderChange = (gender) => {
    setTempPersonalInformation((prevInfo) => ({
      ...prevInfo,
      gender: gender,
    }));
  };

  const handleSave = () => {
    setPersonalInformation(tempPersonalInformation);
    setFormUpdated(true);
    toggleEditing();
  };

  const handleCancel = () => {
    console.log("Canceling changes");
    toggleEditing();
  };

  const formatAddress = ({ city, country }) => {
    return [city, country].filter(Boolean).join(", ");
  };

  return (
    <>
      <Grid item xs={12}>
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          justifyContent={"space-between"}
        >
          <Avatar
            src={getCuteAvatar(userProfile?.userName)}
            alt={userProfile?.profile?.firstName}
            sx={{ width: 150, height: 150, marginTop: "-130px" }}
          />
          <IconButton color="primary" onClick={toggleEditing}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      </Grid>

      <Dialog open={isEditing} onClose={handleCancel} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography variant="h5">Personal Information</Typography>
            <IconButton color="secondary" onClick={handleCancel}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography mb={2}>First Name</Typography>
              <TextField
                id="firstName"
                variant="outlined"
                value={tempPersonalInformation.firstName}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography mb={2}>Last Name</Typography>
              <TextField
                id="lastName"
                variant="outlined"
                value={tempPersonalInformation.lastName}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography mb={2}>Gender</Typography>
              <Box display="flex" gap={2} mb={2}>
                {["👦🏻 Male", "👧🏻 Female", "💫 Other"].map((gender) => (
                  <Button
                    key={gender}
                    variant={
                      tempPersonalInformation.gender === gender
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() => handleGenderChange(gender)}
                  >
                    {gender}
                  </Button>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography mb={2}>Headline (max 220 characters)</Typography>
              <TextField
                id="headline"
                variant="outlined"
                multiline
                fullWidth
                minRows={2}
                maxRows={10}
                inputProps={{ maxLength: 220 }}
                value={tempPersonalInformation.headline}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography mb={2}>Current Position</Typography>
              <TextField
                id="currentPosition"
                variant="outlined"
                value={tempPersonalInformation.currentPosition}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography mb={2}>Education</Typography>
              <TextField
                id="education"
                select
                variant="outlined"
                value={tempPersonalInformation.education}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              >
                <MenuItem value="UG">UG</MenuItem>
                <MenuItem value="12th">12th</MenuItem>
                <MenuItem value="10th">10th</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography mb={2}>Country/Region</Typography>
              <TextField
                id="country"
                variant="outlined"
                value={tempPersonalInformation.country}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography mb={2}>City</Typography>
              <TextField
                id="city"
                variant="outlined"
                value={tempPersonalInformation.city}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ m: 2 }}>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={1} mt={2}>
        <Grid item xs={12} sm={8}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            spacing={1}
            gap={1}
          >
            <Box display="flex" alignItems="center">
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {personalInformation?.firstName} {personalInformation?.lastName}
              </Typography>
              {personalInformation.gender === "👦🏻 Male" && <span>👦🏻</span>}
              {personalInformation.gender === "👧🏻 Female" && <span>👧🏻</span>}
            </Box>
            <Typography variant="body1">
              {personalInformation.headline}
            </Typography>
            <Typography variant="body2">
              {formatAddress(personalInformation)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Typography
              variant="body1"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              textAlign={"center"}
            >
              {formUpdated && personalInformation.currentPosition && (
                <WorkIcon sx={{ mr: 1 }} />
              )}
              {personalInformation.currentPosition}
            </Typography>
            <Typography variant="body1">
              {personalInformation.education}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default PersonalInformation;
