import { auth } from '@/auth'
import { fetchSheetData } from '@/lib/googlesheets'

export async function GET() {
  const session = await auth()

  if (!session) {
    return new Response(
      JSON.stringify({
        status: 401,
        message: 'セッションがありません',
      })
    )
  }

  const { accessToken } = session

  if (!accessToken) {
    return new Response(
      JSON.stringify({
        status: 401,
        message: 'アクセストークンがありません',
      })
    )
  }

  const channels = await fetchSheetData({
    accessToken,
    spreadsheetId: '1VJTO1bgO0pizBk5IXpBPtwOskIEe7rnKi8Oc7R7nMhw',
    sheetName: '20250404',
    range: 'A:J',
  })

  return new Response(JSON.stringify(channels), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
