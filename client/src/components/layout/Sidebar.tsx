"use client"

import type React from "react"
import { Layout, Menu, Badge } from "antd"
import { useNavigate, useLocation } from "react-router-dom"
import type { MenuProps } from "antd"
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ShopOutlined,
  BarChartOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  // PlusOutlined,
} from "@ant-design/icons"

const { Sider } = Layout

interface SidebarProps {
  collapsed: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems: MenuProps["items"] = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/products",
      icon: <ShoppingOutlined />,
      label: "Product",
      children: [
        {
          key: "/products/list",
          label: "Product List",
        },
        {
          key: "/products/categories",
          label: "Categories",
        },
      ],
    },
    {
      key: "/orders",
      icon: <ShoppingCartOutlined />,
      label: (
        <div className="flex items-center justify-between">
          <span>Orders</span>
          <Badge count={1} size="small" />
        </div>
      ),
    },
    {
      key: "/customers",
      icon: <UserOutlined />,
      label: "Customers",
    },
    {
      key: "/seller",
      icon: <ShopOutlined />,
      label: "Seller",
    },
    {
      key: "/analytics",
      icon: <BarChartOutlined />,
      label: "Analytics",
    },
    {
      key: "/support",
      icon: <QuestionCircleOutlined />,
      label: "Support",
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Setting",
    },
  ]

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key)
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className="bg-white border-r border-gray-200" width={240}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded flex items-center justify-center">
            
            <img src="../src/assets/logo.png" alt="" />
          </div>
          {!collapsed && <span className="text-xl font-semibold text-gray-900">Dashlab</span>}
        </div>
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        className="border-none mt-4 px-4"
      />
    </Sider>
  )
}

export default Sidebar
