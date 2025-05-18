import { auth } from '@/auth'
import { db } from '@/db'
import { channelHistories } from '@/db/schema'
import { and, gte, lt, sql } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // 期間の計算
    const now = new Date()
    now.setHours(23, 59, 59, 999)

    // 今月の期間
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)

    // 今週の期間（日曜日始まり）
    const thisWeekStart = new Date(now)
    thisWeekStart.setDate(now.getDate() - now.getDay())
    thisWeekStart.setHours(0, 0, 0, 0)

    const lastWeekStart = new Date(thisWeekStart)
    lastWeekStart.setDate(thisWeekStart.getDate() - 7)

    const twoWeeksAgoStart = new Date(lastWeekStart)
    twoWeeksAgoStart.setDate(lastWeekStart.getDate() - 7)

    // 総投稿数
    const totalResult = await db
      .select({
        total: sql<number>`sum(${channelHistories.messageCount})`,
      })
      .from(channelHistories)
      .execute()

    // 今月の投稿数
    const thisMonthResult = await db
      .select({
        total: sql<number>`sum(${channelHistories.messageCount})`,
      })
      .from(channelHistories)
      .where(
        and(
          gte(channelHistories.targetDate, thisMonthStart),
          lt(channelHistories.targetDate, now)
        )
      )
      .execute()

    // 先月の同時点までの投稿数
    const lastMonthResult = await db
      .select({
        total: sql<number>`sum(${channelHistories.messageCount})`,
      })
      .from(channelHistories)
      .where(
        and(
          gte(channelHistories.targetDate, lastMonthStart),
          lt(
            channelHistories.targetDate,
            new Date(
              lastMonthStart.getFullYear(),
              lastMonthStart.getMonth(),
              now.getDate()
            )
          )
        )
      )
      .execute()

    // 今週の投稿数
    const thisWeekResult = await db
      .select({
        total: sql<number>`sum(${channelHistories.messageCount})`,
      })
      .from(channelHistories)
      .where(
        and(
          gte(channelHistories.targetDate, thisWeekStart),
          lt(channelHistories.targetDate, now)
        )
      )
      .execute()

    // 先週の同時点までの投稿数
    const lastWeekResult = await db
      .select({
        total: sql<number>`sum(${channelHistories.messageCount})`,
      })
      .from(channelHistories)
      .where(
        and(
          gte(channelHistories.targetDate, lastWeekStart),
          lt(
            channelHistories.targetDate,
            new Date(
              lastWeekStart.getTime() +
                (now.getTime() - thisWeekStart.getTime())
            )
          )
        )
      )
      .execute()

    return NextResponse.json({
      total: totalResult[0].total ?? 0,
      thisMonth: {
        total: thisMonthResult[0].total ?? 0,
        comparison: {
          total: lastMonthResult[0].total ?? 0,
          change:
            (thisMonthResult[0].total ?? 0) - (lastMonthResult[0].total ?? 0),
        },
      },
      thisWeek: {
        total: thisWeekResult[0].total ?? 0,
        comparison: {
          total: lastWeekResult[0].total ?? 0,
          change:
            (thisWeekResult[0].total ?? 0) - (lastWeekResult[0].total ?? 0),
        },
      },
    })
  } catch (error) {
    console.error('Error fetching message counts:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
