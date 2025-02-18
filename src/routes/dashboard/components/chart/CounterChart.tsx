import { Box, Typography } from "@mui/material";
import useChartCounter from "../../hooks/useChartCounter";

const CounterChart = () => {
  const { chartContent } = useChartCounter();

  return (
    <Box sx={{ width: "100%", height: 300, marginTop: 3 }}>
      <Typography variant="h6" align="center">
        Counter Trends
      </Typography>
      {chartContent}
    </Box>
  );
};

export default CounterChart;
