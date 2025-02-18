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
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import useThemeStore from "../../../services/store/theme/themeStore";
import { removeUserData } from "../../../services/localStorage/authUtils";
import { useAuthStore } from "../../../services/store/auth/authStore";
import companyLogo from "../../../assets/companyIcon.avif";
import { motion } from "framer-motion";

const settings = ["Profile", "Logout"];
const navLinks = [
  { label: "Home", path: "/" },
  { label: "Text Editor", path: "/rich-text-editor" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "About Me", path: "/about" },
];

const ResponsiveAppBar = () => {
  const theme = useTheme();
  const { setLoggedOut } = useAuthStore();
  const { darkMode, toggleDarkMode } = useThemeStore();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Detect screen size
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Mobile screens

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
          disableGutters
        >
          {/* Left Section: Logo & Mobile Menu Button */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <IconButton
                sx={{ mr: 2, color: textColor }}
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
            <img
              src={companyLogo}
              style={{
                height: "40px",
                cursor: "pointer",
                maxWidth: "100%",
              }}
              alt="Company Logo"
              loading="lazy"
              onClick={() => navigate("/")}
            />
          </Box>

          {/* Middle Section: Navigation Links (Desktop Only) */}
          {!isMobile && (
            <Stack direction={"row"} spacing={2} alignItems="center">
              {navLinks.map(({ label, path }) => (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  key={label}
                >
                  <Button
                    color="inherit"
                    sx={{
                      color: textColor,
                      textTransform: "capitalize",
                    }}
                    onClick={() => navigate(path)}
                  >
                    {label}
                  </Button>
                </motion.div>
              ))}
            </Stack>
          )}

          {/* Right Section: Theme Toggle & User Menu */}
          <Stack direction={"row"} alignItems="center" spacing={1}>
            <Tooltip
              enterDelay={500}
              leaveDelay={300}
              title={darkMode ? "Light Mode" : "Dark Mode"}
            >
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <IconButton
                  onClick={handleThemeMode}
                  sx={{
                    color: textColor,
                    transition: "all 0.3s",
                  }}
                >
                  {darkMode ? (
                    <DarkModeIcon fontSize="small" />
                  ) : (
                    <LightModeIcon fontSize="small" />
                  )}
                </IconButton>
              </motion.div>
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

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            backgroundColor: menuBgColor,
            color: textColor,
          },
        }}
      >
        <List>
          {navLinks.map(({ label, path }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton onClick={() => navigate(path)}>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {settings.map((setting) => (
            <ListItem key={setting} disablePadding>
              <ListItemButton onClick={() => handleCloseUserMenu(setting)}>
                <ListItemText primary={setting} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default ResponsiveAppBar;
