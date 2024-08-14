import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import CourseCard from "./CourseCard";
import { getAllCourses } from "../../../Api/CoursesApi";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCourses()
      .then((res) => {
        setCourses(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);


  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Grid container spacing={3}>
      {courses.map((course) => (
        <Grid item xs={12} sm={6} md={4} key={course._id}>
          <CourseCard course={course} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseList;
