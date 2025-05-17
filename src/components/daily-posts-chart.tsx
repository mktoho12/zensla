'use client'

import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface DailyPostsData {
  date: string // ISO形式の日付文字列
  count: number
}

interface DailyPostsChartProps {
  data: DailyPostsData[]
}

export function DailyPostsChart({ data }: DailyPostsChartProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500 mb-4">日別投稿数</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={date =>
                format(new Date(date), 'M/d (E)', { locale: ja })
              }
            />
            <YAxis />
            <Tooltip
              labelFormatter={date =>
                format(new Date(date), 'yyyy年M月d日 (E)', { locale: ja })
              }
              formatter={(value: number) => [value.toLocaleString(), '投稿数']}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              fill="#93c5fd"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
