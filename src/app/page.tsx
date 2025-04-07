import { auth } from '@/auth'
import SignIn from '@/components/sign-in'
import { SignOut } from '@/components/sign-out'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const session = await auth()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex items-start gap-4 w-full">
        <div className="flex gap-2 justify-start items-center">
          <Image
            src="/mktoho.png"
            alt="アプリのロゴ"
            width={50}
            height={50}
            className="mx-auto"
          />
          <h1 className="text-xl font-bold">えむけーの開発</h1>
        </div>
      </header>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-2 justify-start items-center">
          <p>ZEN大学Slackのチャンネル一覧</p>
        </div>
        {session?.user ? (
          <>
            <p className="text-sm text-gray-500">
              以下のアカウントでログインしています。
              <br />
              {session.user.email}
            </p>

            <ul className="list-disc list-inside">
              <li>
                <Link href="/active-club">賑やかなサークル</Link>
              </li>
              <li>
                <Link href="/active-times">賑やかな個人チャンネル</Link>
              </li>
            </ul>
            <SignOut />
          </>
        ) : (
          <div className="flex flex-col gap-4 max-w-2xl">
            <p>
              このサイトは、ZEN大学Slackのチャンネル一覧を見やすくしたものです。
              <br />
              一覧上にメンバー数や一日あたりのメッセージ数を表示しているので、
              <br />
              賑わっているチャンネルを見つけやすくなります。
              <br />
            </p>

            <p>ZEN大学のメールアドレスでログインする必要があります。</p>
            <SignIn />
          </div>
        )}
      </main>

      <footer className="flex items-center justify-center gap-4 row-start-3">
        <p className="text-sm text-gray-500">
          <Link
            href="https://github.com/mktoho12/zen-slack-channels"
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
  )
}
