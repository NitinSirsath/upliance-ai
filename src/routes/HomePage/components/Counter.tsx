import { Box, Button, Typography } from "@mui/material";
import GlobalAutocomplete from "../../../components/dropdown/GlobalAutocomplete";
import { useState } from "react";
import UserFormDialog from "../dialog/UserForm";
import { useAppStore } from "../../../services/store/counter/appStore";

const Counter = () => {
  const {
    users,
    selectedUserId,
    setSelectedUser,
    increment,
    decrement,
    reset,
  } = useAppStore();
  const selectedUser = users.find((user) => user.userId === selectedUserId);

  // Dialog state
  const [openUserForm, setOpenUserForm] = useState<boolean>(false);

  return (
    <Box sx={{ textAlign: "center", padding: "20px" }}>
      <Button onClick={() => setOpenUserForm(true)}>Open</Button>
      <Typography variant="h4" gutterBottom>
        Counter
      </Typography>

      {/* User Selection */}
      <Box sx={{ marginBottom: 2 }}>
        <GlobalAutocomplete
          options={users}
          value={selectedUser || null}
          onChange={(user) => setSelectedUser(user?.userId || "")}
          getOptionLabel={(user) => `${user.name} (${user.email})`}
          label="Select User"
        />
      </Box>

      {/* Show counter for selected user */}
      {selectedUser ? (
        <>
          <Typography variant="h5">Count: {selectedUser.count}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              marginTop: 2,
            }}
          >
            <Button variant="contained" color="primary" onClick={increment}>
              Increment
            </Button>
            <Button variant="contained" color="secondary" onClick={decrement}>
              Decrement
            </Button>
            <Button variant="contained" color="error" onClick={reset}>
              Reset
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="body1" color="error">
          Please select a user to use the counter.
        </Typography>
      )}

      {/* User Form Dialog */}
      <UserFormDialog open={openUserForm} setOpen={setOpenUserForm} />
    </Box>
  );
};

export default Counter;
