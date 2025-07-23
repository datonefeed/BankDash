"use client"

import type React from "react"
import { Layout, Button, Input, Badge, Avatar, Dropdown, Space } from "antd"
import type { MenuProps } from "antd"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  BellOutlined,
  CalendarOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons"

const { Header: AntHeader } = Layout

interface HeaderProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  const userMenuItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Profile",
    },
    {
      key: "2",
      label: "Settings",
    },
    {
      key: "3",
      label: "Logout",
    },
  ]

  return (
    <AntHeader className="bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-600"
        />
      </div>

      <div className="flex items-center space-x-6">
        <Input placeholder="Search..." prefix={<SearchOutlined className="text-gray-400" />} className="w-80" />

        <Space size="large">
          <Badge count={1} size="small">
            <CalendarOutlined className="text-xl text-gray-600 cursor-pointer" />
          </Badge>

          <Badge count={5} size="small">
            <BellOutlined className="text-xl text-gray-600 cursor-pointer" />
          </Badge>

          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div className="flex items-center space-x-2 cursor-pointer">
              <Avatar size="small" icon={<UserOutlined />} />
              <div className="text-sm">
                <div className="font-medium text-gray-900">Jay Hargudson</div>
                <div className="text-gray-500">Manager</div>
              </div>
              <DownOutlined className="text-gray-400" />
            </div>
          </Dropdown>
        </Space>
      </div>
    </AntHeader>
  )
}

export default Header
