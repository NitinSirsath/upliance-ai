import { Box, Stack, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import GlobalDialog from "../../../components/dialogs/GlobalDialog";
import useUserForm from "../hooks/useUserForm";

type IProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const initialValues = {
  name: "",
  address: "",
  email: "",
  phone: "",
};

const UserFormDialog = ({ open, setOpen }: IProps) => {
  const {
    handleChange,
    validate,
    addUser,
    errors,
    setFormData,
    setErrors,
    formData,
  } = useUserForm();

  const handleClose = () => {
    setFormData(initialValues);
    setErrors(initialValues);
    setOpen(false);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validate()) return;
    addUser(formData);
    setFormData(initialValues);
    setOpen(false);
  };

  return (
    <GlobalDialog
      dialogActionFunction={handleSubmit}
      handleClose={handleClose}
      dialogTitle="User Form"
      open={open}
      actionButtonTitle="Add User"
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
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
