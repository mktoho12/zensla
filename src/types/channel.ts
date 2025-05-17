export interface ChannelData {
  id: string
  name: string
  count: number
  category: 'personal' | 'circle' | 'official' | 'other'
}
