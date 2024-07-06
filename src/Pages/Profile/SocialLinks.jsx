import React, { useState } from "react";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const CombinedLink = React.forwardRef(function CombinedLink(props, ref) {
    return <RouterLink ref={ref} {...props} />;
  });

const SocialLinks = ({
  userProfile,
  isEditing,
  handleChange,
  handleEditClick,
  handleCancelClick,
  handleSaveClick,
  isDialogOpen,
  platformIcons,
  platformColors,
}) => {
  return (
    <Grid item xs={12}>
      <Divider sx={{ my: 2 }} />
      {userProfile?.profile?.socialAddresses?.[platform] ? (
        <Link
          key={platform}
          href={userProfile?.profile?.socialAddresses?.[platform]}
          target="_blank"
          variant="body1"
          underline="none"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: platformColors[platform],
          }}
        >
          {platformIcons[platform]}
        </Link>
      ) : (
        <Box display={"flex"} gap={3}>
          <Link component={CombinedLink} to={"/"}>{platformIcons.linkedin}</Link>
          <Link component={CombinedLink} to={"/"}>{platformIcons.github}</Link>
          <Link component={CombinedLink} to={"/"}>{platformIcons.twitter}</Link>
          <Link component={CombinedLink} to={"/"}>{platformIcons.blog}</Link>
          <Link component={CombinedLink} to={"/"}>{platformIcons.portfolio}</Link>
        </Box>
      )}

      <Box display="flex" alignItems="center" gap={2}>
        <Button color="primary" onClick={() => handleEditClick("social")}>
          <AddIcon />
          Add portfolio/ work sample
        </Button>
      </Box>
      <Dialog open={isDialogOpen} onClose={handleCancelClick}>
        <Typography textAlign="center" variant="div">
          <DialogTitle>Portfolio / Work Samples / Socials</DialogTitle>
          <Typography variant="span">
            Showcase your skills by adding your work samples
          </Typography>
        </Typography>
        <DialogContent>
          {["linkedin", "github", "twitter", "Blog", "Portfolio"].map(
            (platform) =>
              isEditing.social ? (
                <TextField
                  key={platform}
                  id={platform}
                  label={capitalize(platform)}
                  variant="outlined"
                  value={
                    userProfile?.profile?.socialAddresses?.[platform] || ""
                  }
                  onChange={(e) => handleChange(e, "social")}
                  fullWidth
                  size="small"
                  sx={{ mb: 2 }}
                />
              ) : (
                userProfile?.profile?.socialAddresses?.[platform] && (
                  <Link
                    key={platform}
                    href={userProfile?.profile?.socialAddresses?.[platform]}
                    target="_blank"
                    variant="body1"
                    underline="none"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: platformColors[platform],
                    }}
                  >
                    {platformIcons[platform]}
                  </Link>
                )
              )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveClick} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default SocialLinks;
