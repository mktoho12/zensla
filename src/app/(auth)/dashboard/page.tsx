import { ChannelRanking, type ChannelData } from '@/components/channel-ranking'
import { DailyPostsChart } from '@/components/daily-posts-chart'
import { StatsCard } from '@/components/stats-card'

// TODO: APIから実際のデータを取得する
const mockData = {
  stats: {
    total: 12450,
    lastWeek: {
      value: 2500,
      change: { value: 300, isIncrease: true },
    },
    lastMonth: {
      value: 10000,
      change: { value: 1200, isIncrease: true },
    },
  },
  dailyPosts: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
    count: Math.floor(Math.random() * 500) + 100,
  })),
  channels: [
    { id: '1', name: 'general', count: 234, category: 'official' as const },
    { id: '2', name: 'random', count: 123, category: 'other' as const },
    {
      id: '3',
      name: 'programming-club',
      count: 432,
      category: 'circle' as const,
    },
    { id: '4', name: 'gaming', count: 321, category: 'circle' as const },
    { id: '5', name: 'study-group', count: 213, category: 'circle' as const },
    { id: '6', name: 'music-club', count: 198, category: 'circle' as const },
    { id: '7', name: 'photo-club', count: 176, category: 'circle' as const },
    {
      id: '8',
      name: 'john-personal',
      count: 543,
      category: 'personal' as const,
    },
    { id: '9', name: 'jane-diary', count: 432, category: 'personal' as const },
    { id: '10', name: 'bob-notes', count: 321, category: 'personal' as const },
  ] satisfies ChannelData[],
}

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="総投稿数" value={mockData.stats.total} unit="投稿" />
        <StatsCard
          title="先週の投稿数"
          value={mockData.stats.lastWeek.value}
          change={mockData.stats.lastWeek.change}
          unit="投稿"
        />
        <StatsCard
          title="先月の投稿数"
          value={mockData.stats.lastMonth.value}
          change={mockData.stats.lastMonth.change}
          unit="投稿"
        />
      </div>

      {/* 日別投稿数グラフ */}
      <div className="mt-6">
        <DailyPostsChart data={mockData.dailyPosts} />
      </div>

      {/* チャンネルランキング */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <ChannelRanking
          data={mockData.channels}
          category="personal"
          title="個人チャンネル ランキング"
        />
        <ChannelRanking
          data={mockData.channels}
          category="circle"
          title="サークルチャンネル ランキング"
        />
        <ChannelRanking
          data={mockData.channels}
          category="other"
          title="その他のチャンネル ランキング"
        />
      </div>
    </div>
  )
}
