import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useParams } from "react-router-dom";
import { getProblemById } from "../../../../Api/problemApi";
export default function Test() {
  const [showCases, setShowCases] = React.useState(true);
  const [activeCase, setActiveCase] = React.useState(0);
  const [showTestResult, setShowTestResult] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const { id } = useParams();

  React.useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await getProblemById(id);
        setQuestions(response.data.problem);
      } catch (err) {
        setError(err);
      } finally {
        // setIsLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  const handleTestcase = () => {
    setShowCases(true);
    setShowTestResult(false);
    setActiveCase(0);
  };

  const handleTestResult = () => {
    setShowCases(false);
    setShowTestResult(true);
  };
  const handleplus = () => { };

  return (
    <div
      style={{
        backgroundColor: "#262626",
        width: "100%",
        overflow: "auto",
        color: "white",
      }}
    >
      <Stack spacing={2} direction="column">
        <Stack
          spacing={2}
          direction="row"
          style={{ backgroundColor: "#333333" }}
        >
          <Button
            variant="text"
            onClick={handleTestcase}
            style={{
              color: "white",
              backgroundColor: showCases ? "#3c3c3c" : "#333333",
            }}
          >
            <CheckCircleOutlineIcon
              style={{ color: "#02b128", fontSize: 16 }}
            />
            Testcase
          </Button>
          <Button
            variant="text"
            onClick={handleTestResult}
            style={{
              color: "white",
              backgroundColor: showTestResult ? "#3c3c3c" : "#333333",
            }}
          >
            <NavigateNextIcon style={{ color: "#02b128" }} />
            Test Result
          </Button>
        </Stack>
        {showCases && (
          <Stack spacing={2} direction="column" padding={2}>
            <Stack spacing={1} direction="row">
              <Button
                variant="text"
                backgroundColor={
                  activeCase === "primary" ? "primary" : "inherit"
                }
                style={{
                  backgroundColor: "#3c3c3c",
                  color: "white",
                  fontSize: 14,
                }}
              >
                Case 1
              </Button>
              <Button variant="text" onClick={handleplus}>
                +
              </Button>
            </Stack>
            <Typography variant="body1" gutterBottom>
              Input :
            </Typography>
            <TextField
              id="outlined-basic"
              value={questions.inputDescription}
              InputProps={{
                style: {
                  backgroundColor: "#3c3c3c",
                  borderRadius: 8,
                  color: "white",
                  outline: "none",
                  border: "none",
                },
              }}
            />
            <Typography variant="body1" gutterBottom>
              Output :
            </Typography>
            <TextField
              id="outlined-basic"
              value={questions.outputDescription}
              InputProps={{
                style: {
                  backgroundColor: "#3c3c3c",
                  borderRadius: 8,
                  color: "white",
                  outline: "none",
                  border: "none",
                },
              }}
            />
          </Stack>
        )}
        {showTestResult && (
          <Typography
            variant="body1"
            gutterBottom
            style={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            You must run your code first
          </Typography>
        )}
      </Stack>
    </div>
  );
}