import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  usernameError: string;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
  rememberMe: boolean;
}

const useRegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [registerError] = useState<string | null>(null);

  // Form submission handler
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate fields
    const usernameError = formData.username ? "" : "Username is required";
    const emailError = formData.email
      ? validateEmail(formData.email)
      : "Email is required";
    const passwordError = formData.password ? "" : "Password is required";
    const confirmPasswordError =
      formData.password === formData.confirmPassword
        ? ""
        : "Passwords do not match";

    setFormData((prev) => ({
      ...prev,
      usernameError,
      emailError,
      passwordError,
      confirmPasswordError,
    }));

    if (
      !usernameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      handleRegister();
    }
  };

  // Handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
      [`${event.target.name}Error`]: "",
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: event.target.checked,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email format";
  };

  // Simulated registration function
  const handleRegister = () => {
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      // Store user data in localStorage (replace with real API logic)
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("users", JSON.stringify(users));

      // Navigate to login page after registration
      setIsLoading(false);
      navigate("/login");
    }, 2000);
  };

  return {
    registerError,
    handleSubmit,
    formData,
    handleInputChange,
    showPassword,
    togglePasswordVisibility,
    handleCheckboxChange,
    isLoading,
  };
};

export default useRegisterPage;
