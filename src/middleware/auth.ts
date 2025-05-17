import { auth } from '@/auth'
import { type NextRequest, NextResponse } from 'next/server'

export async function handleAuth(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isRoot = pathname === '/'

  const session = await auth()

  if (isRoot) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return null
}
