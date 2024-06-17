import React from "react";
import { Container, Typography, Paper, Box, Button } from "@mui/material";

const Description = () => {
  const description = `
    <div>
      <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
      <p>You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
      <p>You can return the answer in any order.</p>
      <h4>Example 1:</h4>
      <p><strong>Input:</strong> nums = [2,7,11,15], target = 9<br /><strong>Output:</strong> [0,1]<br /><strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].</p>
      <h4>Example 2:</h4>
      <p><strong>Input:</strong> nums = [3,2,4], target = 6<br /><strong>Output:</strong> [1,2]</p>
      <h4>Example 3:</h4>
      <p><strong>Input:</strong> nums = [3,3], target = 6<br /><strong>Output:</strong> [0,1]</p>
      <h4>Constraints:</h4>
      <ul>
        <li>2 &lt;= nums.length &lt;= 10<sup>4</sup></li>
        <li>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></li>
        <li>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></li>
        <li>Only one valid answer exists.</li>
      </ul>
    </div>
  `;

  return (
    <Container style={{ overflow: "auto" }}>
      <Paper style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Two Sum
        </Typography>
        {["Easy", "Topics", "Companies", "Hint"].map((text) => (
          <Button
            key={text}
            variant="contained"
            sx={{
              backgroundColor: "transparent",
              borderColor: "gray",
              color: "black",
              marginRight: "10px",
              marginBottom: "15px",
            }}
          >
            {text}
          </Button>
        ))}
        <Box
          component="div"
          dangerouslySetInnerHTML={{ __html: description }}
          sx={{
            "& p": { marginBottom: "16px" },
            "& h4": { margin: "24px 0 16px" },
            "& ul": { marginTop: "16px" },
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "20px",
          }}
        ></Box>
      </Paper>
    </Container>
  );
};

export default Description;
