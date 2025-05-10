'use client'

import { Channel } from '@/db/schema'
import { createContext } from 'react'

export const ChannelListContext = createContext<{
  channels: Channel[]
  loading: boolean
}>({
  channels: [],
  loading: true,
})
