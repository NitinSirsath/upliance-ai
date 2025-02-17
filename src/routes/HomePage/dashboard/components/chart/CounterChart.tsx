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

const CounterChart = () => {
  const { count } = useCounterStore();
  const [data, setData] = useState<{ time: string; value: number }[]>([]);

  useEffect(() => {
    setData((prevData) => [
      ...prevData,
      { time: new Date().toLocaleTimeString(), value: count },
    ]);
  }, [count]);

  return (
    <Box sx={{ width: "100%", height: 300, marginTop: 3 }}>
      <Typography variant="h6" align="center">
        Counter Trends
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3f51b5" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CounterChart;
