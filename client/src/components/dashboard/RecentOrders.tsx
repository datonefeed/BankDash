import type React from "react"
import { Card, Table, Tag, Button, Checkbox } from "antd"
import type { ColumnsType } from "antd/es/table"
import { FilterOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons"
import type { Order } from "../../types"

const RecentOrders: React.FC = () => {
  const columns: ColumnsType<Order> = [
    {
      title: "",
      dataIndex: "select",
      key: "select",
      width: 50,
      render: () => <Checkbox />,
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (id: string) => <span className="text-blue-600 font-medium">#{id}</span>,
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (text: string, record: Order) => (
        <div>
          <div className="font-medium text-gray-900">{text}</div>
          <div className="text-sm text-gray-500">+{record.additionalProducts} other products</div>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: true,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (text: string, record: Order) => (
        <div>
          <div className="font-medium text-gray-900">{text}</div>
          <div className="text-sm text-gray-500">{record.email}</div>
        </div>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      sorter: true,
      render: (total: string) => `$${total}`,
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Order["status"]) => {
        const colors: Record<Order["status"], string> = {
          Processing: "orange",
          Shipped: "blue",
          Delivered: "green",
          Cancelled: "red",
        }
        return <Tag color={colors[status]}>{status}</Tag>
      },
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex space-x-2">
          <Button icon={<EyeOutlined />} size="small" />
          <Button icon={<EditOutlined />} size="small" />
        </div>
      ),
    },
  ]

  const data: Order[] = [
    {
      key: "1",
      orderId: "302012",
      product: "Handmade Pouch",
      additionalProducts: 3,
      date: "1 min ago",
      customer: "John Bushmill",
      email: "johnbushmill@gmail.com",
      total: "121.00",
      payment: "Mastercard",
      status: "Processing",
    },
    {
      key: "2",
      orderId: "302011",
      product: "Smartwatch E2",
      additionalProducts: 1,
      date: "1 min ago",
      customer: "Ilham Budi A",
      email: "ilhambudi@gmail.com",
      total: "590.00",
      payment: "Visa",
      status: "Processing",
    },
    {
      key: "3",
      orderId: "302002",
      product: "Smartwatch E1",
      additionalProducts: 0,
      date: "5 hour ago",
      customer: "Mohammad Karim",
      email: "m.karim@gmail.com",
      total: "125.00",
      payment: "Transfer",
      status: "Shipped",
    },
    {
      key: "4",
      orderId: "301901",
      product: "Headphone G1 Pro",
      additionalProducts: 1,
      date: "1 day ago",
      customer: "Linda Blair",
      email: "lindablair@gmail.com",
      total: "348.00",
      payment: "Paypal",
      status: "Shipped",
    },
    {
      key: "5",
      orderId: "301900",
      product: "Iphone X",
      additionalProducts: 0,
      date: "2 day ago",
      customer: "Josh Adam",
      email: "josh_adam@gmail.com",
      total: "607.00",
      payment: "Visa",
      status: "Delivered",
    },
  ]

  return (
    <Card
      title={
        <div className="flex items-center space-x-2">
          <span>Recent Orders</span>
          <Tag color="green">+2 Orders</Tag>
        </div>
      }
      extra={
        <div className="flex space-x-2">
          <Button icon={<FilterOutlined />} size="small">
            Filters
          </Button>
          <Button type="primary" size="small">
            See More
          </Button>
        </div>
      }
      className="dashboard-card"
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: 1,
          total: 100,
          pageSize: 10,
          showSizeChanger: false,
          size: "small",
        }}
        size="small"
      />
      <div className="text-sm text-gray-500 mt-2">Showing 1-10 from 100</div>
    </Card>
  )
}

export default RecentOrders
