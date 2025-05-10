import { db } from '@/db'
import { channels } from '@/db/schema'
import { auth0 } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const accessToken = await auth0.getAccessToken()

  if (!accessToken) {
    return NextResponse.json({
      status: 401,
      message: 'アクセストークンがありません',
    })
  }

  const channelData = await db.select().from(channels)

  return NextResponse.json(channelData)
}
