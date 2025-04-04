import { auth } from '@/auth'
import SignIn from '@/component/sign-in'
import { SignOut } from '@/component/sign-out'

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
