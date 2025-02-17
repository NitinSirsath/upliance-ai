import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../services/store/auth/authStore";
import {
  setUserData,
  setUserProfileInfo,
} from "../../../services/localStorage/authUtils";

interface FormData {
  username: string;
  password: string;
  usernameError: string;
  passwordError: string;
  rememberMe: boolean;
}

interface UserListType {
  email: string;
  password: string;
  username: string;
}

const useLoginPage = () => {
  const navigate = useNavigate();
  const { setLoggedIn } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    usernameError: "",
    passwordError: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const usernameError = formData.username
      ? ""
      : "Username or email is required";
    const passwordError = formData.password ? "" : "Password is required";

    setFormData((prev) => ({
      ...prev,
      usernameError,
      passwordError,
    }));

    if (!usernameError && !passwordError) {
      handleLogin();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      [`${name}Error`]: "",
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

  const handleLogin = () => {
    setIsLoading(true);
    setLoginError(null);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const findUser = users.find(
        (user: UserListType) =>
          user.email.toLocaleLowerCase() ===
          formData.username.toLocaleLowerCase()
      );

      if (!findUser) {
        setLoginError("User does not exist");
        setIsLoading(false);
        return;
      }

      const userExists = users.find(
        (user: UserListType) =>
          user.email.toLocaleLowerCase() ===
            formData.username.toLocaleLowerCase() &&
          user.password === formData.password
      );

      if (userExists) {
        const token = "dummyAuthToken123"; // Replace with the real token from your backend

        // Store token and user profile in localStorage
        setUserData(token);
        setUserProfileInfo(userExists);

        // Optionally save current user for "Remember Me"
        if (formData.rememberMe) {
          localStorage.setItem("currentUser", JSON.stringify(userExists));
        }

        setIsLoading(false);
        setLoggedIn();
        navigate("/");
      } else {
        setIsLoading(false);
        setLoginError("Invalid username or password");
      }
    }, 2000);
  };

  return {
    isLoading,
    loginError,
    handleSubmit,
    formData,
    showPassword,
    handleInputChange,
    togglePasswordVisibility,
    handleCheckboxChange,
  };
};

export default useLoginPage;
