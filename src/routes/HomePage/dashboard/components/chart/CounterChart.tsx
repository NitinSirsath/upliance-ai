import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Box, Typography } from "@mui/material";
import { useCounterStore } from "../../../../../services/store/counter/counterStore";
import { useUserStore } from "../../../../../services/store/counter/userStore";

const CounterChart = () => {
  const { selectedUserId } = useUserStore(); // Get selected user globally
  const { userCounters } = useCounterStore();
  const [chartData, setChartData] = useState<{ time: string; value: number }[]>(
    []
  );

  useEffect(() => {
    if (!selectedUserId) return; // Skip if no user is selected

    const newEntry = {
      time: new Date().toLocaleTimeString(),
      value: userCounters[selectedUserId] || 0,
    };
    setChartData(() => [newEntry].slice(-10));
  }, [userCounters, selectedUserId]);

  return (
    <Box sx={{ width: "100%", height: 300, marginTop: 3 }}>
      <Typography variant="h6" align="center">
        Counter Trends
      </Typography>

      {selectedUserId ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3f51b5" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Typography variant="body1" color="error" align="center">
          Please select a user to see counter trends.
        </Typography>
      )}
    </Box>
  );
};

export default CounterChart;
