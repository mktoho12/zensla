import NewClubPageContent from './content'

export const metadata = { title: '賑やかな個人チャンネル' }

export default function NewClubPage() {
  return (
    <main className="max-w-6xl mx-auto flex flex-col gap-[32px] row-start-2 items-center sm:items-start m-4">
      <h1 className="text-3xl font-bold">賑やかな個人チャンネル</h1>
      <NewClubPageContent />
    </main>
  )
}
