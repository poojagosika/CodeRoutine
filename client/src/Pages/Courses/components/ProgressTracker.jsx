import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, LinearProgress } from "@mui/material";
import { getProgressByUserAndCourse } from "../../../Api/CoursesApi";

const ProgressTracker = () => {
  const { userId, courseId } = useParams();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    getProgressByUserAndCourse(userId, courseId)
      .then((res) => setProgress(res.data))
      .catch((err) => console.error(err));
  }, [userId, courseId]);

  if (!progress) return <Typography>Loading...</Typography>;

  return (
    <div>
      <Typography variant="h5">Progress for {progress.courseTitle}</Typography>
      <LinearProgress
        variant="determinate"
        value={progress.percentageCompleted}
      />
      <Typography variant="body2">
        {progress.percentageCompleted}% completed
      </Typography>
    </div>
  );
};

export default ProgressTracker;
