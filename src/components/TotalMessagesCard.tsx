import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type TotalMessagesCardProps = {
  totalMessages: number
}

export function TotalMessagesCard({ totalMessages }: TotalMessagesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-zinc-900 dark:text-white">
          {totalMessages.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  )
}
