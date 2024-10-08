import React from "react";
import { Typography, Card, CardContent, Box } from "@mui/material";
const Description = ({ isLoading, error, problem }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "green";
      case "Medium":
        return "orange";
      case "Hard":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#262626",
        width: "50%",
        overflow: "auto",
      }}
    >
      <Card
        sx={{
          maxWidth: 800,
          margin: "auto",
          mt: 4,
          backgroundColor: "#262626",
          color: "#ffffff",
        }}
      >
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            {problem?.title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            gutterBottom
            sx={{ color: getDifficultyColor(problem?.difficulty) }}
          >
            Difficulty: {problem?.difficulty}
          </Typography>
          <Typography variant="body1" paragraph>
            {problem?.description}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Example:
          </Typography>
          {problem?.examples?.map((example, index) => (
            <Box
              p={2}
              borderRadius={1}
              mb={2}
              key={index}
              sx={{
                backgroundColor: "#3c3b3b",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="body" gutterBottom>
                Input: {example?.input}
              </Typography>
              <Typography variant="body" gutterBottom>
                Output: {example?.output}
              </Typography>
              {example?.explanation && (
                <Typography variant="body" gutterBottom>
                  Explanation:
                  {example.explanation.split(/Step\s/).map((line, index) => (
                    <div key={index}>
                      {line.trim() && `Step ${line.trim()}`} <br />
                    </div>
                  ))}
                </Typography>
              )}
            </Box>
          ))}

          <Typography variant="h6" component="div" gutterBottom>
            Constraints:
          </Typography>
          <Typography variant="body2" component="ul" sx={{ ml: 4 }}>
            {problem?.constraints}
            <li>
              1 ≤ nums.length ≤ 10<sup>4</sup>
            </li>
            <li>
              -10<sup>9</sup> ≤ nums[i] ≤ 10<sup>9</sup>
            </li>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Description;
