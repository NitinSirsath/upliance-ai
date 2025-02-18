import React, { useState } from "react";
import { useAppStore } from "../../../services/store/counter/appStore";

const initialValues = {
  name: "",
  address: "",
  email: "",
  phone: "",
};

const useUserForm = () => {
  const { addUser } = useAppStore();
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);

  const validate = () => {
    let isValid = true;
    const newErrors = { ...initialValues };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // Clear error when user types
  };
  return {
    handleChange,
    validate,
    addUser,
    errors,
    setFormData,
    setErrors,
    formData,
  };
};

export default useUserForm;
