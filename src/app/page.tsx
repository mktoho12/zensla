import { auth } from '@/auth'
import SignIn from '@/components/sign-in'
import { SignOut } from '@/components/sign-out'

const title = 'ZEN大Slackのチャンネル一覧'
const description = 'ZEN大学のSlackチャンネルを表示するサイトです。'
const url = 'https://zen-slack-channels.mktoho.dev'

export const metadata = {
  title,
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
    siteName: 'ZenChannels',
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

export default async function Home() {
  const session = await auth()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {session?.user ? (
          <>
            <p className="text-lg text-gray-500">{session.user.email}</p>
            <SignOut />
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold">Welcome to NextAuth</h1>
            <SignIn />
          </>
        )}
      </main>
    </div>
  )
}
