import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { Assignment, MailOutline } from "@mui/icons-material"; // Icons import
function VirtualHiring() {
  return (
    <Box gap={2} p={3}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
        Virtual Hiring Tests
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              border: "1px solid",
              borderColor: "primary.main",
              boxShadow: 3,
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

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              border: "1px solid",
              borderColor: "primary.main",
              boxShadow: 3,
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <MailOutline
                sx={{ fontSize: 50, color: "primary.main", mb: 2 }}
              />
              <Typography variant="h4" color="primary">
                0
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Remaining Invites
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default VirtualHiring;
