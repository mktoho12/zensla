import { db } from '@/db'
import { channels } from '@/db/schema'
import { NextResponse } from 'next/server'

export async function GET() {
  const channelData = await db.select().from(channels)

  return NextResponse.json(channelData)
}
