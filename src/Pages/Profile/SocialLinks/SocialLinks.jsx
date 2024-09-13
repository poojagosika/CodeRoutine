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
import {
  Add as AddIcon,
  DeleteForever,
  Close as CloseIcon,
} from "@mui/icons-material";
import { ContextStore } from "../../../Context/ContextStore";
import SocialLinksList from "./SocialLinksList";
import { toast } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { addOrUpdateSocialLinks } from "../../../features/profile/profileActions";

const SocialLinks = (props) => {
  const [urls, setUrls] = useState(
    props?.userProfile?.socialLinks || {
      linkedin: "",
      github: "",
      x: "",
      blog: "",
      portfolio: "",
      additional: [],
    }
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [tempUrls, setTempUrls] = useState({ ...urls });
  const { userData } = ContextStore();
  const dispatch = useDispatch();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveLinks = async () => {
    dispatch(addOrUpdateSocialLinks(tempUrls));
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
      setTempUrls((prevTempUrls) => ({
        ...prevTempUrls,
        [name]: e.target.value,
      }));
    }
  };

  const handleDelete = (index) => () => {
    setTempUrls((prevTempUrls) => {
      const newAdditional = prevTempUrls.additional.filter(
        (_, i) => i !== index
      );
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
          <IconButton color="primary" onClick={handleOpenDialog} sx={{ mr: 1 }}>
            <AddIcon />
          </IconButton>
        )}
      </Box>
      <SocialLinksList urls={urls} />
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          id="form-dialog-title"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Add Social Links
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              color: "grey.500",
              "&:hover": {
                color: "grey.700",
              },
            }}
            aria-label="close"
            size="small"
            edge="end"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
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
                  <IconButton
                    onClick={handleClearField("linkedin")}
                    size="small"
                  >
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
                  <IconButton
                    onClick={handleClearField("portfolio")}
                    size="small"
                  >
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
          <Button
            onClick={handleSaveLinks}
            variant="contained"
            color="primary"
            startIcon={<SendIcon fontSize="small" />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default SocialLinks;
