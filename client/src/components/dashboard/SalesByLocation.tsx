import type React from "react"
import { Card, Button } from "antd"
import { FilterOutlined } from "@ant-design/icons"
import type { Location } from "../../types"

const SalesByLocation: React.FC = () => {
  const locations: Location[] = [
    { country: "United Kingdom", sales: "340 Sales", amount: "$17,678", change: "+12%", changeColor: "text-green-500" },
    { country: "Spain", sales: "100 Sales", amount: "$5,500", change: "-5%", changeColor: "text-red-500" },
    { country: "Indonesia", sales: "50 Sales", amount: "$2,500", change: "0%", changeColor: "text-gray-500" },
    { country: "France", sales: "147 Sales", amount: "$7,456", change: "+19%", changeColor: "text-green-500" },
    { country: "Germany", sales: "340 Sales", amount: "$24,189", change: "-25%", changeColor: "text-red-500" },
    {
      country: "United Arab Emirates",
      sales: "245 Sales",
      amount: "$15,700",
      change: "-11%",
      changeColor: "text-red-500",
    },
    { country: "Turkey", sales: "590 Sales", amount: "$24,700", change: "-12%", changeColor: "text-red-500" },
    { country: "United States", sales: "48 Sales", amount: "$2,000", change: "+7%", changeColor: "text-green-500" },
    { country: "Japan", sales: "23 Sales", amount: "$1,500", change: "0%", changeColor: "text-gray-500" },
  ]

  return (
    <Card
      title="Sales by Location"
      extra={
        <Button icon={<FilterOutlined />} size="small">
          Filters
        </Button>
      }
      className="dashboard-card"
    >
      <div className="text-sm text-gray-500 mb-4">Sales performance by location</div>
      <div className="space-y-3">
        {locations.map((location, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="flex-1">
              <div className="font-medium text-gray-900">{location.country}</div>
              <div className="text-sm text-gray-500">{location.sales}</div>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">{location.amount}</div>
              <div className={`text-sm ${location.changeColor}`}>{location.change}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default SalesByLocation
