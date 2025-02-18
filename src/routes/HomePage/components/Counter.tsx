import { Box, Button, Typography } from "@mui/material";
import GlobalAutocomplete from "../../../components/dropdown/GlobalAutocomplete";
import useCounter from "../hooks/useCounter";
import UserFormDialog from "../dialog/UserForm";

const Counter = () => {
  const {
    users,
    setSelectedUser,
    increment,
    decrement,
    reset,
    openUserForm,
    setOpenUserForm,
    selectedUser,
  } = useCounter();

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
