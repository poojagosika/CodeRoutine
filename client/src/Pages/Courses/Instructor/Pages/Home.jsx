import React from "react";
import { Box, Container } from "@mui/material";
import WelcomePage from "../Components/WelcomePage";
import AllCourses from "../Components/AllCourses";

const Home = () => {
  return (
    <Box p={4}>
      <WelcomePage />
      <AllCourses />
    </Box>
  );
};

export default Home;
