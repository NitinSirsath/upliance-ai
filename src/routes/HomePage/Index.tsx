import { Typography } from "@mui/material";
import Counter from "./components/Counter";

const HomePage = () => {
  return (
    <div>
      <Typography variant="h3" align="center">
        React Assignment
      </Typography>
      <Counter />
    </div>
  );
};

export default HomePage;
