import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import { Add as AddIcon, DeleteForever, Close as CloseIcon } from "@mui/icons-material";
import { ContextStore } from "../../../Context/ContextStore";
import SocialLinksList from "./SocialLinksList";
import { addOrUpdateSocialLinks } from "../../../Api/Profile/socialLinksApi";
import { toast } from "react-toastify";

const SocialLinks = (props) => {
  const [urls, setUrls] = useState(props?.userProfile?.socialLinks || {
    linkedin: "",
    github: "",
    x: "",
    blog: "",
    portfolio: "",
    additional: [],
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [tempUrls, setTempUrls] = useState({ ...urls });
  const { userData } = ContextStore();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveLinks = async () => {
    try {
      const response = await addOrUpdateSocialLinks(tempUrls);
      if (response?.data) {
        setUrls(tempUrls);
        handleCloseDialog();
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleAdd = () => {
    setTempUrls((prevTempUrls) => ({
      ...prevTempUrls,
      additional: [...prevTempUrls.additional, ""],
    }));
  };

  const handleUrlChange = (e, name) => {
    if (typeof name === "number") {
      setTempUrls((prevTempUrls) => {
        const newAdditional = [...prevTempUrls.additional];
        newAdditional[name] = e.target.value;
        return { ...prevTempUrls, additional: newAdditional };
      });
    } else {
      setTempUrls((prevTempUrls) => ({ ...prevTempUrls, [name]: e.target.value }));
    }
  };

  const handleDelete = (index) => () => {
    setTempUrls((prevTempUrls) => {
      const newAdditional = prevTempUrls.additional.filter((_, i) => i !== index);
      return { ...prevTempUrls, additional: newAdditional };
    });
  };

  const handleClearField = (name) => () => {
    setTempUrls((prevTempUrls) => ({ ...prevTempUrls, [name]: "" }));
  };

  return (
    <Grid item xs={12}>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            fontSize: "1.25rem",
          }}
        >
          Social Links
        </Typography>
        {userData?._id === props?.userProfile?._id && (
          <IconButton
            color="primary"
            onClick={handleOpenDialog}
            sx={{ mr: 1 }}
          >
            <AddIcon />
          </IconButton>
        )}
      </Box>
      <SocialLinksList urls={urls} />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Social Links</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            Showcase your skills by adding your Social Links work samples
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="linkedin"
            label="LinkedIn URL"
            type="url"
            fullWidth
            size="small"
            value={tempUrls.linkedin}
            onChange={(e) => handleUrlChange(e, "linkedin")}
            InputProps={{
              endAdornment: tempUrls.linkedin && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearField("linkedin")} size="small">
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            id="github"
            label="GitHub URL"
            type="url"
            fullWidth
            size="small"
            value={tempUrls.github}
            onChange={(e) => handleUrlChange(e, "github")}
            InputProps={{
              endAdornment: tempUrls.github && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearField("github")} size="small">
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            id="x"
            label="X URL"
            type="url"
            fullWidth
            size="small"
            value={tempUrls.x}
            onChange={(e) => handleUrlChange(e, "x")}
            InputProps={{
              endAdornment: tempUrls.x && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearField("x")} size="small">
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            id="blog"
            label="Blog URL"
            type="url"
            fullWidth
            size="small"
            value={tempUrls.blog}
            onChange={(e) => handleUrlChange(e, "blog")}
            InputProps={{
              endAdornment: tempUrls.blog && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearField("blog")} size="small">
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            id="portfolio"
            label="Portfolio URL"
            type="url"
            fullWidth
            size="small"
            value={tempUrls.portfolio}
            onChange={(e) => handleUrlChange(e, "portfolio")}
            InputProps={{
              endAdornment: tempUrls.portfolio && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearField("portfolio")} size="small">
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {tempUrls?.additional.map((url, index) => (
            <Box display={"flex"} alignItems={"center"} key={index}>
              <TextField
                margin="dense"
                key={index}
                label={`Work Sample ${index + 1}`}
                fullWidth
                size="small"
                value={url}
                onChange={(e) => handleUrlChange(e, index)}
              />
              <DeleteForever
                onClick={handleDelete(index)}
                fontSize="small"
                aria-label="delete"
                cursor="pointer"
                sx={{
                  color: "red",
                  "&:hover": {
                    color: "orange",
                  },
                }}
                color="action"
              />
            </Box>
          ))}
          <Button
            variant="text"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Social Links
          </Button>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={handleSaveLinks} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default SocialLinks;
