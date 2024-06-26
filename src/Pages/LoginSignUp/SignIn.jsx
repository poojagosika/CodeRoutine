import * as React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";

const defaultTheme = createTheme();

const CombinedLink = React.forwardRef(function CombinedLink(props, ref) {
  return <RouterLink ref={ref} {...props} />;
});

export default function SignIn() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    LoginUser(data)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/");
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
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
              type="email"
              id={"email"}
              label="Email Address"
              name={"email"}
              autoComplete="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#424242", padding: "8px" }}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={CombinedLink} to={"/signup"} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
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
            <LinkedInIcon />
            <FacebookIcon />
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
