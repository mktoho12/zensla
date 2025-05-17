'use client'

import { Card } from '@/components/ui/card'
import { useMediaQuery } from '@/hooks/use-media-query'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import { format, formatISO } from 'date-fns'
import { ja } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface DailyCount {
  date: string
  total: number
}

interface DailyCountApiResponse {
  date: string
  total: string | number
}

interface ComparisonData {
  total: number
  comparison: {
    total: number
    change: number
  }
}

interface StatsData {
  total: number
  thisMonth: ComparisonData
  thisWeek: ComparisonData
}

interface ApiResponse {
  total: string | number
  thisMonth: {
    total: string | number
    comparison: {
      total: string | number
      change: string | number
    }
  }
  thisWeek: {
    total: string | number
    comparison: {
      total: string | number
      change: string | number
    }
  }
}

interface RankingItem {
  name: string
  slackId: string
  total: number
}

interface RankingApiResponse {
  date: string
  items: RankingItem[]
}

interface CategoryRanking {
  date: string
  personal: RankingItem[]
  circle: RankingItem[]
  other: RankingItem[]
}

interface NewChannel {
  name: string
  slackId: string
  type: string
}

const getDayColor = (date: Date) => {
  const day = date.getDay()
  if (day === 0) return '#f43f5e' // 日曜日は赤
  if (day === 6) return '#3b82f6' // 土曜日は青
  return '#666' // 平日は灰色
}

const formatDate = (date: Date) => {
  const thisYear = new Date().getFullYear()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  if (year === thisYear) {
    return `${month}/${day}`
  }
  return `${year}/${month}/${day}`
}

const formatDateRange = (from: Date, to: Date) => {
  if (from.getFullYear() === to.getFullYear()) {
    return `(${formatDate(from)} 〜 ${formatDate(to)})`
  }
  return `(${formatDate(from)} 〜 ${formatDate(to)})`
}

const calculatePercentageChange = (current: number, previous: number) => {
  if (previous === 0) return current > 0 ? Infinity : 0
  return ((current - previous) / previous) * 100
}

const StatCard = ({
  title,
  value,
  comparison,
  period,
  comparisonLabel,
}: {
  title: string
  value: number
  comparison?: { total: number; change: number }
  period?: { from: Date; to: Date }
  comparisonLabel?: string
}) => {
  const percentageChange = comparison
    ? calculatePercentageChange(value, comparison.total)
    : 0

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">{title}</h2>
        {period && (
          <p className="text-sm text-gray-500">
            {formatDateRange(period.from, period.to)}
          </p>
        )}
        <p className="text-4xl font-bold">
          {value.toLocaleString('ja-JP', { style: 'decimal' })}
        </p>
        {comparison && (
          <div className="mt-1 text-sm flex items-center gap-1">
            <span>{comparisonLabel || '前回比'}:</span>
            <span
              className={
                percentageChange > 0
                  ? 'text-green-600'
                  : percentageChange < 0
                  ? 'text-red-600'
                  : 'text-gray-600'
              }
            >
              {percentageChange > 0 ? (
                <ArrowUpIcon className="inline" />
              ) : percentageChange < 0 ? (
                <ArrowDownIcon className="inline" />
              ) : null}
              {percentageChange === Infinity
                ? '∞'
                : `${Math.abs(percentageChange).toFixed(2)}%`}
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [dailyCounts, setDailyCounts] = useState<DailyCount[]>([])
  const [categoryRanking, setCategoryRanking] =
    useState<CategoryRanking | null>(null)
  const [newChannels, setNewChannels] = useState<NewChannel[]>([])
  const [baseDate, setBaseDate] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // 基準日を取得
        const latestDateResponse = await fetch('/api/messages/latest-date')
        if (!latestDateResponse.ok) {
          throw new Error('基準日の取得に失敗しました')
        }
        const { latestDate } = await latestDateResponse.json()
        const baseDateObj = new Date(latestDate)
        setBaseDate(baseDateObj)

        // 統計情報を取得
        const statsResponse = await fetch('/api/messages/count')
        if (!statsResponse.ok) {
          throw new Error(
            `統計情報の取得に失敗しました: ${statsResponse.statusText}`
          )
        }
        const statsRawData: ApiResponse = await statsResponse.json()

        // データの型チェックと変換
        if (
          !statsRawData ||
          !statsRawData.thisMonth ||
          !statsRawData.thisWeek
        ) {
          throw new Error('統計データの形式が不正です')
        }

        const statsData: StatsData = {
          total: Number(statsRawData.total),
          thisMonth: {
            total: Number(statsRawData.thisMonth.total),
            comparison: {
              total: Number(statsRawData.thisMonth.comparison.total),
              change: Number(statsRawData.thisMonth.comparison.change),
            },
          },
          thisWeek: {
            total: Number(statsRawData.thisWeek.total),
            comparison: {
              total: Number(statsRawData.thisWeek.comparison.total),
              change: Number(statsRawData.thisWeek.comparison.change),
            },
          },
        }

        setStats(statsData)

        // データ取得期間を設定（モバイルの場合は1週間、それ以外は30日）
        const from = new Date(baseDateObj)
        from.setDate(from.getDate() - (isMobile ? 7 : 30))

        const dailyCountResponse = await fetch(
          `/api/messages/daily-count?from=${from.toISOString()}&to=${baseDateObj.toISOString()}`
        )
        if (!dailyCountResponse.ok) {
          throw new Error(
            `日別データの取得に失敗しました: ${dailyCountResponse.statusText}`
          )
        }
        const { dailyCounts: rawDailyCounts } = await dailyCountResponse.json()

        // 日別データの変換
        const convertedDailyCounts: DailyCount[] = rawDailyCounts.map(
          (item: DailyCountApiResponse) => ({
            date: item.date,
            total: Number(item.total),
          })
        )

        setDailyCounts(convertedDailyCounts)

        // カテゴリ別ランキングを取得
        const categoryRankingFrom = formatISO(baseDateObj)
        const categoryRankingSearchParams = new URLSearchParams({
          from: categoryRankingFrom,
        })
        const [personalResponse, circleResponse, otherResponse] =
          await Promise.all([
            fetch(
              `/api/messages/category-ranking?category=個人&${categoryRankingSearchParams}`
            ),
            fetch(
              `/api/messages/category-ranking?category=サークル&${categoryRankingSearchParams}`
            ),
            fetch(
              `/api/messages/category-ranking?category=other&${categoryRankingSearchParams}`
            ),
          ])

        if (!personalResponse.ok || !circleResponse.ok || !otherResponse.ok) {
          throw new Error('ランキングデータの取得に失敗しました')
        }

        const [personalData, circleData, otherData]: RankingApiResponse[] =
          await Promise.all([
            personalResponse.json(),
            circleResponse.json(),
            otherResponse.json(),
          ])

        setCategoryRanking({
          date: personalData.date,
          personal: personalData.items.map(item => ({
            name: item.name,
            slackId: item.slackId,
            total: Number(item.total),
          })),
          circle: circleData.items.map(item => ({
            name: item.name,
            slackId: item.slackId,
            total: Number(item.total),
          })),
          other: otherData.items.map(item => ({
            name: item.name,
            slackId: item.slackId,
            total: Number(item.total),
          })),
        })

        // 新規チャンネルを取得
        const newChannelsResponse = await fetch(
          `/api/channels/new?date=${format(baseDateObj, 'yyyy-MM-dd', {
            locale: ja,
          })}`
        )
        if (!newChannelsResponse.ok) {
          throw new Error('新規チャンネルの取得に失敗しました')
        }
        const { channels } = await newChannelsResponse.json()
        setNewChannels(channels)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setError(
          error instanceof Error
            ? error.message
            : '予期せぬエラーが発生しました'
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [isMobile])

  if (isLoading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-[200px]">
        <div className="text-gray-500">データを読み込んでいます...</div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="p-4 flex items-center justify-center min-h-[200px]">
        <div className="text-red-500">
          {error ||
            'データの取得に失敗しました。しばらくしてから再度お試しください。'}
        </div>
      </div>
    )
  }

  // 期間の計算
  const now = new Date()
  const firstHistoryDate = new Date('2025-02-28') // 履歴の開始日を設定
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const thisWeekStart = new Date(now)
  thisWeekStart.setDate(now.getDate() - now.getDay())
  thisWeekStart.setHours(0, 0, 0, 0)

  // データの存在チェックと初期値の設定
  const safeStats = {
    total: stats.total ?? 0,
    thisMonth: {
      total: stats.thisMonth?.total ?? 0,
      comparison: stats.thisMonth?.comparison ?? { total: 0, change: 0 },
    },
    thisWeek: {
      total: stats.thisWeek?.total ?? 0,
      comparison: stats.thisWeek?.comparison ?? { total: 0, change: 0 },
    },
  }

  const Chart = () => (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dailyCounts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={value => {
              const date = new Date(value)
              return `${date.getMonth() + 1}/${date.getDate()}`
            }}
            tick={({ x, y, payload }) => {
              const date = new Date(payload.value)
              return (
                <text
                  x={x}
                  y={y}
                  dy={16}
                  textAnchor="middle"
                  fill={getDayColor(date)}
                >
                  {`${date.getMonth() + 1}/${date.getDate()}`}
                </text>
              )
            }}
          />
          {!isMobile && <YAxis />}
          <Tooltip
            labelFormatter={value => {
              const date = new Date(value)
              const dayNames = ['日', '月', '火', '水', '木', '金', '土']
              const dayName = dayNames[date.getDay()]
              return `${date.getFullYear()}/${
                date.getMonth() + 1
              }/${date.getDate()} (${dayName})`
            }}
            formatter={(value: number) => [
              value.toLocaleString('ja-JP'),
              '投稿数',
            ]}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            strokeWidth={3}
            name="投稿数"
            dot={{ strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )

  const statsCards = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        title="総投稿数"
        value={safeStats.total}
        period={{ from: firstHistoryDate, to: baseDate ?? now }}
      />
      <StatCard
        title="今月の投稿数"
        value={safeStats.thisMonth.total}
        comparison={safeStats.thisMonth.comparison}
        period={{ from: thisMonthStart, to: baseDate ?? now }}
        comparisonLabel="先月比"
      />
      <StatCard
        title="今週の投稿数"
        value={safeStats.thisWeek.total}
        comparison={safeStats.thisWeek.comparison}
        period={{ from: thisWeekStart, to: baseDate ?? now }}
        comparisonLabel="先週比"
      />
    </div>
  )

  const RankingSection = () => {
    if (!categoryRanking) return null

    const rankingDate = new Date(categoryRanking.date)
    const formattedDate = `${
      rankingDate.getMonth() + 1
    }/${rankingDate.getDate()}`

    const RankingList = ({ items }: { items: RankingItem[] }) => (
      <div className="space-y-2">
        {items.map(item => (
          <div
            key={item.name}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            <a
              href={`${process.env.NEXT_PUBLIC_SLACK_URL}/archives/${item.slackId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base flex-1 text-blue-600 hover:text-blue-800 hover:underline"
            >
              #{item.name}
            </a>
            <span className="text-base text-gray-600">
              {item.total.toLocaleString('ja-JP')}
            </span>
          </div>
        ))}
      </div>
    )

    return (
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-2">賑やかなチャンネル</h2>
        <p className="text-sm text-gray-500 mb-6">{formattedDate}のデータ</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">個人チャンネル</h3>
            <RankingList items={categoryRanking.personal} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">サークルチャンネル</h3>
            <RankingList items={categoryRanking.circle} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">その他のチャンネル</h3>
            <RankingList items={categoryRanking.other} />
          </div>
        </div>
      </Card>
    )
  }

  const NewChannelsSection = () => {
    if (newChannels.length === 0) return null

    const formatDate = (date: Date) => {
      return format(date, 'M月d日', { locale: ja })
    }

    return (
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-2">
          {baseDate && `${formatDate(baseDate)}に生まれたチャンネル`}
        </h2>
        <div className="space-y-2">
          {newChannels.map(channel => (
            <div
              key={channel.slackId}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              <a
                href={`${process.env.NEXT_PUBLIC_SLACK_URL}/archives/${channel.slackId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base flex-1 text-blue-600 hover:text-blue-800 hover:underline"
              >
                #{channel.name}
              </a>
              <span className="text-sm px-2 py-1 rounded bg-gray-100 text-gray-600">
                {channel.type}
              </span>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <div className="p-4 space-y-4">
      {isMobile ? (
        <>
          {statsCards}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">日別投稿数</h2>
            <Chart />
          </Card>
          <NewChannelsSection />
          <RankingSection />
        </>
      ) : (
        <>
          {statsCards}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">日別投稿数</h2>
            <Chart />
          </Card>
          <NewChannelsSection />
          <RankingSection />
        </>
      )}
    </div>
  )
}
