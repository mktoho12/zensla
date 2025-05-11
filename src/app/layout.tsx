import { auth } from '@/auth'
import { Geist, Geist_Mono } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const title = 'Zensla - ZEN大学のSlackチャンネルを表示するサイト'
const description = 'ZEN大学のSlackチャンネルを表示するサイトです。'
const url = 'https://zensla.mktoho.dev'

export const metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: '/apple-touch-icon.png', // iOSホーム画面用
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title,
    description,
    url,
    siteName: 'Zensla',
    images: [
      {
        url: `${url}/zen-channels-ogp.png`,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [`${url}/zen-channels-ogp.png`],
    creator: '@mktoho12',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="grid grid-rows-[50px_1fr_20px] items-center justify-items-center min-h-screen p-8 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)] max-w-">
          <header className="flex justify-between items-center gap-4 w-full">
            <div className="flex items-start gap-4">
              <Link href="/">
                <div className="flex gap-4 justify-start items-center">
                  <Image
                    src="/zensla_logo.svg"
                    alt="Zensla Logo"
                    width={50.25}
                    height={53.19975}
                    className="mx-auto"
                  />
                  <h1 className="text-3xl font-bold">Zensla</h1>
                </div>
              </Link>
            </div>
            <div className="flex justify-end items-center gap-4">
              {session?.user && (
                <p>{session.user.email?.replace(/@student.zen.ac.jp$/, '')}</p>
                // <Image
                //   src={session.user?.image ?? '/default-profile.png'}
                //   alt="User Profile"
                //   width={50}
                //   height={50}
                //   className="rounded-full"
                // />
              )}
            </div>
          </header>

          {children}

          <footer className="flex items-center justify-center gap-4 row-start-3">
            <p className="text-sm text-gray-500">
              <Link
                href="https://github.com/mktoho12/zensla"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </Link>
            </p>
            <p className="text-sm text-gray-500">
              <Link href="/privacy-policy">プライバシーポリシー</Link>
            </p>
          </footer>
        </div>
      </body>
    </html>
  )
}
