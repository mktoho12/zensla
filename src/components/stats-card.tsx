interface StatsCardProps {
  title: string
  value: number
  change?: {
    value: number
    isIncrease: boolean
  }
  unit?: string
}

export function StatsCard({ title, value, change, unit = '' }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-semibold text-gray-900">
          {value.toLocaleString()}
          {unit && <span className="ml-1 text-sm">{unit}</span>}
        </p>
        {change && (
          <p
            className={`ml-2 flex items-baseline text-sm font-semibold ${
              change.isIncrease ? 'text-green-600' : 'text-red-600'
            }`}
          >
            <span>
              {change.isIncrease ? '+' : '-'}
              {Math.abs(change.value).toLocaleString()}
            </span>
          </p>
        )}
      </div>
    </div>
  )
}
