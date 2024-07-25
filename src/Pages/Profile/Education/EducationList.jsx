import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ContextStore } from "../../../Context/ContextStore";
import { toast } from "react-toastify";
import { deleteEducation } from "../../../Api/Profile/educationApi";
import { calculateYearsMonths, formatDate, formatDuration } from "../config";

const EducationList = ({
  educationList,
  handleOpenDialog,
  setEducationList,
  userId,
}) => {
  const { userData } = ContextStore();

  const handleDelete = async (index, educationId) => {
    try {
      const response = await deleteEducation(educationId);
      if (response.status === 200) {
        setEducationList((prev) => prev.filter((_, idx) => idx !== index));
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete education"
      );
      console.error("Delete Error:", error); // Log error for debugging
    }
  };

  return (
    <Box>
      {educationList?.map((education, index) => {
        const duration = calculateYearsMonths(
          education?.startDate,
          education?.isCurrent ? new Date() : education?.endDate
        );
        return (
          <Box
            key={index}
            mb={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              borderBottom: "1px solid #E5E5E5"
            }}
          >
            <Box ml={2}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {education.institution}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {education.degree}
                {" | "}
                {education.fieldOfStudy}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#6B7280",
                }}
              >
                {formatDate(education?.startDate)}
                {" - "}
                {education?.isCurrent ? (
                  <span>Present</span>
                ) : (
                  formatDate(education?.endDate)
                )}
                .{` ${formatDuration(duration)}`}
              </Typography>
              <Typography variant="body2" sx={{ color: "#6B7280" }}>
                Grade: {education.grade} | CGPA: {education.cgpa}
              </Typography>
              <Typography variant="body1" gutterBottom style={{ maxWidth: "500px" }}>
                Activities: {education.activities}
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
                  onClick={() => handleDelete(index, education._id)}
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

export default EducationList;
