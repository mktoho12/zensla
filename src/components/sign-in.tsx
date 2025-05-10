import { Button } from '@/components/ui/button'

export default function SignIn() {
  return (
    <Button asChild>
      <a href="/auth/login">Sign In</a>
    </Button>
  )
}
