import { Box, IconButton, Typography, Link } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ContextStore } from "../../../Context/ContextStore";
import { deleteProject } from "../../../Api/Profile/projectApi";
import { toast } from "react-toastify";
import { calculateYearsMonths, formatDate, formatDuration } from "../config";

const ProjectList = ({
  projectList,
  handleOpenDialog,
  userId,
  setProjectList,
}) => {
  const { userData } = ContextStore();

  const handleDelete = async (index, projectId) => {
    try {
      const response = await deleteProject(projectId);
      if (response.data) {
        setProjectList((prev) => prev.filter((_, idx) => idx !== index));
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete project");
      console.log(error);
    }
  };

  return (
    <Box>
      {projectList?.map((project, index) => {
        const duration = calculateYearsMonths(
          project?.startDate,
          project?.isCurrent ? new Date() : project?.endDate
        );
        return (
          <Box
            key={index}
            mb={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              borderBottom: "1px solid #E5E5E5",
            }}
          >
            <Box ml={2}>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 600,
                  gap: 1,
                }}
              >
                {project?.projectLink.startsWith("https://") ? (
                  <Link
                    href={project?.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: "black", textDecoration: "none",fontWeight: 600 }}
                    variant="body1"
                  >
                    {project?.projectName}
                  </Link>
                ) : (
                  <Link
                    href={`https://${project?.projectLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: "black", textDecoration: "none",fontWeight: 600, }}
                    variant="body1"
                  >
                    {project?.projectName}
                  </Link>
                )}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#6B7280",
                }}
              >
                {formatDate(project?.startDate)}
                {" - "}
                {project?.isCurrent ? (
                  <span>Present</span>
                ) : (
                  formatDate(project?.endDate)
                )}
                .{` ${formatDuration(duration)}`}
              </Typography>
              <Typography
                variant="body1"
                style={{ maxWidth: "500px" }}
                gutterBottom
              >
                {project?.description}
              </Typography>
            </Box>
            {userData?._id === userId && (
              <Box>
                <IconButton
                  size="small"
                  color="success"
                  onClick={() => handleOpenDialog(index)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDelete(index, project?._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default ProjectList;
