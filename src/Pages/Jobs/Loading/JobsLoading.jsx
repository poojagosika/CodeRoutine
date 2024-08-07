import React from "react";
import { Grid, Paper, Box, Skeleton } from "@mui/material";

const JobsLoader = () => {
  return (
    <Grid container spacing={3} mb={3}>
      {Array.from(new Array(3)).map((_, index) => (
        <Grid item key={index} xs={12} sm={12} md={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="text" width="40%" height={30} />
            <Box display="flex" gap={4} mt={1} mb={1}>
              <Box display="flex" alignItems="center">
                <Skeleton variant="circular" width={24} height={24} />
                <Skeleton
                  variant="text"
                  width={60}
                  height={20}
                  sx={{ ml: 1 }}
                />
              </Box>
              <Box display="flex" alignItems="center">
                <Skeleton variant="circular" width={24} height={24} />
                <Skeleton
                  variant="text"
                  width={60}
                  height={20}
                  sx={{ ml: 1 }}
                />
              </Box>
              <Box display="flex" alignItems="center">
                <Skeleton variant="circular" width={24} height={24} />
                <Skeleton
                  variant="text"
                  width={60}
                  height={20}
                  sx={{ ml: 1 }}
                />
              </Box>
            </Box>
            <Skeleton variant="rectangular" height={40} />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Skeleton variant="text" width="20%" />
              <Skeleton variant="rectangular" width="30%"/>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default JobsLoader;
