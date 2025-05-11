import { auth } from '@/auth'
import { db } from '@/db'
import { channels } from '@/db/schema'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()

  if (!session) {
    return NextResponse.json({
      status: 401,
      message: 'ログインしていません',
    })
  }

  const accessToken = session?.accessToken

  if (!accessToken) {
    return NextResponse.json({
      status: 401,
      message: 'アクセストークンがありません',
    })
  }

  const channelData = await db.select().from(channels)

  return NextResponse.json(channelData)
}
