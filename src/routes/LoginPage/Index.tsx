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
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  ArrowForwardIos,
} from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import { createTheme } from "@mui/material/styles";
import styles from "./loginPage.module.css";
import companyLogo from "../../assets/companyIcon.avif";
import loginBG from "../../assets/loginBG.svg";
import useLoginPage from "./hooks/useLoginPage";
import { useNavigate } from "react-router-dom";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#555555",
    },
  },
});

const LoginPage: React.FC = () => {
  const {
    isLoading,
    loginError,
    handleSubmit,
    formData,
    showPassword,
    handleInputChange,
    togglePasswordVisibility,
    handleCheckboxChange,
  } = useLoginPage();

  const navigate = useNavigate();

  return (
    // <ThemeProvider theme={lightTheme}>
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <div
          className={styles.imageContainer}
          style={{
            backgroundImage: `url(${loginBG})`,
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
              </div>
              {loginError && (
                <h5 style={{ color: lightTheme.palette.error.main }}>
                  {loginError}
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
                  label="Email"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={formData.username}
                  onChange={handleInputChange}
                  error={!!formData.usernameError}
                  helperText={formData.usernameError}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!formData.passwordError}
                  helperText={formData.passwordError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
                  sx={{
                    textTransform: "none",
                  }}
                  color="primary"
                  endIcon={
                    isLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <ArrowForwardIos />
                    )
                  }
                >
                  Login
                </Button>
                <div style={{ marginTop: "16px", textAlign: "center" }}>
                  <Link
                    variant="body2"
                    onClick={() => navigate("/register")}
                    style={{
                      color: lightTheme.palette.primary.main,
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    Don’t have an account? Register
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

export default LoginPage;
