import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";

export default function Profile() {
  return (
    <Container maxWidth="md" style={{ marginTop: "100px" }}>
      <Box
        sx={{
          border: "1px solid black",
          borderRadius: "10px",
          padding: "20px",
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
        gap={5}
      >
        <Box>
          <Avatar style={{ width: "100px", height: "100px" }} />
        </Box>
        <Grid>
          <Box gap={5}>
            <Typography sx={{ mb: 1 }}>Name</Typography>
            <Box
              sx={{ display: "flex", gap: 4, mb: 2, flexWrap: "wrap" }}
              elevation={3}
            >
              <TextField
                id="outlined-basic"
                variant="outlined"
                value="Pooja"
                size="small"
                sx={{ width: 300 }}
              />
              <TextField
                id="outlined-basic"
                value="G"
                variant="outlined"
                size="small"
                sx={{ width: 300 }}
              />
            </Box>
          </Box>
          <Box gap={4}>
            <Typography sx={{ mb: 1 }}>Role</Typography>
            <Box sx={{ display: "flex", gap: 4, mb: 2, flexWrap: "wrap" }}>
              <TextField
                id="outlined-basic"
                value="Full Stack Web Developer"
                variant="outlined"
                size="small"
                sx={{ width: 300 }}
              />
              <TextField
                id="outlined-basic"
                value="abc@gmail.com"
                variant="outlined"
                size="small"
                sx={{ width: 300 }}
              />
            </Box>
          </Box>
          <Box gap={4}>
            <Typography sx={{ mb: 1 }}>College</Typography>
            <Box sx={{ display: "flex", gap: 4, mb: 2 }}>
              <TextField
                id="outlined-basic"
                value="Abcd engineering college"
                variant="outlined"
                fullWidth
                size="small"
              />
            </Box>
          </Box>
          <Box style={{ textAlign: "right" }}>
            <Button
              variant="outlined"
              color="secondary"
              style={{ marginRight: "8px" }}
            >
              Close
            </Button>
            <Button variant="contained" color="primary">
              Edit
            </Button>
          </Box>
        </Grid>
      </Box>
    </Container>
  );
}
