import React from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link as RouterLink } from "react-router-dom";
import { ContextStore } from "../../Context/ContextStore";
import { cards } from "./Config";
import CopyRight from "../../Component/CopyRight/CopyRight";

function Home() {
  const { userData } = ContextStore();
  const handleSearch = (event) => {
    console.log(event.target.value);
  };
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
              expand your knowledge, and prepare for technical interviews.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" color="primary" component={RouterLink} to={!userData ? "/signup" : "/explore"}>
                {!userData ? "Sign Up" : "Explore"}
              </Button>
              <Button variant="outlined" color="primary" component={RouterLink} to="/problems">
                Learn More
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Typography variant="h4">Newly Launched</Typography>
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
          </Box>
          <Grid container spacing={4} justifyContent="center">
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={3}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
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
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <CopyRight />
    </>
  );
}



export default Home;
