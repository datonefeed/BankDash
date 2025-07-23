import type React from "react"
import { Card } from "antd"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import type { ChartData } from "../../types"

const StatisticsChart: React.FC = () => {
  const data: ChartData[] = [
    { month: "Jan", revenue: 800, sales: 600 },
    { month: "Feb", revenue: 900, sales: 700 },
    { month: "Mar", revenue: 750, sales: 650 },
    { month: "Apr", revenue: 1100, sales: 800 },
    { month: "May", revenue: 950, sales: 750 },
    { month: "Jun", revenue: 1200, sales: 900 },
    { month: "Jul", revenue: 1000, sales: 850 },
    { month: "Aug", revenue: 1300, sales: 950 },
    { month: "Sep", revenue: 1150, sales: 900 },
    { month: "Oct", revenue: 1400, sales: 1000 },
    { month: "Nov", revenue: 1250, sales: 950 },
    { month: "Dec", revenue: 1500, sales: 1100 },
  ]

  return (
    <Card title="Statistics" extra="Revenue and Sales" className="dashboard-card">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              name="Revenue"
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
              name="Sales"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default StatisticsChart
