import { useTheme } from "@mui/material";
import { ReactNode } from "react";

const DarkModeWrapper = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  return (
    <div
      className={`
    ${
      isDarkMode
        ? "bg-gray-900 text-gray-100 border border-gray-700"
        : "bg-gray-100 text-gray-800"
    }
  `}
    >
      {children}
    </div>
  );
};

export default DarkModeWrapper;
