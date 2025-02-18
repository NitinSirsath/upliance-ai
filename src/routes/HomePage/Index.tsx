import { Box, Stack } from "@mui/material";
import Counter from "./components/Counter";
import useCounter from "./hooks/useCounter";
import UserTable from "./components/table/UserTable";

const HomePage = () => {
  const { users } = useCounter();
  console.log(users);
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
