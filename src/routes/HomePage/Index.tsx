import { Box, Stack } from "@mui/material";
import Counter from "./components/Counter";
import UserTable from "./components/table/UserTable";

const HomePage = () => {
  return (
    <Box>
      <Stack justifyContent={"start"} alignItems={"center"}>
        <Counter />
      </Stack>
      <UserTable />
    </Box>
  );
};

export default HomePage;
