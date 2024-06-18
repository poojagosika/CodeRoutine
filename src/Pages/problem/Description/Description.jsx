import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProblemById } from '../../../Services/AuthService';
import {
  Typography,
  Card,
  CardContent,
  Box,
} from '@mui/material';
const Description = () => {
  const [problem, setProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await getProblemById(id);
        setProblem(response.data.problem);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'green';
      case 'Medium':
        return 'orange';
      case 'Hard':
        return 'red';
      default:
        return 'black';
    }
  };

  return (
    <div style={{
      backgroundColor: "#262626",
    }}>
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
            {problem.title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            gutterBottom
            sx={{ color: getDifficultyColor(problem.difficulty) }}
          >
            Difficulty: {problem.difficulty}
          </Typography>
          <Typography variant="body1" paragraph>
            {problem.description}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Example:
          </Typography>
          {
            problem.examples.map((example) => (
              <Box
                component="pre"
                bgcolor="#3c3b3b"
                p={2}
                borderRadius={1}
                mb={2}
              >
                Input: {example.input} <br />
                Output: {example.output}
                {example.explanation ? (
                  <span> <br />Explanation : {example.explanation}</span>
                ) : (
                  <span> </span>
                )}
              </Box>
            ))
          }

          <Typography variant="h6" component="div" gutterBottom>
            Constraints:
          </Typography>
          <Typography variant="body2" component="ul" sx={{ ml: 4 }} >
            {problem.constraints}
            <li>1 ≤ nums.length ≤ 10<sup>4</sup></li>
            <li>-10<sup>9</sup> ≤ nums[i] ≤ 10<sup>9</sup></li>
          </Typography>
        </CardContent>
      </Card>
    </div>)
};

export default Description;