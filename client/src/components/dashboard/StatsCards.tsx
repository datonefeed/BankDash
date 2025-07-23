import type React from "react"
import { Row, Col, Card, Statistic } from "antd"
import { DollarOutlined, ShoppingCartOutlined, TagOutlined, WalletOutlined } from "@ant-design/icons"
import type { StatCard } from "../../types"

const StatsCards: React.FC = () => {
  const stats: StatCard[] = [
    {
      title: "Total Revenue",
      value: 75500,
      prefix: "$",
      precision: 0,
      valueStyle: { color: "#1890ff" },
      icon: <DollarOutlined className="text-2xl text-blue-500" />,
      trend: "+10%",
      trendColor: "text-green-500",
    },
    {
      title: "Total Sales",
      value: 31500,
      precision: 0,
      valueStyle: { color: "#52c41a" },
      icon: <ShoppingCartOutlined className="text-2xl text-green-500" />,
      trend: "+16%",
      trendColor: "text-green-500",
    },
    {
      title: "Product SKU",
      value: 247,
      precision: 0,
      valueStyle: { color: "#fa541c" },
      icon: <TagOutlined className="text-2xl text-orange-500" />,
      trend: "0%",
      trendColor: "text-gray-500",
    },
    {
      title: "Balance",
      value: 24500,
      prefix: "$",
      precision: 0,
      valueStyle: { color: "#722ed1" },
      icon: <WalletOutlined className="text-2xl text-purple-500" />,
      trend: "-5%",
      trendColor: "text-red-500",
    },
  ]

  return (
    <Row gutter={24}>
      {stats.map((stat, index) => (
        <Col span={6} key={index}>
          <Card className="stat-card">
            <div className="flex items-center justify-between mb-4">
              {stat.icon}
              <span className={`text-sm font-medium ${stat.trendColor}`}>{stat.trend}</span>
            </div>
            <div className="text-gray-600 text-sm mb-2">{stat.title}</div>
            <Statistic
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              precision={stat.precision}
              valueStyle={stat.valueStyle}
            />
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default StatsCards
