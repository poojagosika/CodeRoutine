import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import imgGreen from "../../assets/Contest/greenImage.png";

export default function MediaControlCard() {
  return (
    <Card
      sx={{
        display: "flex",
        marginBottom: 10,
        marginTop: 10,
        width: "500px",
        height: "200px",
        backgroundColor: "gray",
        color: "#fff",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto", padding: "10px" }}>
          <Typography variant="h5" component="div">
            CodeRoutine's Interview Crash Course
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Data Structures and Algorithms
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
