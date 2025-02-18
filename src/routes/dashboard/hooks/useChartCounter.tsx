import { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAppStore } from "../../../services/store/counter/appStore";
import { Typography } from "@mui/material";

const useChartCounter = () => {
  const { users, selectedUserId } = useAppStore();
  const selectedUser = users.find((user) => user.userId === selectedUserId);
  const userCount = selectedUser?.count || 0;

  const [chartData, setChartData] = useState<{ time: string; value: number }[]>(
    []
  );

  useEffect(() => {
    if (!selectedUserId) return;

    const newEntry = {
      time: new Date().toLocaleTimeString(),
      value: userCount,
    };

    setChartData((prevData) => [...prevData, newEntry].slice(-10));
  }, [userCount, selectedUserId]);

  const chartContent = useMemo(() => {
    return selectedUserId ? (
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
    );
  }, [chartData, selectedUserId]);
  return { chartContent };
};

export default useChartCounter;
