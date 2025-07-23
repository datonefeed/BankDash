import type React from "react"
import { Card, Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"

const Customers: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Customer
        </Button>
      </div>

      <Card className="dashboard-card">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Customers Page</h3>
          <p className="text-gray-500">This is the customers page. Add your customer management components here.</p>
        </div>
      </Card>
    </div>
  )
}

export default Customers
