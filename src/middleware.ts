import { type NextRequest, NextResponse } from 'next/server'
import { handleApiAuth } from './middleware/api-auth'
import { handleAuth } from './middleware/auth'

export async function middleware(request: NextRequest) {
  console.log('Middleware Start:', {
    pathname: request.nextUrl.pathname,
    url: request.url,
  })

  // APIの認証チェック
  const apiAuthResponse = await handleApiAuth(request)
  if (apiAuthResponse) return apiAuthResponse

  // ページの認証チェック
  const authResponse = await handleAuth(request)
  if (authResponse) return authResponse

  return NextResponse.next()
}

// 静的アセットは除外
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth関連のAPIは除外)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}
