import { auth } from '@/auth'
import { db } from '@/db'
import { channelHistories, channels } from '@/db/schema'
import { and, desc, eq, gte, sql } from 'drizzle-orm'
import { NextResponse } from 'next/server'

type ChannelType = '個人' | 'サークル' | '授業' | '公式' | 'other'

export async function GET(request: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get('from')
      ? new Date(searchParams.get('from')!)
      : new Date()
    from.setDate(from.getDate()) // 当日のデータを取得

    const category = searchParams.get('category') as ChannelType
    const limit = Number(searchParams.get('limit')) || 5

    if (!category) {
      return NextResponse.json(
        { error: 'Category parameter is required' },
        { status: 400 }
      )
    }

    // カテゴリに応じた条件を設定
    const typeCondition =
      category === 'other'
        ? sql`${channels.type} IS NULL`
        : eq(channels.type, category)

    const ranking = await db
      .select({
        channelName: channels.name,
        slackId: channels.slackId,
        messageCount: sql<number>`sum(${channelHistories.messageCount})`,
      })
      .from(channelHistories)
      .innerJoin(channels, eq(channels.id, channelHistories.channelId))
      .where(and(typeCondition, gte(channelHistories.targetDate, from), eq(channels.isHidden, 0)))
      .groupBy(channels.name, channels.slackId)
      .orderBy(desc(sql`sum(${channelHistories.messageCount})`))
      .limit(limit)
      .execute()

    return NextResponse.json({
      date: from.toISOString(),
      items: ranking.map(item => ({
        name: item.channelName,
        slackId: item.slackId,
        total: item.messageCount.toString(),
      })),
    })
  } catch (error) {
    console.error('Error fetching category ranking:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
