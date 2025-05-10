import { InferSelectModel } from 'drizzle-orm'
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const baseColumns = {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}

export const channels = pgTable('channels', {
  ...baseColumns,
  slackId: text('slack_id').notNull(),
  name: text('name').notNull(),
  memberCount: integer('member_count').notNull(),
  purpose: text('purpose').notNull(),
  messageCount: integer('message_count').notNull(),
  type: text('type', { enum: ['サークル', '個人', '授業', '公式'] }),
})

export type Channel = InferSelectModel<typeof channels>
