import type React from "react"
import { Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Orders from "./pages/Orders"
import Customers from "./pages/Customers"

const App: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
      </Routes>
    </MainLayout>
  )
}

export default App
