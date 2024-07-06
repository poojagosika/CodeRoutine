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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import ManSharpIcon from "@mui/icons-material/ManSharp";
import Woman2SharpIcon from "@mui/icons-material/Woman2Sharp";
import OtherGenderIcon from "@mui/icons-material/Person";

const PersonalInformation = ({ profile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [personalInformation, setPersonalInformation] = useState({
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    address: profile?.address || "",
    city: profile?.city || "",
    state: profile?.state || "",
    zip: profile?.zip || "",
    gender: profile?.gender || "",
    country: profile?.country || "",
  });
  const [tempPersonalInformation, setTempPersonalInformation] =
    useState(personalInformation);

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
    console.log("Saving changes:", tempPersonalInformation);
    toggleEditing();
  };

  const handleCancel = () => {
    console.log("Canceling changes");
    toggleEditing();
  };

  const genderIcon = () => {
    switch (tempPersonalInformation.gender) {
      case "Male":
        return <ManSharpIcon />;
      case "Female":
        return <Woman2SharpIcon />;
      case "Other":
        return <OtherGenderIcon />;
      default:
        return null;
    }
  };

  const formatAddress = ({ address, city, state, country, zip }) => {
    return [address, city, state, country, zip].filter(Boolean).join(", ");
  };
  return (
    <>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h5" gutterBottom>
            Personal Information
          </Typography>
          <IconButton color="primary" onClick={toggleEditing}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      </Grid>
      <Dialog open={isEditing} onClose={handleCancel} fullWidth maxWidth="sm">
        <DialogTitle display={"flex"} justifyContent={"space-between"}>
          Personal Information
          <Button color="secondary" onClick={handleCancel}>
            <CloseIcon />
          </Button>
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
              <Typography mb={2}>Email</Typography>
              <TextField
                id="email"
                variant="outlined"
                value={tempPersonalInformation.email}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography mb={2}>Phone Number</Typography>
              <TextField
                id="phone"
                variant="outlined"
                value={tempPersonalInformation.phone}
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
              <Typography mb={2}>Address</Typography>
              <TextField
                id="address"
                variant="outlined"
                value={tempPersonalInformation.address}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
              <Typography mb={2}>State</Typography>
              <TextField
                id="state"
                variant="outlined"
                value={tempPersonalInformation.state}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography mb={2}>Country</Typography>
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
            <Grid item xs={12} sm={4}>
              <Typography mb={2}>Zip</Typography>
              <TextField
                id="zip"
                variant="outlined"
                value={tempPersonalInformation.zip}
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
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={1} marginLeft={1}>
        <Grid item xs={12} sm={6}>
          <Box display="flex" alignItems="center">
            <Typography variant="h6">
              {personalInformation?.firstName} {personalInformation?.lastName}
            </Typography>
            {tempPersonalInformation.gender === "👦🏻 Male" && <span>👦🏻</span>}
            {tempPersonalInformation.gender === "👧🏻 Female" && <span>👧🏻</span>}
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1">{personalInformation.email}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1">{personalInformation.phone}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1">
              {formatAddress(personalInformation)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default PersonalInformation;
