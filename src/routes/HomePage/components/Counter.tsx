import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GlobalAutocomplete from "../../../components/dropdown/GlobalAutocomplete";
import useCounter from "../hooks/useCounter";
import UserFormDialog from "./dialog/UserForm";
import MotionWrapper from "../../../components/animations/MotionWrapper";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box sx={{ textAlign: "center" }}>
      <Stack
        direction={"row"}
        spacing={1}
        alignItems={"center"}
        justifyContent={"right"}
      >
        <MotionWrapper>
          <Box sx={{ width: isMobile ? "260px" : "300px" }}>
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
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpenUserForm(true)}
            size="small"
          >
            Add User
          </Button>
        </MotionWrapper>
      </Stack>

      {/* Show counter for selected user */}
      {selectedUser ? (
        <MotionWrapper>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: 600 }}
          >
            Count: {selectedUser.count}
          </Typography>

          <MotionWrapper>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 3,
                marginTop: 3,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Button variant="contained" color="success" onClick={increment}>
                + Increment
              </Button>

              <Button variant="contained" color="error" onClick={decrement}>
                - Decrement
              </Button>

              <Button variant="contained" color="primary" onClick={reset}>
                Reset
              </Button>
            </Box>
          </MotionWrapper>
        </MotionWrapper>
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
