'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import { useState } from 'react'

interface NavItem {
  href: string
  icon: React.ReactNode
  label: string
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { data: session, status } = useSession()

  if (status === 'unauthenticated') {
    redirect('/')
  }

  const navItems: NavItem[] = [
    {
      href: '/dashboard',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      label: 'ダッシュボード',
    },
    {
      href: '/daily',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      label: '日ごとのデータ',
    },
    {
      href: '/channels',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
          />
        </svg>
      ),
      label: 'チャンネルごとのデータ',
    },
  ]

  const Navigation = () => (
    <nav className="flex flex-col gap-2 p-4">
      {navItems.map(item => (
        <a
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
            pathname === item.href
              ? 'bg-gray-100 text-gray-900'
              : 'hover:bg-gray-100'
          )}
          onClick={() => setIsOpen(false)}
        >
          {item.icon}
          <span>{item.label}</span>
        </a>
      ))}

      <div className="mt-8 pt-4 border-t">
        <div className="flex flex-col gap-2">
          <Link
            href="https://github.com/mktoho12/zensla"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
              />
            </svg>
            <span>Github</span>
          </Link>
          <Link
            href="/privacy-policy"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>プライバシーポリシー</span>
          </Link>
        </div>
      </div>
    </nav>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {isMobile ? (
        <>
          <header className="sticky top-0 z-40 w-full border-b bg-white">
            <div className="container flex h-14 items-center">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-2">
                    <HamburgerMenuIcon className="h-6 w-6" />
                    <span className="sr-only">メニューを開く</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <SheetHeader>
                    <SheetTitle>メニュー</SheetTitle>
                  </SheetHeader>
                  <Navigation />
                </SheetContent>
              </Sheet>
              <div className="flex items-center justify-between flex-1">
                <Link href="/dashboard" className="flex items-center gap-4">
                  <Image
                    src="/zensla_logo.svg"
                    alt="Zensla Logo"
                    width={25}
                    height={26.6}
                  />
                  <h1 className="text-xl font-bold">Zensla</h1>
                </Link>
                <div className="flex items-center gap-4">
                  {status === 'authenticated' && session?.user && (
                    <div className="text-sm text-gray-600">
                      {session.user.name ||
                        session.user.email?.replace(/@.*$/, '')}
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => signOut()}
                    className="text-sm"
                  >
                    ログアウト
                  </Button>
                </div>
              </div>
            </div>
          </header>
          <main className="container py-4">{children}</main>
        </>
      ) : (
        <div className="flex min-h-screen">
          <aside className="w-64 border-r bg-white">
            <div className="p-4">
              <Link href="/dashboard" className="flex items-center gap-4">
                <Image
                  src="/zensla_logo.svg"
                  alt="Zensla Logo"
                  width={25}
                  height={26.6}
                />
                <h1 className="text-xl font-bold">Zensla</h1>
              </Link>
            </div>
            <Navigation />
          </aside>
          <div className="flex-1 flex flex-col">
            <header className="border-b bg-white">
              <div className="flex h-14 items-center justify-end px-8">
                <div className="flex items-center gap-4">
                  {status === 'authenticated' && session?.user && (
                    <div className="text-sm text-gray-600">
                      {session.user.name ||
                        session.user.email?.replace(/@.*$/, '')}
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => signOut()}
                    className="text-sm"
                  >
                    ログアウト
                  </Button>
                </div>
              </div>
            </header>
            <main className="flex-1 py-4 px-8">{children}</main>
          </div>
        </div>
      )}
    </div>
  )
}
