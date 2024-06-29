import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import reactImg from "../assets/home/react.webp";
import awsImg from "../assets/home/aws.webp";
import iosImg from "../assets/home/iosimg.webp";
import bootcampImg from "../assets/home/bootcamp.webp";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ContextStore } from "../Context/ContextStore";

const CombinedLink = React.forwardRef(function CombinedLink(props, ref) {
  return <RouterLink ref={ref} {...props} />;
});

const cards = [
  {
    id: 1,
    title: "REACT",
    image: reactImg,
    description: "Beginner to Advance",
  },
  {
    id: 2,
    title: "AWS",
    image: awsImg,
    description: "Beginner to Advance",
  },
  {
    id: 3,
    title: "IOS",
    image: iosImg,
    description: "Beginner to Advance",
  },
  {
    id: 4,
    title: "BOOTCAMP",
    image: bootcampImg,
    description: "Beginner to Advance",
  },
];

const handleSearch = (event) => {
  console.log(event.target.value);
};

function Home() {
  const { userData } = ContextStore();
  return (
    <>
      <CssBaseline />
      <main>
        <Box
          sx={{
            pt: 8,
            pb: 6,
            backgroundColor: "#393f48",
            color: "white",
          }}
        >
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              A New Way to Learn
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              CodeRoutine is the best platform to help you enhance your skills,
              expand your knowledge and prepare for technical interviews.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {!userData ? (
                <Button variant="contained" color="primary">
                  <Link
                    to={"/signup"}
                    component={CombinedLink}
                    color="inherit"
                    underline="none"
                  >
                    Sign Up
                  </Link>
                </Button>
              ) : (
                <Button variant="contained" color="primary">
                  <Link
                    to={"/explore"}
                    component={CombinedLink}
                    color="inherit"
                    underline="none"
                  >
                    Explore
                  </Link>
                </Button>
              )}
              <Button variant="outlined" color="primary">
                <Link
                  to={"/problems"}
                  component={CombinedLink}
                  color="inherit"
                  underline="none"
                >
                  Learn More
                </Link>
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h4" gutterBottom display={"flex"} gap={10}>
            Newly Launched
            <TextField
              placeholder="Search..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={3}>
                <Card>
                  <CardMedia
                    component="img"
                    height="100"
                    width="140"
                    image={card.image}
                    alt={card.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Box sx={{ backgroundColor: "#98999a", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          CodeRoutine
        </Typography>
        <Typography variant="subtitle1" align="center" component="p">
          Our mission is to help you improve yourself and land your dream job
        </Typography>
        <Copyright />
      </Box>
    </>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.success" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        <strong style={{ color: "green" }}> Your CodeRoutine</strong>
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Home;
