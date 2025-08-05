import { auth } from '@/auth'
import { db } from '@/db'
import { channels } from '@/db/schema'
import { sql } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      )
    }

    const targetDate = new Date(date)
    const dateStr = targetDate.toISOString().split('T')[0] // YYYY-MM-DD形式

    const result = await db
      .select({
        name: channels.name,
        slackId: channels.slackId,
        type: channels.type,
      })
      .from(channels)
      .where(
        sql`DATE(${channels.birthday}) = ${dateStr}::date AND ${channels.isHidden} = 0`
      )
      .execute()

    return NextResponse.json({
      channels: result.map(channel => ({
        name: channel.name,
        slackId: channel.slackId,
        type: channel.type,
      })),
    })
  } catch (error) {
    console.error('Error fetching new channels:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
