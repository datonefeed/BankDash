"use client"

import type React from "react"
import { useState } from "react"
import { Layout } from "antd"
import Sidebar from "../components/layout/Sidebar"
import Header from "../components/layout/Header"

const { Content } = Layout

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  return (
    <Layout className="min-h-screen">
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className="bg-gray-50 p-6">{children}</Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
