import { auth } from '@/auth'
import { db } from '@/db'
import { channelHistories } from '@/db/schema'
import { and, gte, lte, sql } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get('from')
    const to = searchParams.get('to')

    const conditions = []
    if (from) {
      conditions.push(gte(channelHistories.targetDate, new Date(from)))
    }
    if (to) {
      conditions.push(lte(channelHistories.targetDate, new Date(to)))
    }

    const result = await db
      .select({
        date: sql<string>`date(${channelHistories.targetDate})`,
        total: sql<number>`sum(${channelHistories.messageCount})`,
      })
      .from(channelHistories)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .groupBy(sql`date(${channelHistories.targetDate})`)
      .orderBy(sql`date(${channelHistories.targetDate})`)
      .execute()

    return NextResponse.json({
      dailyCounts: result.map(row => ({
        date: row.date,
        total: row.total ?? 0,
      })),
    })
  } catch (error) {
    console.error('Error fetching daily message counts:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
