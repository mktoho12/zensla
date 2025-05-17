import { auth } from '@/auth'
import { db } from '@/db'
import { channelHistories } from '@/db/schema'
import { formatISO } from 'date-fns'
import { desc } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await db
      .select({ targetDate: channelHistories.targetDate })
      .from(channelHistories)
      .orderBy(desc(channelHistories.targetDate))
      .limit(1)
      .execute()

    if (result.length === 0) {
      return NextResponse.json({ error: 'No data available' }, { status: 404 })
    }

    return NextResponse.json({
      latestDate: formatISO(result[0].targetDate),
    })
  } catch (error) {
    console.error('Error fetching latest date:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
