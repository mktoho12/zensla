import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],

  callbacks: {
    async signIn({ user }) {
      const allowDomain = process.env.ALLOW_DOMAIN
      const allowDomains = allowDomain.split(',').map(domain => domain.trim())
      const email = user.email?.toLowerCase()
      return allowDomains.some(domain => email?.endsWith(`@${domain}`))
    },
  },
})
