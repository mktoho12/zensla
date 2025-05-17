import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

export default async function PublicLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
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
  )
}
