import { Channel } from '@/db/schema'
import { format } from 'date-fns'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'

export default function ChannelCard({ channel }: { channel: Channel }) {
  // const daysSinceCreation = Math.floor(
  //   differenceInDays(new Date(), channel.createdAt)
  // )

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <Link
          href={`https://zen-student.slack.com/archives/${channel.slackId}`}
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
          title={channel.name}
          aria-label={channel.name}
        >
          <CardTitle className="text-xl">{channel.name}</CardTitle>
        </Link>
        <p className="text-xs text-gray-300 text-right">
          <span className="text-lg font-bold mr-1">
            {/* {Math.round(
              channel.messageCount / daysSinceCreation
            ).toLocaleString()} */}
          </span>
          発言 / 日
        </p>
      </CardHeader>

      <CardContent>
        {channel.purpose && (
          <CardDescription>{channel.purpose}</CardDescription>
        )}
      </CardContent>

      <CardFooter className="grid grid-cols-4 gap-2 text-sm text-gray-500">
        <p>👥 {channel.memberCount}</p>
        {/* <p>💬 {channel.messageCount.toLocaleString()}</p> */}
        <p className="col-span-2">
          📅: {format(channel.createdAt, 'yyyy/MM/dd')}
        </p>
      </CardFooter>
    </Card>
  )
}
