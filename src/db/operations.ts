import { and, eq } from 'drizzle-orm'
import { db } from '.'
import {
  channelHistories,
  channels,
  type ChannelHistoryInsert,
  type ChannelInsert,
} from './schema'

export async function insertChannel(channel: ChannelInsert) {
  return await db.insert(channels).values(channel).returning()
}

export async function getChannels() {
  return await db.select().from(channels)
}

export async function getChannelBySlackId(slackId: string) {
  return await db.select().from(channels).where(eq(channels.slackId, slackId))
}

export async function updateChannel(
  id: number,
  channel: Partial<ChannelInsert>
) {
  return await db
    .update(channels)
    .set(channel)
    .where(eq(channels.id, id))
    .returning()
}

export async function deleteChannel(id: number) {
  return await db.delete(channels).where(eq(channels.id, id)).returning()
}

// チャンネル履歴の操作関数
export async function insertChannelHistory(history: ChannelHistoryInsert) {
  return await db.insert(channelHistories).values(history).returning()
}

export async function getChannelHistories(channelId: number) {
  return await db
    .select()
    .from(channelHistories)
    .where(eq(channelHistories.channelId, channelId))
}

export async function getChannelHistoryByDate(
  channelId: number,
  targetDate: string
) {
  return await db
    .select()
    .from(channelHistories)
    .where(
      and(
        eq(channelHistories.channelId, channelId),
        eq(channelHistories.targetDate, targetDate)
      )
    )
}

export async function updateChannelHistory(
  id: number,
  history: Partial<ChannelHistoryInsert>
) {
  return await db
    .update(channelHistories)
    .set(history)
    .where(eq(channelHistories.id, id))
    .returning()
}

export async function deleteChannelHistory(id: number) {
  return await db
    .delete(channelHistories)
    .where(eq(channelHistories.id, id))
    .returning()
}
