import { Typography, Paper, Box } from "@mui/material";
import CounterChart from "./components/chart/CounterChart";
import GlobalAutocomplete from "../../components/dropdown/GlobalAutocomplete";
import { useAppStore } from "../../services/store/counter/appStore";
import MotionWrapper from "../../components/animations/MotionWrapper";

const DashboardPage = () => {
  const { users, selectedUserId, setSelectedUser } = useAppStore();
  const selectedUser = users.find((user) => user.userId === selectedUserId);

  return (
    <Box sx={{ maxWidth: "800px", margin: "auto", padding: 3 }}>
      <MotionWrapper>
        <Typography variant="h5" gutterBottom>
          Rich Text Editor
        </Typography>
      </MotionWrapper>

      <MotionWrapper>
        <Box sx={{ marginTop: 2 }}>
          <GlobalAutocomplete
            options={users}
            value={selectedUser || null}
            onChange={(user) => setSelectedUser(user?.userId || "")}
            getOptionLabel={(user) => `${user.name} (${user.email})`}
            label="Select User"
          />
        </Box>
      </MotionWrapper>
      <MotionWrapper>
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
      </MotionWrapper>
      <Box mt={3}>
        <MotionWrapper>
          <CounterChart />
        </MotionWrapper>
      </Box>
    </Box>
  );
};

export default DashboardPage;
