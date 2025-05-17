import { auth } from '@/auth'
import { type NextRequest, NextResponse } from 'next/server'

export async function handleAuth(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isRoot = pathname === '/'

  console.log('Auth Middleware:', {
    pathname,
    isRoot,
    url: request.url,
  })

  const session = await auth()

  console.log('Auth Middleware - Session:', {
    hasSession: !!session,
  })

  if (isRoot) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return null
}
