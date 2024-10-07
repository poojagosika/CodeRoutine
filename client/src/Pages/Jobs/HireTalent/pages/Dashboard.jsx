import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { ContextStore } from "../../../../Context/ContextStore";
import getCuteAvatar from "../../../../Config/getCuteAvatar";
import { Link, useNavigate } from "react-router-dom";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";

function Dashboard() {
  const { userData } = ContextStore();
  const navigate = useNavigate();
  const { userName } = userData || {};
  const avatarSrc = userName ? getCuteAvatar(userName) : "/default-avatar.png";

  const buttonStyle = {
    borderRadius: "40px",
    mt: { xs: 2, sm: 0 },
  };

  const getIconStyle = (color) => ({
    backgroundColor: color,
    padding: 2,
    borderRadius: "50%",
    color: "white",
  });

  const JobCard = ({ color, title, count }) => (
    <Box display="flex" gap={1} alignItems="center">
      <Box sx={getIconStyle(color)}>
        <SpeakerNotesIcon />
      </Box>
      <Box>
        <Typography>{title}</Typography>
        <Typography>{count}</Typography>
      </Box>
    </Box>
  );

  return (
    <div>
      {/* User Information Box */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        sx={{
          backgroundColor: "lightgray",
          padding: 2,
          marginBottom: 5,
        }}
        borderRadius="20px"
      >
        <Box display="flex" gap={2} alignItems="center">
          <Avatar
            alt={userName || "Guest"}
            src={avatarSrc}
            onClick={() => navigate(`/profile/${userName}`)}
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.1)",
              },
            }}
          />
          <Box>
            <Typography variant="h6">Welcome {userName || "Guest"}</Typography>
            <Typography variant="body2" sx={{ color: "red" }}>
              Your credentials are being reviewed by the Coderoutine Admin Team.
              The verification process usually takes up to two business days.
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          sx={buttonStyle}
          component={Link}
          to="/jobs/postjobs"
        >
          Post A Job
        </Button>
      </Box>

      {/* Active Jobs Section */}
      <Box>
        <Box
          display="flex"
          gap={2}
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent={"space-around"}
          alignItems="center"
          sx={{
            backgroundColor: "lightgray",
            padding: 2,
          }}
          borderRadius="20px"
        >
          {/* Reusable Job Cards */}
          <JobCard color="rgb(0, 204, 153)" title="Active Jobs" count="0" />
          <JobCard
            color="rgb(86, 122, 249)"
            title="Applicants till Date"
            count="0"
          />
          <JobCard color="rgb(96, 108, 309)" title="Active Tests" count="0" />
        </Box>
      </Box>
    </div>
  );
}

export default Dashboard;
