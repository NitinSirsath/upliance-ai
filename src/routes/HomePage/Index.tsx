import { Stack } from "@mui/material";
import Counter from "./components/Counter";

const HomePage = () => {
  return (
    <Stack justifyContent={"start"} alignItems={"center"}>
      <Counter />
    </Stack>
  );
};

export default HomePage;
