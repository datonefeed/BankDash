import type React from "react"
import { Row, Col, Button, Space, Tabs } from "antd"
import type { TabsProps } from "antd"
import { CalendarOutlined, PlusOutlined } from "@ant-design/icons"
import StatsCards from "../components/dashboard/StatsCards"
import SalesProgress from "../components/dashboard/SalesProgress"
import StatisticsChart from "../components/dashboard/StatisticsChart"
import TopSellingProducts from "../components/dashboard/TopSellingProducts"
import SalesByLocation from "../components/dashboard/SalesByLocation"
import RecentOrders from "../components/dashboard/RecentOrders"

const Dashboard: React.FC = () => {
  const timeFilterItems: TabsProps["items"] = [
    { key: "all", label: "All Time" },
    { key: "12months", label: "12 Months" },
    { key: "30days", label: "30 Days" },
    { key: "7days", label: "7 Days" },
    { key: "24hour", label: "24 Hour" },
  ]

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <Tabs items={timeFilterItems} defaultActiveKey="all" className="dashboard-tabs" />
        <Space>
          <Button icon={<CalendarOutlined />}>Select Dates</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            Add Product
          </Button>
        </Space>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Charts Row */}
      <Row gutter={24}>
        <Col span={12}>
          <SalesProgress />
        </Col>
        <Col span={12}>
          <StatisticsChart />
        </Col>
      </Row>

      {/* Tables Row */}
      <Row gutter={24}>
        <Col span={14}>
          <TopSellingProducts />
        </Col>
        <Col span={10}>
          <SalesByLocation />
        </Col>
      </Row>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  )
}

export default Dashboard
