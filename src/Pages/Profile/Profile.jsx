import * as React from "react";
import { Box, Container, Paper, CircularProgress } from "@mui/material";
import { getUserByUserName } from "../../Api/userApi";
import { useParams } from "react-router-dom";
import ProblemsSolved from "./ProblemsSolved";
import Skills from "./Skills";
import SocialLinks from "./SocialLinks";
import PersonalInformation from "./PersonalInformation/PersonalInformation";
import CopyRight from "../../Component/CopyRight/CopyRight";
import Experience from "./Experience";
import ProjectDetails from "./ProjectDetails";
import Training from "./Training/Training";
import Education from "./Education/Education";

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
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userName]);

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
          <Box sx={{ padding: "20px" }}>
            <PersonalInformation userProfile={userProfile} />
            <Experience experience={userProfile?.experience} />
            {/* <Education education={userProfile?.education} /> */}
            <Training userProfile={userProfile} />
            <ProjectDetails project={userProfile?.project} />
            <SocialLinks socialLinks={userProfile?.socialLinks} />
            <Skills userProfile={userProfile} />
            <ProblemsSolved problemsSolved={userProfile?.problemsSolved} />
          </Box>
        </Paper>
      </Container>
      <CopyRight />
    </>
  );
};

export default Profile;
