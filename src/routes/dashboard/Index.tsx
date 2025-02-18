import { Typography, Box, Card, CardContent, Avatar } from "@mui/material";
import CounterChart from "./components/chart/CounterChart";
import GlobalAutocomplete from "../../components/dropdown/GlobalAutocomplete";
import { useAppStore } from "../../services/store/counter/appStore";
import MotionWrapper from "../../components/animations/MotionWrapper";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const { users, selectedUserId, setSelectedUser } = useAppStore();
  const selectedUser = users.find((user) => user.userId === selectedUserId);

  return (
    <Box sx={{ maxWidth: "900px", margin: "auto", padding: 3 }}>
      <MotionWrapper>
        <Typography variant="h5" gutterBottom>
          Dashboard Overview
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

      {/* Selected User Details */}
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
              padding: 2,
              mt: 3,
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              backdropFilter: "blur(10px)",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
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
                width: 64,
                height: 64,
                mr: 2,
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
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                📧 {selectedUser.email}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                📞 {selectedUser.phone}
              </Typography>
            </CardContent>
          </Card>
        )}
      </MotionWrapper>

      {/* Chart Section */}
      <Box mt={4}>
        <MotionWrapper>
          <CounterChart />
        </MotionWrapper>
      </Box>
    </Box>
  );
};

export default DashboardPage;
