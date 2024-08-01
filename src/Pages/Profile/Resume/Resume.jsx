import React from "react";
import { Container, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import TemplateCard1 from "./TemplateCard1";
import TemplateCard2 from "./TemplateCard2";
import TemplateCard3 from "./TemplateCard3";
import TemplateCard4 from "./TemplateCard4";

const Resume = () => {
  const { state } = useLocation();
  const user = state?.userProfile;
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <TemplateCard1 user={user} />
        </Grid>
        <Grid item>
          <TemplateCard2 user={user} />
        </Grid>
        <Grid item>
          <TemplateCard3 user={user} />
        </Grid>
        <Grid item>
          <TemplateCard4 user={user} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Resume;
