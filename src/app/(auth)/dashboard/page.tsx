import { SignOut } from '@/components/sign-out'
import { TotalMessagesCard } from '@/components/TotalMessagesCard'

export default async function DashboardPage() {
  return (
    <main className="flex flex-col gap-4 p-4">
      <TotalMessagesCard totalMessages={1000} />
      <TotalMessagesCard totalMessages={1000} />
      <TotalMessagesCard totalMessages={1000} />
      <SignOut />
    </main>
  )
}
