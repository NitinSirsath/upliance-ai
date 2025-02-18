import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

import { Typography, Box } from "@mui/material";
import { useAppStore } from "../../../../services/store/counter/appStore";

const CounterChart = () => {
  const { users } = useAppStore();

  const data = users.map((user) => ({
    name: user.name,
    count: user.count,
  }));

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
      >
        User Count Statistics
      </Typography>
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={6}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="count" fill="url(#colorUv)" barSize={40} />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#007FFF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#007FFF" stopOpacity={0} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default CounterChart;
