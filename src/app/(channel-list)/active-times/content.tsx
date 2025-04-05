'use client'

import ChannelCard from '@/components/channel/ChannelCard'
import { Button } from '@/components/ui/button'
import { useContext, useState } from 'react'
import { ChannelListContext } from '../layout'

export default function NewClubPageContent() {
  const { channels, loading } = useContext(ChannelListContext)

  const [more, setMore] = useState(false)

  const newClubChannels = channels
    .filter(c => c.type === '個人')
    .sort((a, b) => b.messagePerDay - a.messagePerDay)
    .slice(0, more ? undefined : 10)

  return (
    <>
      <div className="flex flex-col gap-[32px] md:grid md:grid-cols-2">
        {newClubChannels.map(channel => (
          <ChannelCard key={channel.channelId} channel={channel} />
        ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center mx-auto">
          <svg
            width="40"
            height="40"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            className="animate-[spin_0.5s_linear_infinite]"
          >
            <circle
              cx="20"
              cy="20"
              r="18"
              strokeWidth="4"
              strokeOpacity="0.2"
            />
            <path d="M38 20a18 18 0 0 1-18 18" strokeWidth="4"></path>
          </svg>
        </div>
      )}
      {!loading && !more && (
        <p>
          <Button
            variant="outline"
            onClick={() => setMore(true)}
            className="cursor-pointer"
          >
            もっと見る
          </Button>
        </p>
      )}
    </>
  )
}
