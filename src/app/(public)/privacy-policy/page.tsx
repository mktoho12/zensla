import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <main className="prose prose-neutral dark:prose-invert max-w-none">
      <h1 className="">プライバシーポリシー</h1>

      <p>
        当サイトでは、Googleアカウントによるログイン機能を提供しています。この機能を利用する際、以下のような個人情報を取得・使用する場合があります。
      </p>

      <h2>1. 取得する情報</h2>
      <ul>
        <li>メールアドレス</li>
      </ul>

      <h2>2. 利用目的</h2>
      <p>取得した情報は以下の目的で使用されます：</p>
      <ul>
        <li>ユーザー認証のため</li>
        <li>サービスの個別最適化のため</li>
        <li>不正利用の防止とセキュリティの確保のため</li>
      </ul>

      <h2>3. 情報の第三者提供</h2>
      <p>
        取得した情報を、ユーザーの同意なく第三者に提供することはありません。
      </p>

      <h2>4. 情報の管理</h2>
      <p>
        取得した情報は、安全に管理し、不要になった情報は速やかに削除いたします。
      </p>

      <h2>5. 外部サービス</h2>
      <p>
        当サイトはGoogleのOAuth認証を利用しており、Googleのプライバシーポリシーに基づいて処理されます。
      </p>
      <p>
        <a
          href="https://policies.google.com/privacy?hl=ja"
          target="_blank"
          rel="noopener noreferrer"
        >
          Googleのプライバシーポリシーはこちら
        </a>
      </p>

      <h2>6. お問い合わせ</h2>
      <p>
        プライバシーポリシーに関するご質問は、下記のメールアドレスまでお問い合わせください。
      </p>
      <p>📧 mk@mktoho.dev</p>

      <p>（最終更新日：2025年5月18日）</p>
      <p className="text-sm text-gray-500">
        <Link href="/">ホームに戻る</Link>
      </p>
    </main>
  )
}
