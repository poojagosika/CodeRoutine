import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { Assignment } from "@mui/icons-material"; // Icon import

function CampusHiring() {
  return (
    <Box gap={2} p={3}>
      {/* Main Title */}
      <Typography variant="h4" align="center" gutterBottom color="primary">
        Campus Hiring Tests
      </Typography>

      {/* Card Section for Remaining Tests */}
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              border: "1px solid",
              borderColor: "primary.main",
              boxShadow: 3,
              width: "100%",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Assignment sx={{ fontSize: 50, color: "primary.main", mb: 2 }} />
              <Typography variant="h4" color="primary">
                1
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Remaining Tests
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CampusHiring;
