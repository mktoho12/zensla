import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import {
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

export const baseColumns = {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}

export const channels = pgTable('channels', {
  ...baseColumns,
  slackId: text('slack_id').notNull().unique(),
  name: text('name').notNull(),
  memberCount: integer('member_count').notNull(),
  purpose: text('purpose'),
  type: text('type', { enum: ['サークル', '個人', '授業', '公式'] }),
  birthday: date('birthday', { mode: 'date' }),
  isHidden: integer('is_hidden').notNull().default(0),
})

export const channelHistories = pgTable('channel_histories', {
  ...baseColumns,
  channelId: integer('channel_id').references(() => channels.id),
  targetDate: date('target_date', { mode: 'date' }).notNull(),
  messageCount: integer('message_count').notNull(),
})

export type Channel = InferSelectModel<typeof channels>
export type ChannelInsert = InferInsertModel<typeof channels>

export type ChannelHistory = InferSelectModel<typeof channelHistories>
export type ChannelHistoryInsert = InferInsertModel<typeof channelHistories>
