import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function IsLogin(props) {
  const navigate = useNavigate();
  return (
    <Dialog
      open={props.loginDialogOpen}
      onClose={() => props.setLoginDialogOpen(false)}
    >
      <DialogTitle>{"Please Log In"}</DialogTitle>
      <DialogContent>
        <Typography>{props.message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => navigate("/login")} color="primary">
          Login
        </Button>
        <Button
          onClick={() => props.setLoginDialogOpen(false)}
          color="secondary"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default IsLogin;
