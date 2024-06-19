import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";

import Prize from "../../assets/images/prizeImg.jpg";
import blueImg from "../../assets/images/blueImage.png";
import greenImg from "../../assets/images/greenImage.png";

const Contest = () => {
  // Sample contest data with images
  const contests = [
    {
      id: 1,
      name: "Weekly Contest 1",
      button: "Virtual",

      img: blueImg,
    },
    {
      id: 2,
      name: "Weekly Contest 2",
      button: "Virtual",
      img: greenImg,
    },
    {
      id: 3,
      name: "Weekly Contest 3",
      button: "Virtual",

      img: blueImg,
    },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="24px"
      backgroundColor="#1a1a1a"
    >
      <img src={Prize} alt="Prize" width={200} height={200} />
      <h1 style={{ color: "white" }}>
        Leetcode<span style={{ color: "#d5d6d7" }}> Contests</span>
      </h1>
      <p style={{ color: "#bdbec0", margin: "20px" }}>
        Contest every week, Complete and see your rankings
      </p>

      <Container maxWidth="md">
        <Grid container justifyContent="center" spacing={3}>
          <Grid item>
            <Card
              style={{
                backgroundColor: "#2196f3",
                width: 300,
                height: 200,
                marginBottom: "20px",
                border: "1px solid gray",
                borderRadius: "5%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  style={{ color: "#ffffff" }}
                >
                  Blue Card
                </Typography>
                <Typography color="textSecondary" style={{ color: "#ffffff" }}>
                  <img src={blueImg} alt="Blue Card" width={265} height={120} />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card
              style={{
                backgroundColor: "green",
                width: 300,
                height: 200,
                borderRadius: "5%",
                border: "1px solid gray",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  style={{ color: "#ffffff" }}
                >
                  Pink Card
                </Typography>
                <Typography
                  color="textSecondary"
                  style={{
                    color: "#ffffff",
                  }}
                >
                  <img
                    src={greenImg}
                    alt="Green Card"
                    width={265}
                    height={120}
                  />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <TableContainer
        component={Paper}
        style={{ maxWidth: 800, backgroundColor: "#282828" }}
      >
        <Table aria-label="contest table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Button variant="outlined">Past Contests</Button>
              </TableCell>
              <TableCell style={{ color: "white" }}>My Contests</TableCell>
              <TableCell style={{ color: "white" }}>
                What's a Virtual Contest?
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contests.map((contest) => (
              <TableRow key={contest.id}>
                <TableCell>
                  <img
                    src={contest.img}
                    alt={contest.name}
                    width={250}
                    height={150}
                    style={{ borderRadius: "5%", border: "1px solid gray" }}
                  />
                </TableCell>
                <TableCell style={{ color: "white" }}>{contest.name}</TableCell>
                <TableCell>
                  <Button variant="outlined">{contest.button}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Contest;
