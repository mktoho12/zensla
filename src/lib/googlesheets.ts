import { z } from 'zod'

const GoogleSheetsValuesResponseSchema = z.object({
  range: z.string(),
  majorDimension: z.enum(['ROWS', 'COLUMNS']),
  values: z.array(z.array(z.string())),
})

const number = (val: string) => {
  const parsed = Number(val.replace(/,/g, ''))
  if (isNaN(parsed)) {
    throw new Error(`Invalid number: ${val}`)
  }
  return parsed
}

const ChannelSchema = z.object({
  no: z.string({ description: 'No' }).transform(number),
  name: z.string({ description: '名前' }),
  channelId: z.string({ description: 'チャンネルID' }),
  memberCount: z.string({ description: 'メンバー数' }).transform(number),
  description: z
    .string({ description: '説明' })
    .transform(val => val || undefined)
    .optional(),
  type: z
    .enum(['個人', 'サークル', '公式', 'アプリ', ''], { description: '種類' })
    .transform(val => val || undefined)
    .optional(),
  channelCreatedAt: z
    .string({ description: 'チャンネル作成日' })
    .transform(val => new Date(val)),
  messageCount: z.string({ description: '発言数' }).transform(number),
  daysSince: z.string({ description: '経過日数' }).transform(number),
  messagePerDay: z.string({ description: '発言 / 日' }).transform(number),
})

export type Channel = z.infer<typeof ChannelSchema>

type GoogleSheetsValuesResponse = z.infer<
  typeof GoogleSheetsValuesResponseSchema
>

const headerNameMap = {
  No: 'no',
  名前: 'name',
  チャンネルID: 'channelId',
  メンバー数: 'memberCount',
  説明: 'description',
  種類: 'type',
  チャンネル作成日: 'channelCreatedAt',
  発言数: 'messageCount',
  経過日数: 'daysSince',
  '発言 / 日': 'messagePerDay',
} as const

type HeaderName = keyof typeof headerNameMap

interface Props {
  accessToken: string
  spreadsheetId: string
  sheetName: string
  range: string
}

export async function fetchSheetData({
  accessToken,
  spreadsheetId,
  sheetName,
  range,
}: Props): Promise<Channel[]> {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!${range}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    }
  )

  const json = await response.json()
  const parsed = GoogleSheetsValuesResponseSchema.safeParse(json)

  if (!parsed.success) {
    console.error('Error parsing Google Sheets response:', parsed.error)
    throw new Error('Failed to parse Google Sheets response')
  }

  const responseData: GoogleSheetsValuesResponse = parsed.data
  const rows = responseData.values

  const headers = rows[0] as HeaderName[]
  const dataRows = rows.slice(1)

  return dataRows.map(row => {
    const parsed = ChannelSchema.parse(
      row.reduce(
        (acc, cell, index) => ({
          ...acc,
          [headerNameMap[headers[index]]]: cell,
        }),
        {}
      )
    )

    return parsed
  })
}
