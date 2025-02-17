import React from "react";
import {
  TextField,
  Container,
  FormControlLabel,
  Checkbox,
  IconButton,
  CircularProgress,
  Link,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Visibility,
  VisibilityOff,
  ArrowForwardIos,
} from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import { createTheme } from "@mui/material/styles";
import useRegisterPage from "./hooks/useRegisterPage";
import styles from "../LoginPage/loginPage.module.css";
import companyLogo from "../../assets/companyLogo.avif";
import registerBG from "../../assets/loginBG.svg";

// Light theme configuration
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
    background: { default: "#f5f5f5", paper: "#ffffff" },
    text: { primary: "#000000", secondary: "#555555" },
  },
});

const RegisterPage: React.FC = () => {
  const {
    registerError,
    handleSubmit,
    formData,
    handleInputChange,
    showPassword,
    togglePasswordVisibility,
    handleCheckboxChange,
    isLoading,
  } = useRegisterPage();

  const navigate = useNavigate();

  return (
    // <ThemeProvider theme={lightTheme}>
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <div
          className={styles.imageContainer}
          style={{
            backgroundImage: `url(${registerBG})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.loginForm}>
          <Paper
            elevation={3}
            sx={{
              backgroundColor: "background.paper",
              padding: "30px 10px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Container component="main" maxWidth="xs">
              <div style={{ display: "flex", gap: "10px", alignItems: "end" }}>
                <img
                  alt="Company Logo"
                  src={companyLogo}
                  style={{ height: "30px" }}
                />{" "}
                <Typography variant="body1" color="textPrimary">
                  React Calculator Builder
                </Typography>
              </div>
              {registerError && (
                <h5 style={{ color: lightTheme.palette.error.main }}>
                  {registerError}
                </h5>
              )}
              <form
                onSubmit={handleSubmit}
                style={{ width: "100%", marginTop: "8px" }}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  error={!!formData.usernameError}
                  helperText={formData.usernameError}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!formData.emailError}
                  helperText={formData.emailError}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!formData.passwordError}
                  helperText={formData.passwordError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={!!formData.confirmPasswordError}
                  helperText={formData.confirmPasswordError}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.rememberMe}
                      onChange={handleCheckboxChange}
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    textTransform: "none",
                  }}
                  endIcon={
                    isLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <ArrowForwardIos />
                    )
                  }
                >
                  Register
                </Button>
                <div style={{ marginTop: "16px", textAlign: "center" }}>
                  <Link
                    variant="body2"
                    onClick={() => navigate("/login")}
                    style={{
                      color: lightTheme.palette.primary.main,
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    Already have an account? Login
                  </Link>
                </div>
              </form>
            </Container>
          </Paper>
        </div>
      </div>
    </div>
    // </ThemeProvider>
  );
};

export default RegisterPage;
