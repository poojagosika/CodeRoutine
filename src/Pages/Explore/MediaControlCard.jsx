import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import imgGreen from "../../assets/images/greenImage.png";

export default function MediaControlCard() {
  const theme = useTheme();

  return (
    <Card
      sx={{ display: "flex", marginTop: 5, marginLeft: 40 }}
      style={{
        width: "500px",
        height: "200px",
        backgroundColor: "gray",
        color: "#fff",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto", padding: "10px" }}>
          <Typography component="div" variant="h5">
            <p>LeetCode's Interview Crash Course</p>
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            <h3>Data Structures and Algorithms</h3>
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 250, height: 200 }}
        image={imgGreen}
        alt="Live from space album cover"
      />
    </Card>
  );
}
