import SignIn from '@/components/sign-in'

export default function PublicPage() {
  return (
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
  )
}
