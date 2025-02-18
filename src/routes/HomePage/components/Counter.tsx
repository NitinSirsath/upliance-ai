import {
  Box,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useUserStore } from "../../../services/store/counter/userStore";
import { useCounterStore } from "../../../services/store/counter/counterStore";

const Counter = () => {
  const { users } = useUserStore();
  const {
    userCounters,
    selectedUserId,
    setSelectedUser,
    increment,
    decrement,
    reset,
  } = useCounterStore();

  return (
    <Box sx={{ textAlign: "center", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Counter
      </Typography>

      {/* User Selection Dropdown */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Select User</InputLabel>
        <Select
          value={selectedUserId || ""}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          {users.map((user) => (
            <MenuItem key={user.userId} value={user.userId}>
              {user.name} ({user.email})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Show counter for selected user */}
      {selectedUserId ? (
        <>
          <Typography variant="h5">
            Count: {userCounters[selectedUserId] || 0}
          </Typography>
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
    </Box>
  );
};

export default Counter;
