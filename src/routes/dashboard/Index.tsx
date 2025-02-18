import {
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Grid,
  Stack,
  Chip,
} from "@mui/material";
import CounterChart from "./components/chart/CounterChart";
import GlobalAutocomplete from "../../components/dropdown/GlobalAutocomplete";
import { useAppStore } from "../../services/store/counter/appStore";
import MotionWrapper from "../../components/animations/MotionWrapper";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const { users, selectedUserId, setSelectedUser } = useAppStore();
  const selectedUser = users.find((user) => user.userId === selectedUserId);

  return (
    <Box sx={{ maxWidth: "1000px", margin: "auto", padding: 3 }}>
      <MotionWrapper>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          📊 Dashboard Overview
        </Typography>
      </MotionWrapper>

      {/* Select User */}
      <MotionWrapper>
        <Box sx={{ marginTop: 2, textAlign: "center" }}>
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
          <Card
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 3,
              mt: 3,
              borderRadius: "16px",
              backdropFilter: "blur(10px)",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            {/* Avatar Section */}
            <Avatar
              sx={{
                width: 72,
                height: 72,
                mr: 3,
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              {selectedUser.name[0]}
            </Avatar>

            {/* User Details */}
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", letterSpacing: "0.5px" }}
              >
                {selectedUser.name}
              </Typography>
              <Typography variant="body2">📧 {selectedUser.email}</Typography>
              <Typography variant="body2">📞 {selectedUser.phone}</Typography>
              <Typography variant="body2">🏠 {selectedUser.address}</Typography>

              {/* User Activity Badge */}
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Chip
                  label={"⚫ Offline"}
                  color={"success"}
                  variant="outlined"
                />
                <Chip label={"User"} color="primary" variant="outlined" />
              </Stack>
            </CardContent>
          </Card>
        )}
      </MotionWrapper>

      {/* Additional User Statistics */}
      {selectedUser && (
        <MotionWrapper>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              📈 User Stats
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <StatCard label="Total Posts" value={6} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <StatCard label="Comments" value={3} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <StatCard label="Likes" value={20} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <StatCard label="Account Age" value={`${10} Days`} />
              </Grid>
            </Grid>
          </Box>
        </MotionWrapper>
      )}

      <Box mt={4}>
        <MotionWrapper>
          <CounterChart />
        </MotionWrapper>
      </Box>
    </Box>
  );
};

const StatCard = ({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) => (
  <Card
    sx={{
      p: 2,
      textAlign: "center",
      boxShadow: 2,
      borderRadius: "10px",
      background: "linear-gradient(135deg, #007FFF 30%, #21CBF3 90%)",
      color: "#fff",
    }}
  >
    <Typography variant="h6" fontWeight="bold">
      {value}
    </Typography>
    <Typography variant="body2">{label}</Typography>
  </Card>
);

export default DashboardPage;
