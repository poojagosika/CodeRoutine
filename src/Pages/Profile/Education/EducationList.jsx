import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { deleteEducation } from "../../../Api/Profile/educationApi";

const EducationList = ({
  educationList,
  handleOpenDialog,
  setEducationList,
  userId,
}) => {
  const handleDelete = async (index, educationId) => {
    try {
      const response = await deleteEducation(educationId);
      console.log("Delete Response:", response); // Log response to check status
      if (response.status === 200) {
        setEducationList((prev) => prev.filter((_, idx) => idx !== index));
        toast.success("Education deleted successfully");
      } else {
        toast.error("Failed to delete education");
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
      <Typography variant="h5" gutterBottom ml={2} mt={2}>
        Education
      </Typography>

      <Box mt={3}>
        {educationList?.map((education, index) => (
          <Box
            key={index}
            mb={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box ml={2}>
              <Typography variant="h6">{education.institution}</Typography>
              <Typography>
                {education.degree} in {education.fieldOfStudy}
              </Typography>
              <Typography>
                {education.startDate} - {education.endDate}
              </Typography>
              <Typography>{education.grade}</Typography>
              <Typography>{education.activities}</Typography>
              <Typography>{education.cgpa}</Typography>
            </Box>
            <Box>
              <IconButton
                color="success"
                onClick={() => handleOpenDialog(index)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDelete(index, education._id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default EducationList;

