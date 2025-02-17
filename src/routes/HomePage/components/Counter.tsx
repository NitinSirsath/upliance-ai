import { Box, Button, Typography } from "@mui/material";
import { useMemo } from "react";
import { useCounterStore } from "../../../services/store/counter/counterStore";

const Counter = () => {
  const { count, increment, decrement, reset } = useCounterStore();

  // Background color changes with count value
  const backgroundColor = useMemo(() => {
    const intensity = Math.min(255, count * 10); // Controls color intensity
    return `rgba(${intensity}, ${255 - intensity}, 150, 0.5)`;
  }, [count]);

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "20px",
        backgroundColor,
        transition: "background-color 0.5s ease-in-out",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h4">Counter: {count}</Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 2 }}
      >
        <Button variant="contained" color="primary" onClick={increment}>
          Increment
        </Button>
        <Button variant="contained" color="secondary" onClick={decrement}>
          Decrement
        </Button>
        <Button variant="contained" color="error" onClick={reset}>
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default Counter;
