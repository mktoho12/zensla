import { auth } from '@/auth'
import SignIn from '@/components/sign-in'
import { SignOut } from '@/components/sign-out'
import Link from 'next/link'

export default async function Home() {
  // Fetch the user session
  const session = await auth()

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <div className="flex gap-2 justify-start items-center">
        <h1 className="text-2xl">ZEN大学Slackのチャンネル一覧</h1>
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
          <div>
            <SignIn />
          </div>
        </div>
      )}
    </main>
  )
}
