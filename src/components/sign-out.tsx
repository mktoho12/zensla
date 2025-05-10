import { Button } from './ui/button'

export async function SignOut() {
  return (
    <Button asChild variant="outline">
      <a href="/auth/logout">Sign Out</a>
    </Button>
  )
}
