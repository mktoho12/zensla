'use client'

import { cn } from '@/lib/utils'
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Settings,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const menuItems = [
  {
    title: 'ダッシュボード',
    href: '/dashboard',
    icon: BarChart3,
  },
  {
    title: 'メッセージ',
    href: '/messages',
    icon: MessageSquare,
  },
  {
    title: 'ユーザー',
    href: '/users',
    icon: Users,
  },
  {
    title: '設定',
    href: '/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        'flex flex-col border-r bg-white transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center">
          {!isCollapsed && (
            <span className="text-xl font-bold text-gray-900">Zensla</span>
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded-lg p-1.5 hover:bg-gray-100"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {menuItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100',
              pathname === item.href && 'bg-blue-50 text-blue-600',
              isCollapsed ? 'justify-center' : 'space-x-3'
            )}
          >
            <item.icon className="h-5 w-5" />
            {!isCollapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </nav>
    </div>
  )
}
