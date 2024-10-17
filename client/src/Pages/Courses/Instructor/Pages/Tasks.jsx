import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  Button,
  Divider,
  Paper,
  Grid,
  Snackbar,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete the project documentation", completed: false },
    { id: 2, text: "Review pull requests", completed: true },
    { id: 3, text: "Plan the sprint meeting", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleToggle = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setSnackbarOpen(true);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask(""); // Clear the input field
      setSnackbarOpen(true);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredTasks =
    filter === "completed"
      ? tasks.filter((task) => task.completed)
      : filter === "incomplete"
      ? tasks.filter((task) => !task.completed)
      : tasks;

  return (
    <Box p={5} sx={{ margin: "auto" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
        Task Manager
      </Typography>
      <Box>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <Typography variant="h6" gutterBottom>
                Add a New Task
              </Typography>
              <TextField
                label="New Task"
                fullWidth
                variant="outlined"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                fullWidth
                onClick={handleAddTask}
              >
                Add Task
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <Typography variant="h6" gutterBottom>
                Your Tasks
              </Typography>

              {/* Filter Dropdown */}
              <Select
                value={filter}
                onChange={handleFilterChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              >
                <MenuItem value="all">All Tasks</MenuItem>
                <MenuItem value="completed">Completed Tasks</MenuItem>
                <MenuItem value="incomplete">Incomplete Tasks</MenuItem>
              </Select>

              <List>
                {filteredTasks.map((task) => (
                  <ListItem
                    key={task.id}
                    sx={{
                      textDecoration: task.completed ? "line-through" : "none",
                      bgcolor: task.completed ? "#e0f7fa" : "#fff",
                      borderRadius: 1,
                      mb: 1,
                      transition: "0.3s",
                      "&:hover": {
                        boxShadow: 1,
                      },
                    }}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(task.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={task.completed}
                        onChange={() => handleToggle(task.id)}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText primary={task.text} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default Tasks;
