import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Link,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  LinkedIn,
  GitHub,
  X,
  Language,
  Public,
  AccountCircle,
  DeleteForever,
} from "@mui/icons-material";

const SocialLinks = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [tempUrls, setTempUrls] = useState({
    linkedin: "",
    github: "",
    x: "",
    blog: "",
    portfolio: "",
  });
  const [additionalUrls, setAdditionalUrls] = useState([]);
  const [showIcons, setShowIcons] = useState(false);
  const [urls, setUrls] = useState(props?.socialLinks);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const addHttpPrefix = (url) => {
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      return "http://" + url;
    }
    return url;
  };

  const handleAddLinks = () => {
    const updatedTempUrls = {};
    for (const key in tempUrls) {
      updatedTempUrls[key] = addHttpPrefix(tempUrls[key]);
    }

    const updatedAdditionalUrls = additionalUrls.map(addHttpPrefix);

    setUrls({ ...updatedTempUrls, additional: updatedAdditionalUrls });
    setShowIcons(true);
    handleCloseDialog();
  };

  const handleAdd = () => {
    setAdditionalUrls([...additionalUrls, ""]);
  };

  const handleUrlChange = (e, name) => {
    const { value } = e.target;
    if (typeof name === "number") {
      const updatedAdditionalUrls = additionalUrls.slice();
      updatedAdditionalUrls[name] = value;
      setAdditionalUrls(updatedAdditionalUrls);
    } else {
      setTempUrls({ ...tempUrls, [name]: value });
    }
  };

  const handleDelete = (index) => {
    return () => {
      const updatedAdditionalUrls = additionalUrls.slice();
      updatedAdditionalUrls.splice(index, 1);
      setAdditionalUrls(updatedAdditionalUrls);
    };
  };

  return (
    <Grid item xs={12}>
      <Typography variant="h6">Social Links</Typography>

      {showIcons && (
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }} mb={2}>
          {urls.linkedin && (
            <Tooltip title="LinkedIn" arrow>
              <Link
                href={urls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedIn sx={{ mr: 1 }} color="primary" />
              </Link>
            </Tooltip>
          )}
          {urls.github && (
            <Tooltip title="GitHub" arrow>
              <Link
                href={urls.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHub sx={{ mr: 1 }} color="primary" />
              </Link>
            </Tooltip>
          )}
          {urls.x && (
            <Tooltip title="X" arrow>
              <Link href={urls.x} target="_blank" rel="noopener noreferrer">
                <X sx={{ mr: 1 }} color="primary" />
              </Link>
            </Tooltip>
          )}
          {urls.blog && (
            <Tooltip title="Blog" arrow>
              <Link href={urls.blog} target="_blank" rel="noopener noreferrer">
                <Public sx={{ mr: 1 }} color="primary" />
              </Link>
            </Tooltip>
          )}
          {urls.portfolio && (
            <Tooltip title="Portfolio" arrow>
              <Link
                href={urls.portfolio}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AccountCircle sx={{ mr: 1 }} color="primary" />
              </Link>
            </Tooltip>
          )}
          {urls.additional &&
            urls.additional.map(
              (url, index) =>
                url && (
                  <Tooltip title={`Work Sample ${index + 1}`} key={index} arrow>
                    <Link href={url} target="_blank" rel="noopener noreferrer">
                      <Language sx={{ mr: 1 }} color="primary" />
                    </Link>
                  </Tooltip>
                )
            )}
        </Box>
      )}

      <Button
        variant="text"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenDialog}
      >
        Add Social Links
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Portfolio / Work Sample</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            Showcase your skills by adding your work samples
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
          />
          {additionalUrls.map((url, index) => (
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
            Add portfolio / work sample
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
          <Button onClick={handleAddLinks} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default SocialLinks;
