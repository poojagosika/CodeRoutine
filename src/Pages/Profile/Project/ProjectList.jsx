import { Box, IconButton, Typography, Link } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ContextStore } from "../../../Context/ContextStore";
import { deleteProject } from "../../../Api/Profile/projectApi";
import { toast } from "react-toastify";

const ProjectList = ({
  projectList,
  handleOpenDialog,
  userId,
  setProjectList,
}) => {
  const { userData } = ContextStore();

  const calculateYearsMonths = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }
    return { years, months };
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  };

  const formatDuration = ({ years, months }) => {
    const yearStr = years > 0 ? `${years} yr${years > 1 ? "s" : ""}` : "";
    const monthStr = months > 0 ? `${months} mo${months > 1 ? "s" : ""}` : "";
    return `${yearStr}${yearStr && monthStr ? " " : ""}${monthStr}`;
  };

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
          project?.endDate
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
