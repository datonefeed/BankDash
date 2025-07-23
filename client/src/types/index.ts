import type React from "react"
export interface StatCard {
  title: string
  value: number
  prefix?: string
  suffix?: string
  precision?: number
  valueStyle?: React.CSSProperties
  icon: React.ReactNode
  trend: string
  trendColor: string
}

export interface Product {
  key: string
  product: string
  sku: string
  sales: number
  amount: number
  price: number
  status: "Published" | "Low Stock"
}

export interface Location {
  country: string
  sales: string
  amount: string
  change: string
  changeColor: string
}

export interface Order {
  key: string
  orderId: string
  product: string
  additionalProducts: number
  date: string
  customer: string
  email: string
  total: string
  payment: string
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled"
}

export interface ChartData {
  month: string
  revenue: number
  sales: number
}

export interface MenuItem {
  key: string
  icon: React.ReactNode
  label: React.ReactNode
}

export interface TabItem {
  key: string
  label: string
}

export interface UserMenuItems {
  key: string
  label: string
}
