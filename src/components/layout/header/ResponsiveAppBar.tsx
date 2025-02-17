import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Stack,
  Button,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import useThemeStore from "../../../services/store/theme/themeStore";
import { removeUserData } from "../../../services/localStorage/authUtils";
import { useAuthStore } from "../../../services/store/auth/authStore";
import companyLogo from "../../../assets/companyIcon.avif";

const settings = ["Profile", "Logout"];

const ResponsiveAppBar = () => {
  const theme = useTheme();
  const { setLoggedOut } = useAuthStore();
  const { darkMode, toggleDarkMode } = useThemeStore();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  // Theme colors dynamically based on mode
  const navBarBG = theme.palette.background.default;
  const textColor = theme.palette.text.primary;
  const menuBgColor = theme.palette.mode === "light" ? "#fff" : "#121212";
  const menuHoverColor = theme.palette.mode === "light" ? "#f5f5f5" : "#1e1e1e";

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = () => {
    removeUserData();
    setLoggedOut();
    navigate("/login");
  };

  const handleCloseUserMenu = (action: string | null) => {
    if (action === "Logout") {
      handleLogout();
    }
    setAnchorElUser(null);
  };

  const handleThemeMode = () => {
    toggleDarkMode();
  };

  return (
    <AppBar
      sx={{
        background: navBarBG,
        borderRadius: 0,
        boxShadow: "none",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
      position="static"
    >
      <Container sx={{ minWidth: "100%" }}>
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between" }}
          disableGutters
        >
          {/* Company Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={companyLogo}
              style={{ height: "40px", cursor: "pointer" }}
              alt="Company Logo"
              loading="lazy"
              onClick={() => navigate("/")}
            />
          </Box>

          {/* Navigation Links */}
          <Stack direction={"row"} spacing={2} alignItems="center">
            <Stack sx={{ marginLeft: "1rem" }} direction={"row"} spacing={1}>
              <Button
                color="inherit"
                sx={{ color: textColor, textTransform: "capitalize" }}
                onClick={() => navigate("/")}
              >
                Home
              </Button>
              <Button
                color="inherit"
                sx={{ color: textColor, textTransform: "capitalize" }}
                onClick={() => navigate("/user-form")}
              >
                User Form
              </Button>
              <Button
                color="inherit"
                sx={{ color: textColor, textTransform: "capitalize" }}
                onClick={() => navigate("/about")}
              >
                About Me
              </Button>
            </Stack>

            {/* Dark Mode Toggle */}
            <Tooltip
              enterDelay={500}
              leaveDelay={300}
              title={darkMode ? "Light Mode" : "Dark Mode"}
            >
              <IconButton
                onClick={handleThemeMode}
                sx={{
                  color: textColor,
                  transition: "all 0.3s",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              >
                {darkMode ? (
                  <DarkModeIcon fontSize="small" />
                ) : (
                  <LightModeIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>

            {/* User Avatar Menu */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="User Profile"
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: "45px",
                  "& .MuiPaper-root": {
                    backgroundColor: menuBgColor,
                    color: textColor,
                  },
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseUserMenu(null)}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                    sx={{
                      "&:hover": {
                        backgroundColor: menuHoverColor,
                      },
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
