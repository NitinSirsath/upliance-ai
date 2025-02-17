import {
  Container,
  Typography,
  Paper,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import CounterChart from "./components/chart/CounterChart";
import { useUserStore } from "../../../services/store/counter/userStore";

const DashboardPage = () => {
  const { users, selectedUserId, setSelectedUser } = useUserStore();
  const selectedUser = users.find((user) => user.userId === selectedUserId);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center">
        Dashboard
      </Typography>

      {/* User Selection Dropdown */}
      <FormControl fullWidth sx={{ marginTop: 2 }}>
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

      {/* Show selected user details */}
      {selectedUser && (
        <Paper sx={{ padding: 2, marginTop: 3 }}>
          <Typography variant="h6">User Profile</Typography>
          <Typography variant="body1">
            <strong>Name:</strong> {selectedUser.name}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {selectedUser.email}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {selectedUser.phone}
          </Typography>
        </Paper>
      )}

      <Box mt={3}>
        <CounterChart />
      </Box>
    </Container>
  );
};

export default DashboardPage;
