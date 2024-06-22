import React from "react";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Container,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import imgBlue from "../../assets/Contest/blueImage.png";
import imgGreen from "../../assets/Contest/greenImage.png";
import googleImg from "../../assets/images/googleImg.jpeg";
import microsoftImg from "../../assets/images/microsoftImg.jpeg";
import facebookImg from "../../assets/images/facebookImg.jpeg";

import amazonImg from "../../assets/images/amazonImg.jpeg";
import MediaControlCard from "./MediaControlCard";

function Explore() {
  const data = [
    {
      id: 1,
      image: imgBlue,
      biggerText: "Data Structures and Algorithms",
      smallerText: "CodeRoutine's Interview Crash Course",
      coins: 200,
    },
    {
      id: 2,
      image: imgGreen,
      biggerText: "System Design Interviews ",
      smallerText: "CodeRoutine's Interview Crash Course",

      coins: 200,
    },
    {
      id: 3,
      image: imgBlue,
      biggerText: "The CodeRoutine Begineers Guide",
      smallerText: "CodeRoutine's Interview Crash Course",

      coins: 300,
    },
    {
      id: 4,
      image: imgGreen,
      biggerText: "Top Interview Questions",
      smallerText: "CodeRoutine's Interview Crash Course",

      coins: 400,
    },
    {
      id: 5,
      image: googleImg,
      biggerText: "Google Interviews",
      smallerText: "CodeRoutine's Interview Crash Course",

      coins: 500,
    },
    {
      id: 6,
      image: facebookImg,
      biggerText: "FaceBook",
      smallerText: "CodeRoutine's Interview Crash Course",

      coins: 600,
    },
    {
      id: 7,
      image: microsoftImg,
      biggerText: "Microsoft",
      smallerText: "CodeRoutine's Interview Crash Course",

      coins: 700,
    },
    {
      id: 8,
      image: amazonImg,
      biggerText: "Amazon",
      smallerText: "CodeRoutine's Interview Crash Course",

      coins: 800,
    },
  ];

  return (
    <Container>
      <Box sx={{ flexGrow: 1, margin: "40px 20px" }}>
        <Grid container spacing={2} style={{ backgroundColor: "#d6f4fc" }}>
          <Grid item xs={8}>
            <Box>
              <p>Welcome to</p>
              <h1>CodeRoutine Explore</h1>
              <MediaControlCard />
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton color="gray" aria-label="home">
              <StarBorderIcon />
            </IconButton>
            <IconButton color="gray" aria-label="settings">
              <AccessAlarmIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Box textAlign="left">
          <h2>Featured</h2>
        </Box>
        <Grid container spacing={2} justifyContent="center">
          {data.slice(0, 4).map((product) => (
            <Grid
              key={product.id}
              item
              xs={3}
              style={{ marginTop: 20, marginBottom: 20 }}
            >
              <Card sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <CardMedia
                  component="img"
                  height="200px"
                  width="150px"
                  image={product.image}
                  alt={product.biggerText}
                />
                <CardContent
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box>
                    <Typography
                      gutterBottom
                      sx={{ fontSize: 18 }}
                      component="div"
                    >
                      {product.biggerText}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: 10 }}>
                      {product.smallerText}
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    disableElevation
                    sx={{
                      backgroundColor: "rgb(74,74,74)",
                      color: "white",
                      padding: 0.5,
                    }}
                  >
                    <StarBorderIcon
                      sx={{ width: 15, color: "#ffc400", mr: 1 }}
                    />
                    {product.coins}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          {data.slice(4, 8).map((product) => (
            <Grid key={product.id} item xs={3}>
              <Card sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <CardMedia
                  component="img"
                  height="200px"
                  width="150px"
                  image={product.image}
                  alt={product.biggerText}
                />
                <CardContent
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box>
                    <Typography
                      gutterBottom
                      sx={{ fontSize: 18 }}
                      component="div"
                    >
                      {product.biggerText}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: 12 }}>
                      {product.smallerText}
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    disableElevation
                    sx={{
                      backgroundColor: "rgb(74,74,74)",
                      color: "white",
                      padding: 0.5,
                    }}
                  >
                    <StarBorderIcon
                      sx={{ width: 15, color: "#ffc400", mr: 1 }}
                    />
                    {product.coins}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* Redeem section */}
        <Box
          sx={{
            marginTop: 5,
          }}
        >
          <p variant="outlined" color="primary">
            Copyright © 2024 CodeRoutine
          </p>
        </Box>
      </Box>
    </Container>
  );
}

export default Explore;
