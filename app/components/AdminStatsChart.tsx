"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  date: string;
  members: number;
  contacts: number;
}

export default function AdminStatsChart({ data }: { data: DataPoint[] }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow border mt-10">
      <h2 className="text-xl font-semibold text-sky-700 mb-4">
        Weekly Activity Overview
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="members"
            stroke="#0ea5e9" // sky-500
            strokeWidth={2}
            name="Memberships"
          />
          <Line
            type="monotone"
            dataKey="contacts"
            stroke="#60a5fa" // blue-300
            strokeWidth={2}
            name="Contact Messages"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
