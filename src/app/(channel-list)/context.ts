'use client'

import { Channel } from '@/lib/googlesheets'
import { createContext } from 'react'

export const ChannelListContext = createContext<{
  channels: Channel[]
  loading: boolean
}>({
  channels: [],
  loading: true,
})
