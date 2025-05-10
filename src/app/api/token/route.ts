import { auth0 } from '@/lib/auth'

export async function GET() {
  const session = await auth0.getSession()
  return Response.json(session)
}
