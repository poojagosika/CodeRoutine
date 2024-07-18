import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import getCuteAvatar from "../../../Config/getCuteAvatar.js";
import PersonalInfoDialog from "./PersonalInfoDialog.jsx";
import { ContextStore } from '../../../Context/ContextStore.jsx';

const PersonalInformation = (props) => {
  const initialState = {
    firstName: props?.userProfile?.profile?.firstName || "",
    lastName: props?.userProfile?.profile?.lastName || "",
    headline: props?.userProfile?.profile?.headline || "",
    currentPosition: props?.userProfile?.profile?.currentPosition || "",
    education: props?.userProfile?.profile?.education || "",
    city: props?.userProfile?.profile?.city || "",
    gender: props?.userProfile?.profile?.gender || "",
    country: props?.userProfile?.profile?.country || "",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(initialState);
  const [tempPersonalInfo, setTempPersonalInfo] = useState(initialState);
  const { userData } = ContextStore();
  const toggleEditing = () => {
    setTempPersonalInfo(personalInfo);
    setIsEditing((prev) => !prev);
  };

  const formatAddress = ({ city, country }) => {
    return [city, country].filter(Boolean).join(", ");
  };
  return (
    <>
      <PersonalInfoDialog
        isEditing={isEditing}
        toggleEditing={toggleEditing}
        tempPersonalInfo={tempPersonalInfo}
        setTempPersonalInfo={setTempPersonalInfo}
        setPersonalInfo={setPersonalInfo}
        userId={props?.userProfile?._id}
        experience={props?.userProfile?.experience}
        education={props?.userProfile?.education}
      />
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        p={2}
        sx={{ height: 50 }}
      >
        <Avatar
          src={getCuteAvatar(props?.userProfile?.userName)}
          alt={props?.userProfile?.profile?.firstName}
          sx={{
            width: 150,
            height: 150,
            position: "relative",
            top: -120,
            border: "4px solid #fff",
          }}
          component="span"
        />
        {userData?._id === props?.userProfile?._id && (

          <IconButton
            onClick={toggleEditing}
            color="primary"
            size="small"
            aria-label="edit"
            component="span"
          >
            <EditIcon />
          </IconButton>)}
      </Box>
      <Box
        display="flex"
        justifyContent={{ xs: "", sm: "space-between" }}
        flexDirection={{ xs: "column", sm: "row" }}
        p={2}
        gap={1}
      >
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: "#212121" }}
            component="span"
            style={{ cursor: "pointer" }}
          >
            {personalInfo?.firstName} {personalInfo?.lastName}
            {personalInfo.gender === "👦🏻 Male" && <span>👦🏻</span>}
            {personalInfo.gender === "👧🏻 Female" && <span>👧🏻</span>}
          </Typography>
          <Typography variant="body1" style={{ maxWidth: '500px' }}>
            {personalInfo.headline}
          </Typography>
          <Typography sx={{ color: "#6B7280" }} variant="body2">
            {formatAddress(personalInfo)}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems={{ xs: "flex-start", sm: "flex-end" }}>
          {personalInfo?.currentPosition && (
            <Typography
              variant="body1"
              sx={{ color: "#6B7280" }}
              component="span"
              style={{ cursor: "pointer" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
            >
              <WorkIcon />
              {personalInfo?.currentPosition}
            </Typography>
          )}
          {personalInfo?.education && (
            <Typography
              variant="body1"
              sx={{ color: "#6B7280" }}
              component="span"
              style={{ cursor: "pointer" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
            >
              <SchoolIcon />
              {personalInfo?.education}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default PersonalInformation;
