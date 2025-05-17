'use client'

import { Card } from '@/components/ui/card'
import { WrenchIcon } from 'lucide-react'

export default function DailyPage() {
  return (
    <div className="p-4">
      <Card className="p-6">
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <WrenchIcon className="h-12 w-12 text-gray-400" />
          <h1 className="text-2xl font-bold text-gray-900">工事中です</h1>
          <p className="text-gray-600">
            このページは現在開発中です。もうしばらくお待ちください。
          </p>
        </div>
      </Card>
    </div>
  )
}
