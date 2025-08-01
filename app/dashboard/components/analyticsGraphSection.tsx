"use client";

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import GraphSection from "./graphSection";

const earningsData = [
  { month: "Jan", earnings: 1200, bookings: 8 },
  { month: "Feb", earnings: 1500, bookings: 12 },
  { month: "Mar", earnings: 1800, bookings: 15 },
  { month: "Apr", earnings: 2200, bookings: 18 },
  { month: "May", earnings: 2000, bookings: 16 },
  { month: "Jun", earnings: 2400, bookings: 20 },
];

export const serviceData = [
  { name: "Custom Package", value: 35, earnings: 4200 },
  { name: "Car Rental Service", value: 25, earnings: 3000 },
  { name: "Tour Service", value: 20, earnings: 2400 },
  { name: "Accommodation", value: 15, earnings: 1800 },
];

const weeklyData = [
  { day: "Mon", bookings: 3, earnings: 240 },
  { day: "Tue", bookings: 5, earnings: 400 },
  { day: "Wed", bookings: 2, earnings: 160 },
  { day: "Thu", bookings: 4, earnings: 320 },
  { day: "Fri", bookings: 6, earnings: 480 },
  { day: "Sat", bookings: 8, earnings: 640 },
  { day: "Sun", bookings: 4, earnings: 320 },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export function AnalyticsGraphSection() {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Earnings Trend */}
        <GraphSection
          title="Earnings Trend"
          children={
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          }
        />

        {/* Service Distribution */}

        {/* Weekly Performance */}
        <GraphSection
          title="Weekly Bookings"
          children={
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          }
        />
        <div className="col-span-1 lg:col-span-2">
          <GraphSection title="Bookings vs Earnings">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart
                data={earningsData}
                margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                  }}
                  labelStyle={{ color: "#4B5563" }}
                  formatter={(value: any, name: string) => {
                    return name === "earnings" ? `$${value}` : value;
                  }}
                />
                <Legend
                  wrapperStyle={{
                    fontSize: 13,
                    color: "#6B7280",
                    marginTop: 10,
                  }}
                />
                <Bar
                  yAxisId="left"
                  dataKey="bookings"
                  fill="url(#colorBookings)"
                  barSize={28}
                  radius={[8, 8, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="earnings"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 4, stroke: "#fff", strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
                {/* Gradient for Bars */}
                <defs>
                  <linearGradient
                    id="colorBookings"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </GraphSection>
        </div>
      </div>
    </div>
  );
}
