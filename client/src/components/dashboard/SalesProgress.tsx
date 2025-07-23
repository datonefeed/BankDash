import type React from "react"
import { Card, Progress } from "antd"

const SalesProgress: React.FC = () => {
  return (
    <Card title="Sales Progress" extra="This Quarter" className="dashboard-card">
      <div className="text-center">
        <Progress
          type="circle"
          percent={75.55}
          size={200}
          strokeColor="#3b82f6"
          format={(percent) => (
            <div>
              <div className="text-3xl font-bold text-gray-900">{percent}%</div>
              <div className="text-sm text-green-500">+10%</div>
            </div>
          )}
        />

        <div className="mt-6 text-sm text-gray-600">
          You succeed earn <span className="font-semibold text-gray-900">$240</span> today, its higher than yesterday
        </div>

        <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
          <div className="text-center">
            <div className="text-xs text-gray-500">Target</div>
            <div className="text-lg font-semibold text-gray-900">$20k</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">Revenue</div>
            <div className="text-lg font-semibold text-gray-900">$16k</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">Today</div>
            <div className="text-lg font-semibold text-gray-900">$1.5k</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default SalesProgress
