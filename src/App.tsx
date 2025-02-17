// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./theme/theme";
import { Paper } from "@mui/material";
import AppRouter from "./routes/AppRoutes";
import useThemeStore from "./services/store/theme/themeStore";

function App() {
  const { darkMode } = useThemeStore();
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Paper sx={{ height: "100vh", borderRadius: 0 }}>
        <AppRouter />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
