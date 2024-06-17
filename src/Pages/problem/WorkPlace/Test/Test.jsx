import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
export default function Test() {
  const [showCases, setShowCases] = React.useState(false);
  const [activeCase, setActiveCase] = React.useState(0);
  const [showTestResult, setShowTestResult] = React.useState(false);

  const handleTestcase = () => {
    setShowCases(true);
    setShowTestResult(false);
    setActiveCase(0);
  };

  const handleTestResult = () => {
    setShowCases(false);
    setShowTestResult(true);
  };
  const handleplus = () => {};

  return (
    <Stack spacing={2} direction="column" padding={1}>
      <Stack spacing={2} direction="row">
        <Button variant="text" onClick={handleTestcase}>
          <CheckCircleOutlineIcon />
          Testcase
        </Button>
        <Button variant="text" onClick={handleTestResult}>
          <NavigateNextIcon />
          Test Result
        </Button>
      </Stack>
      {showCases && (
        <Stack spacing={2} direction="column">
          <Stack spacing={1} direction="row">
            <Button
              variant="text"
              color={activeCase === "primary" ? "primary" : "inherit"}
            >
              Case 1
            </Button>
            <Button variant="text" onClick={handleplus}>
              +
            </Button>
          </Stack>
          <Typography variant="body1" gutterBottom>
            nums =
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value="[2,7,11,15]"
          />
          <Typography variant="body1" gutterBottom>
            target =
          </Typography>
          <TextField id="outlined-basic" variant="outlined" value="9" />
        </Stack>
      )}
      {showTestResult && (
        <Typography variant="body1" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          convallis libero non eros fringilla, sed mattis risus mollis.
        </Typography>
      )}
    </Stack>
  );
}
