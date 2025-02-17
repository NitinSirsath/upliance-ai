import React from "react";
import { useTheme } from "@mui/material/styles";

interface IProps {
  children: React.ReactNode;
  handleClick?: () => void;
  customStyles?: string;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  disabled?: boolean;
}

const CustomButton: React.FC<IProps> = ({
  children,
  handleClick,
  customStyles = "",
  variant = "primary",
  size = "medium",
  isLoading = false,
  disabled = false,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const variantStyles = {
    primary: isDarkMode
      ? "bg-gray-800 text-gray-100 hover:bg-blue-700 text-white"
      : "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: isDarkMode
      ? "bg-gray-700 hover:bg-gray-600 text-white"
      : "bg-gray-500 hover:bg-gray-600 text-white",
    danger: isDarkMode
      ? "bg-red-600 hover:bg-red-700 text-white"
      : "bg-red-500 hover:bg-red-600 text-white",
  };

  const sizeStyles = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-md",
    large: "px-5 py-3 text-lg",
  };

  return (
    <button
      className={`
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        rounded-lg text-center cursor-pointer transition-all shadow-md font-semibold
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        active:scale-95 
        ${isDarkMode ? "shadow-lg" : "shadow-md"}
        ${customStyles}
      `}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <span className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default CustomButton;
