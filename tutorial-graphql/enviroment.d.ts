/** @format */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SALT_ROUNDS: number
      PRIVATE_KEY: string
    }
  }
}

export {}
