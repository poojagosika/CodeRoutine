import * as React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RegisterUser } from "../../Services/AuthService";
import { toast } from "react-toastify";

const defaultTheme = createTheme();

const CombinedLink = React.forwardRef(function CombinedLink(props, ref) {
  return <RouterLink ref={ref} {...props} />;
});

export default function SignUp() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    RegisterUser(data)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://assets.leetcode.com/static_assets/public/webpack_bundles/images/logo.c36eaf5e6.svg"
            alt="leetcode logo"
          />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              id={"userName"}
              label="User Name"
              name={"userName"}
              value={data.userName}
              onChange={(e) => setData({ ...data, userName: e.target.value })}
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name={"password"}
              label="Password"
              type="password"
              id={"password"}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name={"confirmPassword"}
              label="Confirm Password"
              type="password"
              id={"confirmPassword"}
              autoComplete="current-password"
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              id={"email"}
              label="Email Address"
              name={"email"}
              autoComplete="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#424242", padding: "8px" }}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Link component={CombinedLink} to={"/login"} variant="body2">
              {"Have an account? Sign In"}
            </Link>
          </Box>
          <Typography
            mt={4}
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            or you can sign in with
          </Typography>
          <Stack direction="row" spacing={3} color="grey" mt={2}>
            <GoogleIcon />
            <GitHubIcon />
            <FacebookIcon />
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
