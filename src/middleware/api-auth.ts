import { auth } from '@/auth'
import { getApiMeta } from '@/lib/api'
import { type NextRequest, NextResponse } from 'next/server'

export async function handleApiAuth(request: NextRequest) {
  const { pathname } = request.nextUrl

  // APIパス以外はスキップ
  if (!pathname.startsWith('/api')) return null

  const meta = getApiMeta(pathname)

  // メタデータがない、またはpublic: falseの場合は認証が必要
  if (!meta?.public) {
    const session = await auth()

    if (!session) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  }

  return null
}
