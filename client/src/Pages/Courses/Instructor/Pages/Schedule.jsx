import React, { useState } from "react";
import { Box, Typography, Grid, Paper, Button, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Schedule = () => {
  const [events, setEvents] = useState([
    { id: 1, title: "Team Meeting", time: "10:00 AM", date: "2024-10-17" },
    {
      id: 2,
      title: "Project Presentation",
      time: "1:00 PM",
      date: "2024-10-18",
    },
    { id: 3, title: "Code Review", time: "3:00 PM", date: "2024-10-19" },
    { id: 4, title: "Code Review", time: "3:00 PM", date: "2024-10-19" },
  ]);

  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", time: "", date: "" });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.time && newEvent.date) {
      setEvents([...events, { ...newEvent, id: Date.now() }]);
      setNewEvent({ title: "", time: "", date: "" });
      handleClose();
    }
  };

  return (
    <Box p={5}>
      <Grid
        container
        spacing={2}
        display={"flex"}
        justifyContent={"space-between"}
      >
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">{event.title}</Typography>
              <Typography color="textSecondary">{event.time}</Typography>
              <Typography color="textSecondary">{event.date}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{ mt: 4 }}
      >
        Add Event
      </Button>

      {/* Modal for Adding Events */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            outline: "none",
          }}
        >
          <Typography variant="h6" component="h2">
            Add New Event
          </Typography>
          <Box mt={2}>
            <input
              name="title"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <input
              name="time"
              placeholder="Event Time"
              value={newEvent.time}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <input
              name="date"
              type="date"
              value={newEvent.date}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </Box>
          <Button variant="contained" color="primary" onClick={handleAddEvent}>
            Add Event
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Schedule;
