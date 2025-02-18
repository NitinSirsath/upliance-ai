import { Box, Button, Typography } from "@mui/material";
import { useUserStore } from "../../../services/store/counter/userStore";
import { useCounterStore } from "../../../services/store/counter/counterStore";
import GlobalAutocomplete from "../../../components/dropdown/GlobalAutocomplete";

const Counter = () => {
  const { users, selectedUserId, setSelectedUser } = useUserStore();
  const { userCounters, increment, decrement, reset } = useCounterStore();
  const selectedUser = users.find((user) => user.userId === selectedUserId);

  return (
    <Box sx={{ textAlign: "center", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Counter
      </Typography>

      {/* User Selection with GlobalAutocomplete */}
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
