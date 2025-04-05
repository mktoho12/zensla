import NewClubPageContent from './content'

export const metadata = { title: '賑やかなサークル' }

export default function NewClubPage() {
  return (
    <main className="max-w-6xl mx-auto flex flex-col gap-[32px] row-start-2 items-center sm:items-start m-4">
      <h1 className="text-3xl font-bold">賑やかなサークル</h1>
      <NewClubPageContent />
    </main>
  )
}
