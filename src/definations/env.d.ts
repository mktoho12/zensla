// env.d.ts
namespace NodeJS {
  interface ProcessEnv {
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string

    ALLOW_DOMAIN: string
  }
}
