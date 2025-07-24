import type React from "react"
import { Routes } from "react-router-dom"
import AppRoutes from "./routes"

const App: React.FC = () => {
  return <Routes>{AppRoutes}</Routes>
}

export default App
