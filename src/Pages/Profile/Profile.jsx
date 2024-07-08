import * as React from "react";
import {
  Box,
  Container,
  Avatar,
  Grid,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  getUserByUserName,
  userUpdateProfile,
} from "../../Services/AuthService";
import { useNavigate, useParams } from "react-router-dom";
import getCuteAvatar from "../../Config/getCuteAvatar";
import ProblemsSolved from "./ProblemsSolved";
import Skills from "./Skills";
import SocialLinks from "./SocialLinks";
import PersonalInformation from "./PersonalInformation";
import CopyRight from "../../Component/CopyRight/CopyRight";
import Education from "./Education";

const Profile = () => {
  const [isEditing, setIsEditing] = React.useState({
    personal: false,
    social: false,
    skills: false,
  });
  const [userProfile, setUserProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { id: userName } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserByUserName(userName);
        setUserProfile(response.data.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userName]);

  const handleChange = (e, platform) => {
    const { value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      profile: {
        ...prevProfile.profile,
        socialAddresses: {
          ...prevProfile.profile.socialAddresses,
          [platform]: value,
        },
      },
    }));
  };

  const handleSkillChange = (e, level, index) => {
    const newSkills = { ...userProfile.profile.skills };
    newSkills[level][index] = e.target.value;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      profile: {
        ...prevProfile.profile,
        skills: newSkills,
      },
    }));
  };

  const handleEditClick = (type) => {
    setIsEditing((prev) => ({ ...prev, [type]: true }));
    setIsDialogOpen(true);
  };

  const handleCancelClick = (type) => {
    setIsEditing((prev) => ({ ...prev, [type]: false }));
    setIsDialogOpen(false);
  };

  const handleSaveClick = async (type) => {
    try {
      setIsDialogOpen(false);
      const updatedProfile = { ...userProfile.profile };
      if (updatedProfile.newPassword) {
        updatedProfile.password = updatedProfile.newPassword;
      }

      const response = await userUpdateProfile(updatedProfile);
      if (response && response.data) {
        setIsEditing((prev) => ({ ...prev, [type]: false }));
      } else {
        console.error("Invalid response data:", response);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        style={{
          marginTop: "80px",
          marginBottom: "100px",
          textAlign: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <Container
        maxWidth="lg"
        style={{ marginTop: "40px", marginBottom: "80px" }}
      >
        <Paper elevation={3} sx={{ borderRadius: "10px", overflow: "hidden" }}>
          <Box
            sx={{
              background: "linear-gradient(to right, #6a11cb, #2575fc)",
              color: "white",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <Avatar
              src={getCuteAvatar(userProfile?.userName)}
              alt={userProfile?.profile?.firstName}
              sx={{ width: 120, height: 120, margin: "0 auto", mb: 2 }}
            />
            <Typography variant="h6">
              {userProfile?.profile?.firstName} {userProfile?.profile?.lastName}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginRight: 1,
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={() => navigate(`/profile/${userProfile?.userName}`)}
              component="span"
            >
              @{userProfile?.userName}
            </Typography>
          </Box>
          <Box sx={{ padding: "20px" }}>
            <Grid container spacing={2}>
              <PersonalInformation profile={userProfile?.profile} />
              <Education profile={userProfile?.profile} />
              {/* <SocialLinks userProfile={userProfile} isEditing={isEditing} handleChange={handleChange} handleEditClick={handleEditClick} handleCancelClick={handleCancelClick} handleSaveClick={handleSaveClick} platformIcons={platformIcons} platformColors={platformColors} isDialogOpen={isDialogOpen}/> */}
              <Skills userProfile={userProfile} isEditing={isEditing} />
              <ProblemsSolved userProfile={userProfile} />
            </Grid>
          </Box>
        </Paper>
      </Container>
      <CopyRight />
    </>
  );
};

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const platformIcons = {
  linkedin: <LinkedInIcon />,
  github: <GitHubIcon />,
  twitter: <TwitterIcon />,
  blog: <LanguageIcon />,
  portfolio: <AccountCircleIcon />,
};

const platformColors = {
  linkedin: "#0e76a8",
  github: "#171515",
  twitter: "#1DA1F2",
};

export default Profile;
