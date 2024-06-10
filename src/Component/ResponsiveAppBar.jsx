import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import NotificationsIcon from "@mui/icons-material/Notifications";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ThirtyFpsSelectTwoToneIcon from "@mui/icons-material/ThirtyFpsSelectTwoTone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Badge } from "@mui/material";
import codeRoutineLogo from "../assets/logo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const pages = [
  { name: "Explore", path: "/explore" },
  { name: "Problems", path: "/problems" },
  { name: "Contest", path: "/contest" },
  { name: "Discuss", path: "/discuss" },
  { name: "Interview", path: "/interview" },
  { name: "Store", path: "/store" },
];

const storeSubmenuItems = [
  { name: "Redeem", path: "/store/redeem" },
  { name: "Premimum", path: "/store/premimum" },
];

const interviewSubmenuItems = [
  { name: "Online Interview", path: "/interview/onlineinterview" },
  { name: "Assessment", path: "/interview/assessment" },
];

const settings = [
  { name: "Profile", path: "/settings/profile", icon: <AccountCircleIcon /> },
  { name: "Orders", path: "/settings/orders" },
  { name: "My Playgrounds", path: "/settings/playgrounds" },
  { name: "Appearance", path: "/settings/appearance" },
  { name: "Sign Out", path: "/settings/signout" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElStore, setAnchorElStore] = React.useState(null);
  const [anchorElInterview, setAnchorElInterview] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenStoreMenu = (event) => {
    setAnchorElStore(event.currentTarget);
  };
  const handleOpenInterviewMenu = (event) => {
    setAnchorElInterview(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseStoreMenu = () => {
    setAnchorElStore(null);
  };
  const handleCloseInterviewMenu = () => {
    setAnchorElInterview(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#424242" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            alt="codeRoutineLogo"
            src={codeRoutineLogo}
            sx={{ width: 56, height: 56 }}
            variant="square"
          />
          <Typography
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CODEROUTINE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) =>
                page.name === "Store" ? (
                  <MenuItem key={page.name} onClick={handleOpenStoreMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                    {Boolean(anchorElStore) ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </MenuItem>
                ) : page.name === "Interview" ? (
                  <MenuItem key={page.name} onClick={handleOpenInterviewMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                    {Boolean(anchorElInterview) ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </MenuItem>
                ) : (
                  <MenuItem
                    key={page.name}
                    component={Link}
                    to={page.path}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CODEROUTINE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) =>
              page.name === "Store" ? (
                <Box key={page.name} sx={{ position: "relative" }}>
                  <Button
                    onClick={handleOpenStoreMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {page.name}
                    {Boolean(anchorElStore) ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </Button>
                  <Menu
                    anchorEl={anchorElStore}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElStore)}
                    onClose={handleCloseStoreMenu}
                  >
                    {storeSubmenuItems.map((item) => (
                      <MenuItem
                        key={item.name}
                        component={Link}
                        to={item.path}
                        onClick={handleCloseStoreMenu}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : page.name === "Interview" ? (
                <Box key={page.name} sx={{ position: "relative" }}>
                  <Button
                    onClick={handleOpenInterviewMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {page.name}
                    {Boolean(anchorElInterview) ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </Button>
                  <Menu
                    anchorEl={anchorElInterview}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElInterview)}
                    onClose={handleCloseInterviewMenu}
                  >
                    {interviewSubmenuItems.map((item) => (
                      <MenuItem
                        key={item.name}
                        component={Link}
                        to={item.path}
                        onClick={handleCloseInterviewMenu}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : (
                <Button
                  key={page.name}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              )
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Badge
                  color="error"
                  variant="dot"
                  overlap="circular"
                  sx={{ "& .MuiBadge-dot": { border: "2px solid white" } }}
                >
                  <NotificationsIcon sx={{ color: "white" }} />
                </Badge>
              </IconButton>

              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <LocalFireDepartmentIcon sx={{ color: "orange" }} />
              </IconButton>

              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <ThirtyFpsSelectTwoToneIcon sx={{ color: "orange" }} />
              </IconButton>

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Button variant="outlined">Premium</Button>
            </Box>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Button component={Link}
                      to={setting.path}>
                      {setting?.icon}  {setting?.name}
                    </Button>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
