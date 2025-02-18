import { Container, Typography, Paper, Box } from "@mui/material";
import CounterChart from "./components/chart/CounterChart";
import GlobalAutocomplete from "../../components/dropdown/GlobalAutocomplete";
import { useAppStore } from "../../services/store/counter/appStore";

const DashboardPage = () => {
  const { users, selectedUserId, setSelectedUser } = useAppStore();
  const selectedUser = users.find((user) => user.userId === selectedUserId);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center">
        Dashboard
      </Typography>

      {/* User Selection with GlobalAutocomplete */}
      <Box sx={{ marginTop: 2 }}>
        <GlobalAutocomplete
          options={users}
          value={selectedUser || null}
          onChange={(user) => setSelectedUser(user?.userId || "")}
          getOptionLabel={(user) => `${user.name} (${user.email})`}
          label="Select User"
        />
      </Box>

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
