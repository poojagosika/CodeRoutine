import * as React from "react";
import { Box, Container, Paper, CircularProgress } from "@mui/material";
import { getUserByUserName } from "../../Api/userApi";
import { useParams } from "react-router-dom";
import ProblemsSolved from "./ProblemsSolved";
import Skills from "./Skills";
import SocialLinks from "./SocialLinks/SocialLinks";
import PersonalInformation from "./PersonalInformation/PersonalInformation";
import CopyRight from "../../Component/CopyRight/CopyRight";
import Training from "./Training/Training";
import Project from "./Project/Project";
import Education from "./Education/Education";
import Experience from "./Experience/Experience";
import { toast } from "react-toastify";

const Profile = () => {
  const [userProfile, setUserProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const { id: userName } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserByUserName(userName);
        setUserProfile(response.data.user);
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userName]);

  const hasSocialLinks = (socialLinks) => {
    if (!socialLinks) return false;
    const { linkedin, github, x, blog, portfolio, additional } = socialLinks;
    return (
      linkedin || github || x || blog || portfolio || (additional && additional.length > 0)
    );
  };
  const hasPersonalInformation = (profile) => {
    if (!profile) return false;
    const { firstName, lastName, headline, currentPosition, education, city, gender, country } = profile;
    return (
      firstName || lastName || headline || currentPosition || education || city || gender || country
    );
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
              height: "200px",
            }}
          ></Box>
          <Box p={4}>
            {hasPersonalInformation(userProfile?.profile) && (
              <PersonalInformation userProfile={userProfile} />
            )}
            {userProfile?.experience?.length > 0 && (
              <Experience userProfile={userProfile} />
            )}
            {userProfile?.education?.length > 0 && (
              <Education userProfile={userProfile} />
            )}
            {userProfile?.training?.length > 0 && (
              <Training userProfile={userProfile} />
            )}
            {userProfile?.project?.length > 0 && (
              <Project userProfile={userProfile} />
            )}
            {userProfile?.skills?.length > 0 && (
              <Skills userProfile={userProfile} />
            )}
            {hasSocialLinks(userProfile?.socialLinks) && (
              <SocialLinks userProfile={userProfile} />
            )}
            <ProblemsSolved problemsSolved={userProfile?.problemsSolved} />
          </Box>
        </Paper>
      </Container>
      <CopyRight />
    </>
  );
};

export default Profile;
