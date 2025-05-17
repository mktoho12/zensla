export interface ChannelData {
  id: string
  name: string
  count: number
  category: 'personal' | 'circle' | 'official' | 'other'
}

interface ChannelRankingProps {
  data: ChannelData[]
  category: ChannelData['category']
  title: string
}

const categoryColors = {
  personal: 'bg-pink-100',
  circle: 'bg-blue-100',
  official: 'bg-purple-100',
  other: 'bg-gray-100',
} as const

export function ChannelRanking({ data, category, title }: ChannelRankingProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500 mb-4">{title}</h3>
      <div className="space-y-4">
        {data
          .filter(channel => channel.category === category)
          .slice(0, 5)
          .map((channel, index) => (
            <div
              key={channel.id}
              className={`p-4 rounded-lg ${categoryColors[category]}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-semibold text-gray-700">
                    {index + 1}
                  </span>
                  <span className="text-gray-900">#{channel.name}</span>
                </div>
                <span className="text-gray-700 font-medium">
                  {channel.count.toLocaleString()} 投稿
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
