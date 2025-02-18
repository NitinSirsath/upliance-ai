import { Box, Stack, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { useUserStore } from "../../../services/store/counter/userStore";
import GlobalDialog from "../../../components/dialogs/GlobalDialog";

type IProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const valuesObj = {
  name: "",
  address: "",
  email: "",
  phone: "",
};

const UserFormDialog = ({ open, setOpen }: IProps) => {
  const { addUser } = useUserStore();
  const [formData, setFormData] = useState(valuesObj);

  const [errors, setErrors] = useState(valuesObj);

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", address: "", email: "", phone: "" };

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
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear error on input change
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleClose = () => {
    setErrors(valuesObj);
    setFormData(valuesObj);
    setOpen(false);
  };

  const handleSubmit = () => {
    // e.preventDefault();
    if (!validate()) return;
    addUser(formData);
    alert("User added!");
    setFormData({ name: "", address: "", email: "", phone: "" });
    setOpen(false);
  };

  return (
    <GlobalDialog
      dialogActionFunction={handleSubmit}
      handleClose={handleClose}
      dialogTitle="User Form"
      open={open}
    >
      <Box>
        <Stack
          component="form"
          onSubmit={handleSubmit}
          direction={"column"}
          spacing={2}
        >
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            error={!!errors.address}
            helperText={errors.address}
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Stack>
      </Box>
    </GlobalDialog>
  );
};

export default UserFormDialog;
