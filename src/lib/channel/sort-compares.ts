// import { Channel } from '@/db/schema'
// import { differenceInDays } from 'date-fns'

// export const messageCountPerDayDesc = (a: Channel, b: Channel) => {
//   const aDaysSinceCreation = differenceInDays(new Date(), a.createdAt)
//   const bDaysSinceCreation = differenceInDays(new Date(), b.createdAt)

//   const aMessagePerDay = a.messageCount / aDaysSinceCreation
//   const bMessagePerDay = b.messageCount / bDaysSinceCreation

//   if (aMessagePerDay > bMessagePerDay) return -1
//   if (aMessagePerDay < bMessagePerDay) return 1
//   return 0
// }
