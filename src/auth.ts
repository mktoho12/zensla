import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          access_type: 'offline',
          prompt: 'consent',
          scope:
            'openid email https://www.googleapis.com/auth/spreadsheets.readonly',
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      const allowDomain = process.env.ALLOW_DOMAIN
      const allowDomains = allowDomain.split(',').map(domain => domain.trim())
      const email = user.email?.toLowerCase()
      return allowDomains.some(domain => email?.endsWith(`@${domain}`))
    },

    async jwt({ token, account }) {
      // 初回ログイン時にアクセストークンを保存
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token // ← これも取れる場合あり
      }
      return token
    },

    async session({ session, token }) {
      // セッションにもアクセストークンを含める
      session.accessToken = token.accessToken
      return session
    },
  },
})
