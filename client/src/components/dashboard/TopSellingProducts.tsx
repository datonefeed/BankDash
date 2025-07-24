import type React from "react"
import { Card, Table, Tag, Button } from "antd"
import type { ColumnsType } from "antd/es/table"
import { FilterOutlined } from "@ant-design/icons"
import type { Product } from "../../types"

const TopSellingProducts: React.FC = () => {
  const columns: ColumnsType<Product> = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (text: string, record: Product) => (
        <div>
          <div className="font-medium text-gray-900">{text}</div>
          <div className="text-sm text-gray-500">SKU: {record.sku}</div>
        </div>
      ),
    },
    {
      title: "Sales",
      dataIndex: "sales",
      key: "sales",
      sorter: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: true,
      render: (amount: number) => `$${amount.toLocaleString()}`,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Product["status"]) => <Tag color={status === "Published" ? "green" : "orange"}>{status}</Tag>,
    },
  ]

  const data: Product[] = [
    {
      key: "1",
      product: "Handmade Pouch",
      sku: "302012",
      sales: 401,
      amount: 84611,
      price: 121.0,
      status: "Low Stock",
    },
    {
      key: "2",
      product: "Smartwatch E2",
      sku: "302012",
      sales: 301,
      amount: 177000,
      price: 590.0,
      status: "Published",
    },
    {
      key: "3",
      product: "Smartwatch E1",
      sku: "302012",
      sales: 300,
      amount: 37500,
      price: 125.0,
      status: "Low Stock",
    },
    {
      key: "4",
      product: "Headphone G1 Pro",
      sku: "302012",
      sales: 298,
      amount: 103704,
      price: 348.0,
      status: "Published",
    },
    {
      key: "5",
      product: "Iphone X",
      sku: "302012",
      sales: 256,
      amount: 150000,
      price: 607.0,
      status: "Published",
    },
  ]

  return (
    <Card
      title="Top Selling Product"
      extra={
        <Button icon={<FilterOutlined />} size="small">
          Filters
        </Button>
      }
      className="dashboard-card"
    >
      <Table
        className="h-90"
        columns={columns}
        dataSource={data}
        pagination={{
          current: 1,
          total: 15,
          pageSize: 5,
          showSizeChanger: false,
          size: "small",
        }}
        size="small"
      />
      <div className="text-sm text-gray-500 mt-2">Showing 1-5 from 15</div>
    </Card>
  )
}

export default TopSellingProducts
