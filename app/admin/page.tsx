"use client";

import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import AdminStatsChart from "../components/AdminStatsChart";
import LoadingSpinner from "../components/LoadingSpinner";

interface DataPoint {
  date: string;
  members: number;
  contacts: number;
}

export default function AdminDashboard() {
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        setIsLoading(true);
        const [regRes, contactRes] = await Promise.all([
          fetch("/api/registrations"),
          fetch("/api/contact"),
        ]);

        const regs = await regRes.json();
        const contacts = await contactRes.json();

        const temp: Record<string, DataPoint> = {};

        type Registration = {
          createdAt: string;
          email: string;
          fullName: string;
        };
        type Contact = { createdAt: string; message: string };
        type Item = Registration | Contact;

        [...regs, ...contacts].forEach((item: Item) => {
          const date = new Date(item.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });

          if (!temp[date]) {
            temp[date] = { date, members: 0, contacts: 0 };
          }

          if ("email" in item && "fullName" in item) {
            temp[date].members += 1;
          } else if ("message" in item) {
            temp[date].contacts += 1;
          }
        });

        const result = Object.values(temp).sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setChartData(result);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-sky-600 mb-8">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
        <DashboardCard
          title="Total Memberships"
          value={chartData.reduce((a, b) => a + b.members, 0).toString()}
        />
        <DashboardCard
          title="Contact Messages"
          value={chartData.reduce((a, b) => a + b.contacts, 0).toString()}
        />
      </div>

      <AdminStatsChart data={chartData} />
    </div>
  );
}
